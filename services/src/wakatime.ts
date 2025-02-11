import { CumulativeTotal, WakatimeResponse } from "./model";

const CACHE_TIMEOUT = 30 * 60 * 1000; // 30 minutes in miliseconds
const KEYS = {
	WAKA_LAST_UPDATED: "wakatime-last-updated",
	WAKA: "wakatime-data",
};

function formatDate(date: Date): string {
	return date.toISOString().split("T")[0];
}

export async function fetchWakaTimeData(
	userId: string,
	apiKey: string,
	cache: KVNamespace
): Promise<CumulativeTotal | null> {
	if (await isCached(KEYS.WAKA_LAST_UPDATED, CACHE_TIMEOUT, cache)) {
		const data = await cache.get(KEYS.WAKA);
		if (data != null) {
			try {
				return JSON.parse(data) as CumulativeTotal;
			} catch (_) {
				/* fail silently, let the cache update */
			}
		}
	}
	const today = formatDate(new Date());
	const url = `https://wakatime.com/api/v1/users/${userId}/summaries?start=${today}&end=${today}&api_key=${apiKey}`;
	const headers = {
		Accept: "application/json",
		Authorization: `Bearer ${apiKey}`,
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = (await response.json()) as WakatimeResponse;
		// update the cache
		cache.put(KEYS.WAKA_LAST_UPDATED, Date.now().toString());
		cache.put(KEYS.WAKA, JSON.stringify(data.cumulative_total));
		return data.cumulative_total;
	} catch (error) {
		console.error("[wakatime]", error);
		return null;
	}
}

export async function isCached(
	key: string,
	timeout: number,
	cache: KVNamespace
): Promise<boolean> {
	const data = await cache.get(key);
	if (data == null) return false;
	const date = parseInt(data);
	if (Date.now() < date + timeout) return true;
	return false;
}
