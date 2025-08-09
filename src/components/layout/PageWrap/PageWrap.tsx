import type { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
}

export default function PageWrap({ children }: PageLayoutProps) {
	return (
		<div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
			<div className="w-full max-w-[1280px] h-full mx-auto px-4 md:px-4 lg:px-8 xl:px-8 pt-8 flex flex-col">
				{children}
			</div>
		</div>
	);
}
