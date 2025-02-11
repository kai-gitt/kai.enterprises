import { LastFMResponse, Track } from "./model";
import { shouldRefetch } from "./wakatime";

const CACHE_TIMEOUT = 30 * 60 * 1000; // 30 minutes in miliseconds
const KEYS = {
	LFM_LAST_UPDATED: "lastfm-last-updated",
	LFM: "lastfm-data",
};

export async function fetchLastfmData(
	userId: string,
	apiKey: string,
	cache: KVNamespace
): Promise<Track | null> {
	if (!(await shouldRefetch(KEYS.LFM_LAST_UPDATED, CACHE_TIMEOUT, cache))) {
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
		cache.put(KEYS.LFM_LAST_UPDATED, Date.now().toString());
		cache.put(KEYS.LFM, JSON.stringify(data.recenttracks.track[0]));
		return data.recenttracks.track[0];
	} catch (e) {
		return null;
	}
}
