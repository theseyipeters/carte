import { useState } from "react";
import type { FormEvent } from "react";
import PageWrap from "../../components/layout/PageWrap/PageWrap";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchBooks, setPage } from "../../redux/slices/bookSlice";
import { LogoWithText } from "../../svgs/carte";
import Search from "../../components/common/Search/Search";
import Loader from "../../components/common/Loader/Loader";
import SearchResultBookCard from "../../components/common/BookCard/SearchResultBookCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { scrollToTop } from "../../utils/helpers";
import Suggested from "./Suggested/Suggested";

export default function Homepage() {
	const dispatch = useAppDispatch();
	const { books, searching, error, page, totalItems } = useAppSelector(
		(state) => state.books
	);
	const [query, setQuery] = useState("");

	const hasMore = (books?.length ?? 0) < totalItems;

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		if (!query.trim()) return;
		dispatch(fetchBooks({ query, page: 0 }));
	};

	const handlePrev = async () => {
		const nextPage = page - 1;
		dispatch(setPage(nextPage));
		try {
			await dispatch(fetchBooks({ query, page: nextPage })).unwrap();
		} catch (error) {
			console.error("Failed to fetch previous page:", error);
			dispatch(setPage(page));
		} finally {
			scrollToTop();
		}
	};
	const handleNext = async () => {
		const nextPage = page + 1;
		dispatch(setPage(nextPage));
		try {
			await dispatch(fetchBooks({ query, page: nextPage })).unwrap();
		} catch (error) {
			console.error("Failed to fetch previous page:", error);
			dispatch(setPage(page));
		} finally {
			scrollToTop();
		}
	};

	return (
		<PageWrap>
			{/* Header Section */}
			<header className="w-full flex flex-col items-center justify-center p-0 lg:p-8">
				<div className="w-[200px] lg:w-[300px] flex items-center justify-center">
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
			<main className="min-h-[400px] mt-8 w-full px-0 lg:px-6">
				{searching && (
					<div className="w-full flex items-center justify-center  h-[400px">
						<Loader />
					</div>
				)}
				{error && <p className="text-center text-red-500">{error}</p>}

				{!searching && books && books.length > 0 && (
					<>
						<div className="flex flex-wrap items-center justify-between mb-4 gap-4">
							<h2 className="font-semibold text-lg md:text-xl lg:text-2xl">
								Showing search results for{" "}
								<span className="text-gray-400">"{query}"</span>{" "}
							</h2>

							<p className="text-gray-500">
								Showing {page * 10} - {page * 10 + 10} of {totalItems} results
								{page > 0 && ` (Page ${page + 1})`}
							</p>
						</div>
						<div className="flex flex-col w-full ">
							{books.map((book) => (
								<SearchResultBookCard
									key={book.id}
									book={book}
								/>
							))}
						</div>
					</>
				)}

				{!searching && books && books.length === 0 && (
					<div className="flex items-center justify-center gap-2 h-[200px] mb-[100px] text-gray-500">
						<Icon
							icon={"mage:book"}
							fontSize={30}
						/>
						<p className="text-center ">
							No results found for "{query}".
							<span>
								<button className="underline ml-1 text-black">Try again</button>
							</span>
						</p>
					</div>
				)}

				{hasMore && books && books.length > 0 && (
					<div className="flex items-center gap-4 justify-between md:justify-center mb-[100px] mt-[50px]">
						<button
							disabled={page === 0}
							onClick={handlePrev}
							className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30">
							Prev
						</button>

						<div>
							<p className="hidden md:block">
								Showing {page * 10} - {page * 10 + 10} of {totalItems} results
								{page > 0 && ` (Page ${page + 1})`}
							</p>
						</div>
						<button
							disabled={!hasMore}
							onClick={handleNext}
							className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer">
							Next
						</button>
					</div>
				)}

				<div className="space-y-4">
					<Suggested />
				</div>
			</main>
		</PageWrap>
	);
}
