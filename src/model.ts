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
