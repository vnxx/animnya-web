import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

import { AnimeHistoryType, AnimeType } from "../types/anime";

export function getFavorites(): AnimeType[] {
	let _favorites = localStorage.getItem("favorites");
	if (!_favorites) {
		localStorage.setItem("favorites", JSON.stringify([]));
		return [];
	}

	let favorites = JSON.parse(_favorites);
	return favorites;
}

export function isInFavorites(animeID: number) {
	let favorites = getFavorites();
	return favorites.some((anime: AnimeType) => anime.id === animeID);
}

export function getHistories(): AnimeHistoryType[] {
	let _histories = localStorage.getItem("histories");
	if (!_histories) {
		localStorage.setItem("histories", JSON.stringify([]));
		return [];
	}

	let histories = JSON.parse(_histories);
	return histories;
}

export function isInHistories(animeID: number) {
	let histories = getHistories();
	return histories.some((anime) => anime.id === animeID);
}

export function isNewEpisode(animeID: number, episodeID: number) {
	if (!isInFavorites(animeID)) return false;

	const animeHistories = getHistories();
	const animeHistory = animeHistories.find((history) => history.id === animeID);
	if (animeHistory) {
		if (episodeID > animeHistory.currentEpisodeID) return true;
	}

	return false;
}

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const mergeRefs = <T extends any>(
	...refs: (React.MutableRefObject<T> | React.LegacyRef<T>)[]
): React.RefCallback<T> => {
	return (v) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(v);
			} else if (ref !== null) {
				(ref as React.MutableRefObject<T | null>).current = v;
			}
		});
	};
};
