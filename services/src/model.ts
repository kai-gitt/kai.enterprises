export interface WakatimeResponse {
	cumulative_total: CumulativeTotal;
	daily_average: DailyAverage;
	data: Daum[];
	end: string;
	start: string;
}

export interface CumulativeTotal {
	decimal: string;
	digital: string;
	seconds: number;
	text: string;
}

export interface DailyAverage {
	days_including_holidays: number;
	days_minus_holidays: number;
	holidays: number;
	seconds: number;
	seconds_including_other_language: number;
	text: string;
	text_including_other_language: string;
}

export interface Daum {
	categories: Category[];
	dependencies: Dependency[];
	editors: Editor[];
	grand_total: GrandTotal;
	languages: Language[];
	machines: Machine[];
	operating_systems: OperatingSystem[];
	projects: Project[];
	range: Range;
}

export interface Category {
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	seconds: number;
	text: string;
	total_seconds: number;
}

export interface Dependency {
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	seconds: number;
	text: string;
	total_seconds: number;
}

export interface Editor {
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	seconds: number;
	text: string;
	total_seconds: number;
}

export interface GrandTotal {
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	text: string;
	total_seconds: number;
}

export interface Language {
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	seconds: number;
	text: string;
	total_seconds: number;
}

export interface Machine {
	decimal: string;
	digital: string;
	hours: number;
	machine_name_id: string;
	minutes: number;
	name: string;
	percent: number;
	seconds: number;
	text: string;
	total_seconds: number;
}

export interface OperatingSystem {
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	seconds: number;
	text: string;
	total_seconds: number;
}

export interface Project {
	color: any;
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	seconds: number;
	text: string;
	total_seconds: number;
}

export interface Range {
	date: string;
	end: string;
	start: string;
	text: string;
	timezone: string;
}

export interface LastFMResponse {
	recenttracks: Recenttracks;
}

interface Recenttracks {
	track: Track[];
	"@attr": Attr;
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

interface Attr {
	user: string;
	totalPages: string;
	page: string;
	perPage: string;
	total: string;
}

export interface DiscordResponse {
	data: Data;
	success: boolean;
}

interface Data {
	discord_user?: DiscordUser;
	activities?: Activity[];
	discord_status: string;
	active_on_discord_web: boolean;
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
	listening_to_spotify: boolean;
	spotify: Spotify;
}

interface Kv {
}

interface DiscordUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	clan: any;
	avatar_decoration_data: AvatarDecorationData;
	bot: boolean;
	global_name: string;
	primary_guild: any;
	display_name: string;
	public_flags: number;
}

interface AvatarDecorationData {
	sku_id: string;
	asset: string;
	expires_at: any;
}

interface Activity {
	id: string;
	name: string;
	type: number;
	state: string;
	emoji?: Emoji;
	created_at: number;
	flags?: number;
	session_id?: string;
	details?: string;
	timestamps?: Timestamps;
	assets?: Assets;
	sync_id?: string;
}

interface Emoji {
	name: string;
}

interface Timestamps {
	start: number;
	end: number;
}

interface Assets {
	large_image: string;
	large_text: string;
}

interface Spotify {
	timestamps: Timestamps;
	album: string;
	album_art_url: string;
	artist: string;
	song: string;
	track_id: string;
}
