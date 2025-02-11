import "./main.css";

const TZ_OFFSET = 1;

let clock: HTMLParagraphElement;

document.addEventListener("DOMContentLoaded", (_) => {
	clock = document.getElementById("current_time")! as HTMLParagraphElement;
	setInterval(UpdateClock, 100);
});

const UpdateClock = () => {
	let time = new Date(Date.now());
	clock.innerText = `${((time.getUTCHours() + TZ_OFFSET) % 24)
		.toString(10)
		.padStart(2, "0")}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;
};
