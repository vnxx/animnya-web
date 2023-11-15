import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiHome7Line } from "react-icons/ri";
import { IoFlagOutline } from "react-icons/io5";
import { TiWeatherCloudy } from "react-icons/ti";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineSlowMotionVideo, MdOutlineRefresh } from "react-icons/md";

import Button from "../../../components/Button";
import Container from "../../../components/Container";
import useSharePage from "../../../components/useSharePage";
import LoadingScreen from "../../../components/LoadingScreen";
import AnimeInfoCard from "../../../components/Anime/InfoCard";
import ExpandedText from "../../../components/Anime/ExpandedText";
import AnimeEpisodeCard from "../../../components/Anime/EpisodeCard";
import FavoriteButton from "../../../components/Anime/FavoriteButton";

import { getHistories } from "../../../lib/helper";
import { useAnimeFetcher } from "../../../lib/fetcher";
import { AnimeEpisodeType, AnimeType } from "../../../types/anime";

export default function AnimePage() {
	const router = useRouter();
	if (!router.query.anime_id) return <LoadingScreen />;

	const { ShareButton, ShareModal } = useSharePage();
	const [nextEpisode, setNextEpisode] = useState<AnimeEpisodeType | null>(null);
	const [currentEpisode, setCurrentEpisode] = useState<AnimeEpisodeType | null>(
		null
	);

	const {
		animeData: data,
		isAnimeLoading: isLoading,
		isAnimeError: isError,
	} = useAnimeFetcher(router.query.anime_id as string);

	useEffect(() => {
		if (data) {
			const episodes = data.data.episodes;
			const animeHistoeies = getHistories();

			const animeHistory = animeHistoeies.find(
				(history) => history.id === data.data.id
			);
			if (animeHistory) {
				const currrentEpisodeIndex = episodes.findIndex(
					(episode) => episode.id === animeHistory.currentEpisodeID
				);
				setCurrentEpisode(
					episodes.find(
						(episode) => episode.id === animeHistory.currentEpisodeID
					) || null
				);
				setNextEpisode(episodes[currrentEpisodeIndex - 1] || null);
			}
		}
	}, [data]);

	if (isError || (!isLoading && !data)) {
		return (
			<div>
				<h1>Ada error</h1>
			</div>
		);
	}

	if (isLoading)
		return (
			<div className="flex justify-center items-center h-screen">
				<h1 className="text-2xl font-bold">Loading...</h1>
			</div>
		);

	const anime = data?.data as AnimeType;

	return (
		<>
			<Head>
				<title>{anime.title} | Animeku</title>
			</Head>

			<div className="mb-12 bg-black">
				<Container className="flex justify-center items-center px-0 xl:px-6">
					{anime.trailer_url && (
						<iframe className="aspect-video w-full" src={anime.trailer_url} />
					)}
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

							<h1 className="text-2xl font-bold">{anime.title}</h1>

							<ExpandedText text={anime.synopsis} />
						</div>
					</div>

					<div className="xl:w-[60%]">
						<div className="space-y-8">
							{(nextEpisode || currentEpisode) && (
								<div
									className={`grid ${
										nextEpisode && currentEpisode
											? "grid-cols-2"
											: "grid-cols-1"
									} gap-3`}
								>
									{currentEpisode && (
										<Link
											href={`/anime/${anime.id}/episode/${currentEpisode.id}`}
										>
											<Button className="flex justify-center items-center">
												<MdOutlineRefresh size="20px" />{" "}
												<span className="ml-2">
													Eps {currentEpisode.episode}
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
												<HiOutlineLightBulb size="20px" />
												<span className="ml-2">Eps {nextEpisode.episode}</span>
											</Button>
										</Link>
									)}
								</div>
							)}

							<div className="flex bg-primary overflow-auto space-x-4">
								<AnimeInfoCard
									value={anime.studio}
									label="Studio"
									icon={RiHome7Line}
								/>
								<AnimeInfoCard
									value={anime.total_episodes}
									label="Total Episode"
									icon={MdOutlineSlowMotionVideo}
								/>
								<AnimeInfoCard
									value={anime.release_date}
									label="Rilis"
									icon={IoFlagOutline}
								/>
								<AnimeInfoCard
									value={anime.season}
									label="Season"
									icon={TiWeatherCloudy}
								/>
							</div>

							<div>
								<h2 className="mb-6 text-2xl font-bold">Semua Episode</h2>

								<div className="grid grid-cols-5 xl:grid-cols-6 gap-3">
									{[...(!isLoading ? anime.episodes : new Array(4))].map(
										(episode: AnimeEpisodeType, i) => (
											<AnimeEpisodeCard
												key={i}
												animeID={anime.id}
												episode={episode}
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
