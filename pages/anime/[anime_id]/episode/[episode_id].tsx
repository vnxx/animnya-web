import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStepForward, AiFillStepBackward } from "react-icons/ai";

import Button from "../../../../components/Button";
import Container from "../../../../components/Container";
import useSharePage from "../../../../components/useSharePage";
import LoadingScreen from "../../../../components/LoadingScreen";
import AnimeEpisodeCard from "../../../../components/Anime/EpisodeCard";
import FavoriteButton from "../../../../components/Anime/FavoriteButton";

import { AnimeEpisodeType, AnimeType } from "../../../../types/anime";
import {
	useAnimeEpisodeFetcher,
	useAnimeFetcher,
} from "../../../../lib/fetcher";
import { getHistories } from "../../../../lib/helper";

export default function EpisodePage() {
	const router = useRouter();

	if (!router.query.anime_id || !router.query.episode_id)
		return <LoadingScreen />;

	const { ShareButton, ShareModal } = useSharePage();

	const { animeData, isAnimeLoading, isAnimeError } = useAnimeFetcher(
		router.query.anime_id as string
	);
	const { episodeData, isEpisodeLoading, isEpisodeError } =
		useAnimeEpisodeFetcher(
			router.query.anime_id as string,
			router.query.episode_id as string
		);
	const [nextEpisode, setNextEpisode] = useState<AnimeEpisodeType | null>(null);
	const [previousEpisode, setPreviousEpisode] =
		useState<AnimeEpisodeType | null>(null);

	const [streamingUrl, setStreamingUrl] = useState<string | null>(null);
	useEffect(() => {
		if (episodeData) setStreamingUrl(episodeData.data.watches[0].stream_url);

		if (animeData && episodeData) {
			const animeHistories = getHistories();
			const animeHistory = animeHistories.find(
				(history) => history.id === animeData.data.id
			);
			const currentEpisodeIndex = animeData.data.episodes.findIndex(
				(episode) => episode.id === episodeData.data.id
			);
			if (animeHistory) {
				animeHistory.currentEpisodeID = episodeData.data.id;
				localStorage.setItem("histories", JSON.stringify(animeHistories));
			} else {
				localStorage.setItem(
					"histories",
					JSON.stringify([
						...animeHistories,
						{
							...animeData.data,
							currentEpisodeID: episodeData.data.id,
						},
					])
				);
			}

			setNextEpisode(animeData.data.episodes[currentEpisodeIndex - 1]);
			setPreviousEpisode(animeData.data.episodes[currentEpisodeIndex + 1]);
		}
	}, [episodeData, animeData]);

	if (
		isAnimeError ||
		isEpisodeError ||
		(!isAnimeLoading && !animeData) ||
		(!isEpisodeLoading && !episodeData)
	) {
		return (
			<div>
				<h1>Ada error</h1>
			</div>
		);
	}

	if (isAnimeLoading || isEpisodeLoading) return <LoadingScreen />;

	const anime = animeData?.data as AnimeType;
	const episode = episodeData?.data as AnimeEpisodeType;
	const title = `Episode ${episode.episode} ${anime.title}`;

	return (
		<>
			<Head>
				<title>{title} | Animnya</title>
			</Head>

			<div className="mb-12 bg-black">
				<Container className="flex justify-center items-center xl:px-6">
					<div className="w-full space-y-6">
						{streamingUrl && (
							<iframe
								allowFullScreen={true}
								className="aspect-video w-full"
								src={streamingUrl}
							/>
						)}

						<div className="flex overflow-auto space-x-4">
							{episode.watches.map((watch, i) => (
								<button
									key={i}
									onClick={() => setStreamingUrl(watch.stream_url)}
									className={`flex-0 px-6 py-1 text-md whitespace-nowrap ${
										streamingUrl !== watch.stream_url
											? "bg-secondary text-white xl:hover:bg-white xl:hover:text-gray-900"
											: "bg-white text-gray-900 xl:hover:bg-secondary xl:hover:text-white"
									} transition duration-300 ease-in-out rounded-md flex justify-center items-center`}
								>
									{watch.source}
								</button>
							))}
						</div>
					</div>
				</Container>
			</div>

			<Container className="xl:px-6">
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="block xl:sticky xl:w-[40%]">
						<div className="space-y-8 bg-primary rounded-t-[30px]">
							<div className="flex w-full justify-between items-center flex-0">
								<ShareButton />
								<FavoriteButton anime={anime} />
							</div>

							<h1 className="text-2xl xl:text-4xl font-bold">{title}</h1>
						</div>
					</div>

					<div className="xl:w-[60%]">
						<div className="space-y-8">
							<div
								className={`grid ${
									previousEpisode && nextEpisode ? "grid-cols-2" : "grid-cols-1"
								} gap-3`}
							>
								{previousEpisode && (
									<Link
										href={`/anime/${anime.id}/episode/${previousEpisode.id}`}
									>
										<Button className="flex justify-center items-center">
											<AiFillStepBackward size="20px" />{" "}
											<span className="ml-2">
												Eps {previousEpisode.episode}
											</span>
										</Button>
									</Link>
								)}

								{nextEpisode && (
									<Link href={`/anime/${anime.id}/episode/${nextEpisode.id}`}>
										<Button
											colorScheme="red"
											className="flex justify-center items-center"
										>
											<AiFillStepForward size="20px" />
											<span className="ml-2">Eps {nextEpisode.episode}</span>
										</Button>
									</Link>
								)}
							</div>

							<div>
								<h2 className="mb-6 text-2xl font-bold">Semua Episode</h2>

								<div className="grid grid-cols-5 xl:grid-cols-6 gap-3">
									{[...(!isAnimeLoading ? anime.episodes : new Array(4))].map(
										(_episode: AnimeEpisodeType, i) => (
											<AnimeEpisodeCard
												key={i}
												isActive={_episode.id === episode.id}
												animeID={anime.id}
												episode={_episode}
											/>
										)
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>

			<ShareModal />
		</>
	);
}
