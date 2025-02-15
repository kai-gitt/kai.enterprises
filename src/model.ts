export interface CumulativeTotal {
	decimal: string;
	digital: string;
	seconds: number;
	text: string;
}

export interface WeatherData {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_weather_units: CurrentWeatherUnits;
	current_weather: CurrentWeather;
}

export interface CurrentWeatherUnits {
	time: string;
	interval: string;
	temperature: string;
	windspeed: string;
	winddirection: string;
	is_day: string;
	weathercode: string;
}

export interface CurrentWeather {
	time: string;
	interval: number;
	temperature: number;
	windspeed: number;
	winddirection: number;
	is_day: number;
	weathercode: number;
}

export interface DiscordResponse {
	data: Data;
	success: boolean;
}

interface Data {
	discord_status: DiscordStatus;
	active_on_discord_web: boolean;
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
	listening_to_spotify: boolean;
	spotify?: SpotifyData;
}

export interface SpotifyData {
	timestamps: {
		start: number;
		end: number;
	};
	album: string;
	album_art_url: string;
	artist: string;
	song: string;
	track_id: string;
}

export enum DiscordStatus {
	Online = "online",
	Idle = "idle",
	Dnd = "dnd",
	Offline = "offline",
}

export type Coordinates = { latitude: number; longitude: number };
export type StatusConfig = Record<DiscordStatus, StatusInfo>;
export type WeatherDescription = Record<number, string>;

export interface StatusInfo {
	statusText: string;
	textColor: string;
	shadowColor: string;
	bgColor: string;
}
