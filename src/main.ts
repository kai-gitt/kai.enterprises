import "./main.css";

const TZ_OFFSET = 1;

let clock: HTMLParagraphElement;
let wakatime: HTMLParagraphElement;

interface CumulativeTotal {
	decimal: string;
	digital: string;
	seconds: number;
	text: string;
}

document.addEventListener("DOMContentLoaded", async (_) => {
	clock = document.getElementById("current_time")! as HTMLParagraphElement;
	wakatime = document.getElementById("wakatime")! as HTMLParagraphElement;
	setInterval(UpdateClock, 100);
	await UpdateWakatimeData();
});

const UpdateClock = () => {
	let time = new Date(Date.now());
	clock.innerText = `${((time.getUTCHours() + TZ_OFFSET) % 24)
		.toString(10)
		.padStart(2, "0")}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;
};

const UpdateWakatimeData = async (): Promise<void> => {
	const req = await fetch("https://services.kai.enterprises/wakatime");
	const data = (await req.json()) as CumulativeTotal;
	wakatime.innerText = data.text;
};
