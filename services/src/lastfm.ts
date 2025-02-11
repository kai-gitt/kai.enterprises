import { LastFMResponse, Track } from "./model";
import { isCached } from "./wakatime";

const CACHE_TIMEOUT = 4 * 60 * 1000; // 4 minutes in miliseconds
const KEYS = {
	LFM_LAST_UPDATED: "lastfm-last-updated",
	LFM: "lastfm-data",
};

export async function fetchLastfmData(
	userId: string,
	apiKey: string,
	cache: KVNamespace
): Promise<Track | null> {
	if (await isCached(KEYS.LFM_LAST_UPDATED, CACHE_TIMEOUT, cache)) {
		const data = await cache.get(KEYS.LFM);
		if (data != null) {
			try {
				return JSON.parse(data) as Track;
			} catch (_) {
				/* fail silently, let the cache update */
			}
		}
	}

	const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userId}&api_key=${apiKey}&format=json`;

	try {
		const req = await fetch(url);
		const data = (await req.json()) as LastFMResponse;
		const track = data.recenttracks.track[0];
		if (!track) {
			return null;
		}
		await cache.put(KEYS.LFM_LAST_UPDATED, Date.now().toString());
		await cache.put(KEYS.LFM, JSON.stringify(track));
		return track;
	} catch (e) {
		console.error("[lastfm]", e);
		return null;
	}
}
