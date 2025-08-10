import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
	fetchFreshReads,
	setFreshCategory,
} from "../../../redux/slices/bookSlice";
import BookCard from "../../../components/common/BookCard/BookCard";
import { Link } from "react-router-dom";

const categories = [
	"fiction",
	"biography",
	"science",
	"history",
	"psychology",
	"music",
];

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
			<p className="text-sm text-gray-500">
				Newest arrivals from around the world
			</p>

			<div className="mb-4 mt-4 flex items-center w-full justify-between">
				<div>
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => dispatch(setFreshCategory(cat))}
							className={`capitalize mr-3  py-1 px-3 rounded-full text-sm border border-gray-200 ${
								activeFreshCategory === cat
									? "font-semibold bg-gray-200"
									: "font-normal bg-gray-100"
							}`}>
							{cat}
						</button>
					))}
				</div>

				<Link
					to={""}
					className="text-sm">
					More categories
				</Link>
			</div>

			<div className="grid grid-cols-3 gap-6 overflow-x-auto pb-4 scrollbar-hide">
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
