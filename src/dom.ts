import { APP_CONFIG } from "./config";

export class DomElements {
	static getElement<T extends HTMLElement>(selector: string): T {
		const el = document.querySelector<T>(selector);
		if (!el) throw new Error(`Element not found: ${selector}`);
		return el;
	}

	static clock = DomElements.getElement<HTMLParagraphElement>(
		APP_CONFIG.SELECTORS.CLOCK
	);
	static wakatime = DomElements.getElement<HTMLParagraphElement>(
		APP_CONFIG.SELECTORS.WAKATIME
	);
	static lastfm = {
		cover: DomElements.getElement<HTMLImageElement>(
			APP_CONFIG.SELECTORS.LASTFM.COVER
		),
		coverBlur: DomElements.getElement<HTMLImageElement>(
			APP_CONFIG.SELECTORS.LASTFM.COVER_BLUR
		),
		title: DomElements.getElement<HTMLAnchorElement>(
			APP_CONFIG.SELECTORS.LASTFM.TITLE
		),
		subtitle: DomElements.getElement<HTMLParagraphElement>(
			APP_CONFIG.SELECTORS.LASTFM.SUBTITLE
		),
	};
	static weather = {
		temp: DomElements.getElement<HTMLParagraphElement>(
			APP_CONFIG.SELECTORS.WEATHER.TEMP
		),
		condition: DomElements.getElement<HTMLParagraphElement>(
			APP_CONFIG.SELECTORS.WEATHER.CONDITION
		),
	};
	static onlineStatus = DomElements.getElement<HTMLParagraphElement>(
		APP_CONFIG.SELECTORS.ONLINE_STATUS
	);
	static statusIndicator = DomElements.getElement<HTMLDivElement>(
		APP_CONFIG.SELECTORS.STATUS_INDICATOR
	);
}
