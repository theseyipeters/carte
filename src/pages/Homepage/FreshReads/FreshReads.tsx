import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
	fetchFreshReads,
	setFreshCategory,
} from "../../../redux/slices/bookSlice";
import BookCard from "../../../components/common/BookCard/BookCard";

const categories = ["fiction", "biography", "science", "history"];

export default function FreshReads() {
	const dispatch = useAppDispatch();
	const { freshReads, activeFreshCategory } = useAppSelector(
		(state) => state.books
	);

	useEffect(() => {
		dispatch(fetchFreshReads(activeFreshCategory));
	}, [activeFreshCategory]);

	return (
		<section>
			<h2 className="text-xl font-semibold">Fresh Reads</h2>
			<p className="text-sm">Newest arrivals from around the world</p>

			<div className="mb-4 mt-4">
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => dispatch(setFreshCategory(cat))}
						style={{
							fontWeight: activeFreshCategory === cat ? "bold" : "normal",
						}}
						className="capitalize mr-3 bg-gray-200 py-1 px-3 rounded-full text-sm">
						{cat}
					</button>
				))}
			</div>

			<div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
				{freshReads?.map((book) => (
					<BookCard
						key={book.id}
						book={book}
					/>
				))}
			</div>
		</section>
	);
}
