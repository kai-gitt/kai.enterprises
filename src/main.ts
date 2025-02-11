import "./main.css";
import { CumulativeTotal, Track } from "./model";

const TZ_OFFSET = 1;

let clock: HTMLParagraphElement;
let wakatime: HTMLParagraphElement;
let lastfm: {
	cover: HTMLImageElement;
	title: HTMLParagraphElement;
	subtitle: HTMLParagraphElement;
};

document.addEventListener("DOMContentLoaded", async (_) => {
	// couldn't think of a better way :<
	clock = document.getElementById("current_time")! as HTMLParagraphElement;
	wakatime = document.getElementById("wakatime")! as HTMLParagraphElement;
	lastfm = {
		cover: document.getElementById("lastfm_cover")! as HTMLImageElement,
		title: document.getElementById("lastfm_title")! as HTMLParagraphElement,
		subtitle: document.getElementById(
			"lastfm_subtitle"
		)! as HTMLParagraphElement,
	};
	setInterval(UpdateClock, 100);
	await UpdateWakatimeData();
	await UpdateLastFMData();
});

const UpdateClock = () => {
	let time = new Date(Date.now());
	clock.innerText = `${((time.getUTCHours() + TZ_OFFSET) % 24)
		.toString(10)
		.padStart(2, "0")}:${time
		.getUTCMinutes()
		.toString(10)
		.padStart(2, "0")}:${time
		.getUTCSeconds()
		.toString(10)
		.padStart(2, "0")}`;
};

const UpdateWakatimeData = async (): Promise<void> => {
	const req = await fetch("https://services.kai.enterprises/wakatime");
	const data = (await req.json()) as CumulativeTotal;
	wakatime.innerText = data.text;
};

const UpdateLastFMData = async (): Promise<void> => {
	const req = await fetch("https://services.kai.enterprises/lastfm");
	const data = (await req.json()) as Track;

	if (data.image[3]["#text"] != "") {
		lastfm.cover.src = data.image[3]["#text"];
		lastfm.cover.alt = `cover art of ${data.name}`;
		lastfm.cover.classList.remove("invert");
		lastfm.cover.classList.remove("opacity-*");
		lastfm.cover.classList.remove("opacity-30");
		lastfm.cover.classList.remove("p-*");
		lastfm.cover.classList.remove("p-8");
	}

	lastfm.title.innerText = data.name;
	lastfm.subtitle.innerText = `${data.album["#text"]} • ${data.artist["#text"]}`;
};
