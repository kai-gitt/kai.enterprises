import { fetchWakaTimeData } from "./wakatime";

export interface Env {
	cache: KVNamespace;
	WAKATIME_API_KEY: string;
	WAKATIME_USER_ID: string;
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
				response.headers.append("Content-Type", "application/json");
				response.headers.append(
					"Access-Control-Allow-Origin",
					"kai.enterprises"
				);
				response.headers.append(
					"Access-Control-Allow-Methods",
					"GET,HEAD,OPTIONS"
				);
				response.headers.append("Access-Control-Max-Age", "86400");
				return response;
		}

		const response = new Response();
		response.headers.append("Location", "https://kai.enterprises/");
		return response;
	},
} satisfies ExportedHandler<Env>;
