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
