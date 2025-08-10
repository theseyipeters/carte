import { Link } from "react-router-dom";
import type { Book } from "../../../types/book";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { StarIcon, ExternalLinkIcon } from "@heroicons/react/24/solid";

interface BookCardProps {
	book: Book;
}

export default function SearchResultBookCard({ book }: BookCardProps) {
	return (
		<div className="flex items-center justify-between flex-shrink-0 w-full overflow-hidden transition border-b border-gray-300 py-3">
			<div className="w-[70%]">
				{/* Authors */}
				<p
					title={book.authors.join(", ")}
					className="text-xs text-gray-500 line-clamp-2">
					{book.authors.join(", ")}
				</p>

				{/* Title */}
				<Link
					to={"/"}
					className="font-semibold text-xl line-clamp-1 hover:underline underline-offset-2 mt-2 w-fit"
					title={book.title}>
					{book.title}
				</Link>

				{/* Meta */}
				<div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
					{book.publishedDate && <span>{book.publishedDate.slice(0, 4)}</span>}
					{book.categories?.[0] && <span>• {book.categories[0]}</span>}
					{book.pageCount && <span>• {book.pageCount} pages</span>}
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
				</div>

				{/* Description */}
				<p className="text-base text-gray-500 line-clamp-4 mt-1">
					{book.description}
				</p>

				{/* Preview link */}
				{book.previewLink && (
					<a
						href={book.previewLink}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center text-sm mt-4 hover:underline">
						Preview
						<Icon
							icon={"tabler:external-link"}
							className="ml-1"
						/>
					</a>
				)}
			</div>

			{/* Thumbnail */}
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
		</div>
	);
}
