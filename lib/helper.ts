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