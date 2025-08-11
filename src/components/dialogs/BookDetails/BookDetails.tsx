import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { toggleBookDetails } from "../../../redux/slices/dialogSlice";

export default function BookDetails() {
	const dispatch = useAppDispatch();
	const { book } = useAppSelector((state) => state.books);
	const { bookDetailsOpen: open } = useAppSelector((state) => state.dialogs);
	const onClose = () => {
		dispatch(toggleBookDetails(false));
	};

	if (!open || !book) return null;

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 overflow-hidden pb-5">
				<div className="flex justify-between items-center border-b border-gray-300 p-4">
					<h2 className="text-lg font-semibold">{book.title}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 cursor-pointer">
						✕
					</button>
				</div>

				<div className="p-4 space-y-4 overflow-y-auto max-h-[75vh]">
					<div className="w-[200px]">
						{book.thumbnail ? (
							<img
								src={book.thumbnail}
								alt={book.title}
								className="w-full h-[250px] object-cover"
							/>
						) : (
							<div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
								No Image
							</div>
						)}
					</div>

					{book.authors?.length > 0 && (
						<p className="text-sm text-gray-600">
							<span className="font-medium">Author(s):</span>{" "}
							{book.authors.join(", ")}
						</p>
					)}

					{book.categories && (
						<div className="flex flex-wrap gap-2">
							{book.categories.map((cat) => (
								<span
									key={cat}
									className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
									{cat}
								</span>
							))}
						</div>
					)}

					{book.publishedDate && (
						<p className="text-sm text-gray-600">
							<span className="font-medium">Published:</span>{" "}
							{book.publishedDate}
						</p>
					)}
					{book.publisher && (
						<p className="text-sm text-gray-600">
							<span className="font-medium">Published by:</span>{" "}
							{book.publisher}
						</p>
					)}

					{book.pageCount && (
						<p className="text-sm text-gray-600">
							<span className="font-medium">Pages:</span> {book.pageCount}
						</p>
					)}

					{book.averageRating && (
						<span className="flex items-center">
							<Icon
								icon={"fe:star"}
								color="#f7c632"
								className="mr-1"
							/>
							{book.averageRating.toFixed(1)}
						</span>
					)}

					{book.description && (
						<p className="text-sm text-gray-700">{book.description}</p>
					)}

					{book.previewLink && (
						<a
							href={book.previewLink}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center text-sm mt-2 hover:underline">
							Preview
							<Icon
								icon={"tabler:external-link"}
								className="ml-1"
							/>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
