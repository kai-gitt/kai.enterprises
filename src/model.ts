export interface CumulativeTotal {
	decimal: string;
	digital: string;
	seconds: number;
	text: string;
}

export interface Track {
	artist: Artist;
	streamable: string;
	image: Image[];
	mbid: string;
	album: Album;
	name: string;
	url: string;
	date: Date;
}

interface Artist {
	mbid: string;
	"#text": string;
}

interface Image {
	size: string;
	"#text": string;
}

interface Album {
	mbid: string;
	"#text": string;
}

interface Date {
	uts: string;
	"#text": string;
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
}

export enum DiscordStatus {
	online = "online",
	idle = "idle",
	dnd = "dnd",
	offline = "offline",
}
