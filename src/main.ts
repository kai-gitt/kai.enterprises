import "./main.css";
import { CumulativeTotal, DiscordResponse, DiscordStatus, WeatherData } from "./model";

const APPROX = [53.4, 14.5];

let clock: HTMLParagraphElement;
let wakatime: HTMLParagraphElement;
let lastfm: {
	cover: HTMLImageElement;
	cover_blur: HTMLImageElement;
	title: HTMLAnchorElement;
	subtitle: HTMLParagraphElement;
};
let weather: {
	temp: HTMLParagraphElement;
	condition: HTMLParagraphElement;
};
let online_status: HTMLParagraphElement;

document.addEventListener("DOMContentLoaded", async (_) => {
	// couldn't think of a better way :<
	clock = document.getElementById("current_time")! as HTMLParagraphElement;
	wakatime = document.getElementById("wakatime")! as HTMLParagraphElement;
	lastfm = {
		cover: document.getElementById("lastfm_cover")! as HTMLImageElement,
		cover_blur: document.getElementById(
			"lastfm_cover_blur"
		)! as HTMLImageElement,
		title: document.getElementById("lastfm_title")! as HTMLAnchorElement,
		subtitle: document.getElementById(
			"lastfm_subtitle"
		)! as HTMLParagraphElement
	};
	online_status = document.getElementById(
		"online_status"
	)! as HTMLParagraphElement;
	weather = {
		condition: document.getElementById(
			"weather_condition"
		)! as HTMLParagraphElement,
		temp: document.getElementById("weather_temp")! as HTMLParagraphElement
	};

	setInterval(UpdateClock, 100);

	await Promise.all([
		UpdateWakatimeData(),
		UpdateWeather(),
		UpdateOnlineStatus()
	]);

	document.getElementById("loading_reminder")!.remove();
});

const UpdateClock = () => {
	clock.textContent = new Date().toLocaleTimeString(navigator.languages, {
		timeZone: "Europe/Warsaw"
	});
};

const UpdateWakatimeData = async (): Promise<void> => {
	const req = await fetch("https://services.kai.enterprises/wakatime");
	const data = (await req.json()) as CumulativeTotal;
	wakatime.textContent = data.text;
};

const UpdateOnlineStatus = async (): Promise<void> => {
	const req = await fetch("https://services.kai.enterprises/discord");
	const json = (await req.json()) as DiscordResponse;

	const types = {
		[DiscordStatus.online]: {
			status: "online",
			color: "emerald-500"
		},
		[DiscordStatus.dnd]: {
			status: "busy",
			color: "red-500"
		},
		[DiscordStatus.offline]: {
			status: "offline",
			color: "blue-400"
		},
		[DiscordStatus.idle]: {
			status: "away",
			color: "amber-500"
		}
	};

	if (json != undefined) {
		const data = json.data;
		const status = types[data.discord_status];
		online_status.classList.remove("text-neutral-300/30");
		online_status.classList.add(
			`text-${status.color}`,
			`shadow-${status.color}`
		);
		online_status.textContent = status.status;

		lastfm.cover.src = data.spotify.album_art_url;
		lastfm.cover_blur.src = data.spotify.album_art_url;
		lastfm.cover.alt = `cover art of ${data.spotify.song}`;
		lastfm.cover.classList.remove("invert");
		lastfm.cover.classList.remove("opacity-*");
		lastfm.cover.classList.remove("opacity-30");
		lastfm.cover.classList.remove("p-*");
		lastfm.cover.classList.remove("p-8");

		lastfm.title.textContent = data.spotify.song;
		lastfm.subtitle.textContent = `${data.spotify.album} • ${data.spotify.artist}`;
	}
};

