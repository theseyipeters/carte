import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
	categories,
	fetchSuggested,
	setSuggestedCategory,
} from "../../../redux/slices/bookSlice";
import BookCard from "../../../components/common/BookCard/BookCard";
import Loader from "../../../components/common/Loader/Loader";

export default function Suggested() {
	const dispatch = useAppDispatch();
	const { suggested, activeSuggestedCategory, loading } = useAppSelector(
		(state) => state.books
	);

	useEffect(() => {
		dispatch(fetchSuggested(activeSuggestedCategory));
	}, [activeSuggestedCategory]);

	return (
		<section className="mb-[100px]">
			<h2 className="text-lg lg:text-xl font-semibold">Suggested for you</h2>
			<p className="text-sm text-gray-500">Based on your recent activity</p>

			<div className="mb-8 mt-4 flex items-center w-full justify-between">
				<div className="space-y-2 lg:space-y-3">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => dispatch(setSuggestedCategory(cat))}
							className={`capitalize mr-1 lg:mr-3 transition-all duration-300 ease-in-out  py-1 px-3 rounded-full text-sm border border-gray-200 ${
								activeSuggestedCategory === cat
									? "font-semibold bg-black text-gray-200"
									: "font-normal bg-gray-100"
							}`}>
							{cat}
						</button>
					))}
				</div>
			</div>

			{loading && (
				<div className="w-full flex items-center justify-center h-[400px]">
					<Loader />
				</div>
			)}

			{!loading && suggested && suggested.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 scrollbar-hide">
					{suggested?.map((book) => (
						<BookCard
							key={book.id}
							book={book}
						/>
					))}
				</div>
			)}
		</section>
	);
}
