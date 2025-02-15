import "./main.css";
import { APP_CONFIG } from "./config";
import { DomElements } from "./dom";
import {
	CumulativeTotal,
	DiscordResponse,
	SpotifyData,
	StatusInfo,
	WeatherData,
} from "./model";
import { removeMultipleClasses } from "./util";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		setInterval(updateClock, 1000);

		await Promise.allSettled([
			updateWakatimeData(),
			updateWeather(),
			updateOnlineStatus(),
		]);

		DomElements.getElement(APP_CONFIG.SELECTORS.LOADING).remove();
	} catch (error) {
		console.error("Initialization error:", error);
	}
});

const updateClock = () => {
	DomElements.clock.textContent = new Date().toLocaleTimeString(
		navigator.languages,
		{
			timeZone: APP_CONFIG.TIME_ZONE,
		}
	);
};

const updateWakatimeData = async (): Promise<void> => {
	try {
		const response = await fetch(APP_CONFIG.ENDPOINTS.WAKATIME);
		const data: CumulativeTotal = await response.json();
		DomElements.wakatime.textContent = data.text;
	} catch (error) {
		console.error("Failed to update Wakatime data:", error);
		DomElements.wakatime.textContent = "No coding data available";
	}
};

const updateOnlineStatus = async (): Promise<void> => {
	try {
		const response = await fetch(APP_CONFIG.ENDPOINTS.DISCORD);
		const data: DiscordResponse = await response.json();

		if (!data?.data) return;

		const { discord_status, spotify } = data.data;
		const statusConfig = APP_CONFIG.STATUS_CONFIG[discord_status];

		updateStatusDisplay(statusConfig);
		if (spotify != null) {
			updateSpotifyDisplay(spotify);
		}
	} catch (error) {
		console.error("Failed to update Discord status:", error);
	}
};

const updateStatusDisplay = (status: StatusInfo) => {
	DomElements.onlineStatus.classList.remove("text-neutral-300/30");
	DomElements.onlineStatus.classList.add(
		status.textColor,
		status.shadowColor
	);
	DomElements.onlineStatus.textContent = status.statusText;

	DomElements.statusIndicator.classList.remove(
		...Object.values(APP_CONFIG.STATUS_CONFIG).map((s) => s.bgColor)
	);
	DomElements.statusIndicator.classList.add(status.bgColor);
};

const updateSpotifyDisplay = (spotify: SpotifyData) => {
	const { cover, coverBlur, title, subtitle } = DomElements.lastfm;

	cover.src = spotify.album_art_url;
	coverBlur.src = spotify.album_art_url;
	cover.alt = `Cover art of ${spotify.song}`;

	removeMultipleClasses(cover, ["opacity-", "p-", "invert"]);

	title.textContent = spotify.song;
	subtitle.textContent = `${spotify.album} • ${spotify.artist}`;
};

const updateWeather = async (): Promise<void> => {
	try {
		const url = new URL(APP_CONFIG.ENDPOINTS.WEATHER);
		url.searchParams.append(
			"latitude",
			APP_CONFIG.LOCATION.latitude.toString()
		);
		url.searchParams.append(
			"longitude",
			APP_CONFIG.LOCATION.longitude.toString()
		);
		url.searchParams.append("current_weather", "true");

		const response = await fetch(url.toString());
		const data: WeatherData = await response.json();

		DomElements.weather.temp.textContent = `${data.current_weather.temperature}${data.current_weather_units.temperature}`;
		DomElements.weather.condition.textContent =
			APP_CONFIG.WEATHER_DESCRIPTIONS[
				data.current_weather.weathercode
			]?.toLowerCase() || "Weather information unavailable";
	} catch (error) {
		console.error("Failed to update weather:", error);
		DomElements.weather.condition.textContent = "Weather data unavailable";
	}
};
