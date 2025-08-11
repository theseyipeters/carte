import type { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setBooks } from "../../../redux/slices/bookSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

const Search = ({
	query,
	setQuery,
	onSearch,
}: {
	query: string;
	setQuery: (q: string) => void;
	onSearch: (e: FormEvent) => void;
}) => {
	const dispatch = useAppDispatch();
	const { searching } = useAppSelector((state) => state.books);
	return (
		<form
			onSubmit={onSearch}
			className="w-full max-w-[600px] h-[45px] flex items-center justify-between gap-2">
			<div className="flex items-center gap-2 w-full h-full border border-gray-300 rounded  px-3">
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search by title, author, or keyword..."
					className=" w-full h-full py-1 focus:outline-none placeholder:text-gray-300"
				/>

				{query !== "" && (
					<div
						className="cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							setQuery("");
							dispatch(setBooks(null));
						}}>
						<Icon icon={"ic:round-close"} />
					</div>
				)}
			</div>
			<button
				type="submit"
				disabled={searching}
				className="bg-black text-white text-sm font-semibold h-full w-fit whitespace-nowrap py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed">
				{searching ? "Finding..." : "Find books"}
			</button>
		</form>
	);
};

export default Search;
