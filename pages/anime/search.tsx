import Head from "next/head";
import getConfig from "next/config";
import { FormEvent, useRef, useState } from "react";

import Button from "../../components/Button";
import Container from "../../components/Container";
import AnimeCard from "../../components/AnimeCard";

import { AnimeType } from "../../types/anime";
import Spinner from "../../components/Spinner";

const { publicRuntimeConfig } = getConfig();

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPage() {
	const searchRef = useRef<HTMLInputElement>(null);
	const [data, setData] = useState<AnimeType[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const res = await fetcher(
				`${publicRuntimeConfig.apiUrl}/anime/search?query=${searchRef.current?.value}`
			);
			setData(res.data);
		} catch (error) {}

		setIsLoading(false);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetchData();
	};

	return (
		<>
			<Head>
				<title>Search | Animnya</title>
			</Head>

			<section>
				<Container>
					<h2 className="font-bold text-2xl mb-5">Search</h2>
					<form onSubmit={handleSubmit} className="space-y-3">
						<input
							className="text-black w-full p-2 rounded-full px-6 h-[40px] outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
							readOnly={isLoading}
							type="text"
							ref={searchRef}
							placeholder="Sword Art Online"
						/>
						<Button
							disabled={isLoading}
							type="submit"
							className="h-[40px] rounded-full"
						>
							{isLoading ? <Spinner /> : "Okay"}
						</Button>
					</form>

					<div className="grid grid-cols-2 xl:grid-cols-5 gap-6 gap-y-8 mt-6">
						{[...(!isLoading && data ? data : new Array(4))].map(
							(anime, i: any) => (
								<AnimeCard
									key={i}
									isLoading={isLoading}
									anime={
										isLoading
											? undefined
											: {
													id: anime.id,
													title: anime.title,
													cover_url: anime.cover_url,
													created_at: anime.created_at,
											  }
									}
								/>
							)
						)}
					</div>
				</Container>
			</section>
		</>
	);
}