const UpdateWeather = async (): Promise<void> => {
	const req = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${APPROX[0]}&longitude=${APPROX[1]}&current_weather=true`
	);
	const data = (await req.json()) as WeatherData;

	if (data != undefined) {
		weather.temp.textContent = `${data.current_weather.temperature}${data.current_weather_units.temperature}`;
		weather.condition.textContent = `${wmoToDescription(
			data.current_weather.weathercode
		)}`;
	}
};

function wmoToDescription(wmoCode: number): string {
	const weatherDescriptions: { [key: number]: string } = {
		0: "Clear skies",
		1: "Partly cloudy",
		2: "Cloudy",
		3: "Overcast",
		4: "Visibility reduced by smoke",
		5: "Haze",
		6: "Dust in suspension",
		7: "Dust or sand raised by wind",
		8: "Dust or sand whirls",
		9: "Dust storm or sandstorm",
		10: "Mist",
		11: "Shallow fog",
		12: "Continuous fog",
		13: "Lightning visible, no thunder heard",
		14: "Precipitation within sight, not reaching the ground",
		15: "Distant precipitation",
		16: "Precipitation near the station",
		17: "Thunderstorm, no precipitation",
		18: "Squalls",
		19: "Funnel cloud",
		20: "Drizzle, slight",
		21: "Drizzle, moderate",
		22: "Drizzle, heavy",
		23: "Drizzle and rain, slight",
		24: "Drizzle and rain, moderate",
		25: "Drizzle and rain, heavy",
		26: "Freezing drizzle",
		27: "Shower(s) of rain",
		28: "Shower(s) of snow",
		29: "Shower(s) of hail",
		30: "Slight duststorm or sandstorm",
		31: "Moderate duststorm or sandstorm",
		32: "Severe duststorm or sandstorm",
		33: "Slight blowing snow",
		34: "Moderate blowing snow",
		35: "Heavy blowing snow",
		36: "Slight drifting snow",
		37: "Moderate drifting snow",
		38: "Heavy drifting snow",
		39: "Slight or moderate snow",
		40: "Heavy snow",
		41: "Slight or moderate hail",
		42: "Heavy hail",
		43: "Slight or moderate ice pellets",
		44: "Heavy ice pellets",
		45: "Slight or moderate snow pellets",
		46: "Heavy snow pellets",
		47: "Slight or moderate snow grains",
		48: "Heavy snow grains",
		49: "Slight or moderate ice crystals",
		50: "Heavy ice crystals",
		51: "Slight or moderate snow crystals",
		52: "Heavy snow crystals",
		53: "Slight or moderate snowflakes",
		54: "Heavy snowflakes",
		55: "Slight or moderate snow grains",
		56: "Heavy snow grains",
		57: "Slight or moderate snow pellets",
		58: "Heavy snow pellets",
		59: "Slight or moderate snow crystals",
		60: "Heavy snow crystals",
		61: "Slight or moderate snowflakes",
		62: "Heavy snowflakes",
		63: "Slight or moderate snow grains",
		64: "Heavy snow grains",
		65: "Slight or moderate snow pellets",
		66: "Heavy snow pellets",
		67: "Slight or moderate snow crystals",
		68: "Heavy snow crystals",
		69: "Slight or moderate snowflakes",
		70: "Heavy snowflakes",
		71: "Slight or moderate snow grains",
		72: "Heavy snow grains",
		73: "Slight or moderate snow pellets",
		74: "Heavy snow pellets",
		75: "Slight or moderate snow crystals",
		76: "Heavy snow crystals",
		77: "Slight or moderate snowflakes",
		78: "Heavy snowflakes",
		79: "Slight or moderate snow grains",
		80: "Heavy snow grains",
		81: "Slight or moderate snow pellets",
		82: "Heavy snow pellets",
		83: "Slight or moderate snow crystals",
		84: "Heavy snow crystals",
		85: "Slight or moderate snowflakes",
		86: "Heavy snowflakes",
		87: "Slight or moderate snow grains",
		88: "Heavy snow grains",
		89: "Slight or moderate snow pellets",
		90: "Heavy snow pellets",
		91: "Slight or moderate snow crystals",
		92: "Heavy snow crystals",
		93: "Slight or moderate snowflakes",
		94: "Heavy snowflakes",
		95: "Slight or moderate snow grains",
		96: "Heavy snow grains",
		97: "Slight or moderate snow pellets",
		98: "Heavy snow pellets",
		99: "Slight or moderate snow crystals"
	};

	return (
		weatherDescriptions[wmoCode].toLowerCase() || "a black hole is forming"
	);
}
