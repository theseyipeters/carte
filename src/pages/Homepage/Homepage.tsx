import { useState } from "react";
import type { FormEvent } from "react";
import PageWrap from "../../components/layout/PageWrap/PageWrap";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchBooks } from "../../redux/slices/bookSlice";
import { LogoWithText } from "../../svgs/carte";
import FreshReads from "./FreshReads/FreshReads";
import Search from "../../components/common/Search/Search";
import Loader from "../../components/common/Loader/Loader";
import SearchResultBookCard from "../../components/common/BookCard/SearchResultBookCard";

export default function Homepage() {
	const dispatch = useAppDispatch();
	const { books, loading, error } = useAppSelector((state) => state.books);
	const [query, setQuery] = useState("");

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		if (!query.trim()) return;
		dispatch(fetchBooks(query));
	};

	return (
		<PageWrap>
			{/* Header Section */}
			<header className="w-full flex flex-col items-center justify-center p-8">
				<div className="w-[300px] flex items-center justify-center">
					<LogoWithText />
				</div>
				<div className="flex flex-wrap items-center justify-center gap-1 mt-1 text-center">
					<h1 className="font-bold">Your map to great books</h1>
					<span>-</span>
					<p className="text-gray-600">
						Discover your next great read, one page at a time.
					</p>
				</div>

				<div className="mt-8 w-full flex items-center justify-center">
					<Search
						query={query}
						setQuery={setQuery}
						onSearch={handleSearch}
					/>
				</div>
			</header>

			{/* Main content */}
			<main className="min-h-[400px] mt-8 w-full px-6">
				{loading && (
					<div className="w-full flex items-center justify-center">
						<Loader />
					</div>
				)}
				{error && <p className="text-center text-red-500">{error}</p>}

				{!loading && books && books.length > 0 && (
					<>
						<h2 className="mb-4 font-semibold text-2xl">
							Showing search results for{" "}
							<span className="text-gray-400">"{query}"</span>{" "}
						</h2>
						{/* <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"> */}
						<div className="flex flex-col w-full mb-[100px]">
							{books.map((book) => (
								<SearchResultBookCard
									key={book.id}
									book={book}
								/>
							))}
						</div>
					</>
				)}

				{!loading && books && books.length === 0 && (
					<p className="text-center text-gray-500 mb-[100px]">
						No books found for your search.
					</p>
				)}

				<div className="space-y-4">
					<FreshReads />
				</div>
			</main>
		</PageWrap>
	);
}
