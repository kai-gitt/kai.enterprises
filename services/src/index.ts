import { fetchLastfmData } from "./lastfm";
import { fetchWakaTimeData } from "./wakatime";

export interface Env {
	cache: KVNamespace;
	WAKATIME_API_KEY: string;
	WAKATIME_USER_ID: string;
	LFM_API_KEY: string; // lastfm
	LFM_USER_ID: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		switch (url.pathname) {
			case "/wakatime":
				const data = await fetchWakaTimeData(
					env.WAKATIME_USER_ID,
					env.WAKATIME_API_KEY,
					env.cache
				);
				const response = new Response(JSON.stringify(data));
				response.headers.set("Content-Type", "application/json");
				response.headers.set("Access-Control-Allow-Origin", "*");
				response.headers.set(
					"Access-Control-Allow-Methods",
					"GET,HEAD,OPTIONS"
				);
				response.headers.set("Access-Control-Max-Age", "86400");
				return response;
		}

		switch (url.pathname) {
			case "/lastfm":
				const data = await fetchLastfmData(
					env.LFM_USER_ID,
					env.LFM_API_KEY,
					env.cache
				);
				const response = new Response(JSON.stringify(data));
				response.headers.set("Content-Type", "application/json");
				response.headers.set("Access-Control-Allow-Origin", "*");
				response.headers.set(
					"Access-Control-Allow-Methods",
					"GET,HEAD,OPTIONS"
				);
				response.headers.set("Access-Control-Max-Age", "86400");
				return response;
		}

		const response = new Response(":3");
		response.status = 303; // see other
		response.headers.set("Location", "https://kai.enterprises/");
		return response;
	},
} satisfies ExportedHandler<Env>;
