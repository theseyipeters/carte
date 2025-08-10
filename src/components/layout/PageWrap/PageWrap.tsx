import { Icon } from "@iconify/react/dist/iconify.js";
import type { ReactNode } from "react";
import { scrollToTop } from "../../../utils/helpers";
import BookDetails from "../../dialogs/BookDetails/BookDetails";

interface PageLayoutProps {
	children: ReactNode;
}

export default function PageWrap({ children }: PageLayoutProps) {
	return (
		<div>
			<div className="relative flex items-center justify-center w-full min-h-screen bg-gray-100">
				<div className="w-full max-w-[1280px] h-full mx-auto px-4 md:px-4 lg:px-8 xl:px-8 py-8 flex flex-col">
					{children}
				</div>

				{/* ====== Affix  */}
				<div
					onClick={() => scrollToTop()}
					className="fixed bottom-5 right-5 rounded-full w-[50px] h-[50px] bg-black text-white flex items-center justify-center cursor-pointer">
					<Icon
						icon={"stash:arrow-up"}
						fontSize={25}
					/>
				</div>
			</div>
			{/* <footer className="bg-black text-gray-300 h-[400px]"></footer> */}

			<BookDetails />
		</div>
	);
}
