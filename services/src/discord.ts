import { DiscordResponse } from "./model";

export const fetchDiscordApi = async (
	discordId: string
): Promise<DiscordResponse | null> => {
	try {
		const req = await fetch(
			`https://api.lanyard.rest/v1/users/${discordId}`
		);
		const data = (await req.json()) as DiscordResponse;
		// delete the unnecessary data
		delete data.data.activities;
		delete data.data.spotify;
		delete data.data.discord_user;
		return data;
	} catch (e) {
		console.error("[discord-api]", e);
	}
	return null;
};
