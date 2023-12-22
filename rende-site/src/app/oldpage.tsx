"use client";
import { useEffect } from "react";

interface ImageProps {
	style: {
		left: string;
		top: string;
		zIndex: number;
	};
	dataset: {
		status: string;
	};
}

const Images: ImageProps[] = Array.from({ length: 10 }, (_, index) => ({
	style: { left: "0", top: "0", zIndex: 0 },
	dataset: { status: index === 0 ? "active" : "inactive" },
}));

const Home: React.FC = () => {
	let globalIndex = 0;
	let last = { x: 0, y: 0 };

	const activate = (image: ImageProps, x: number, y: number) => {
		image.style.left = `${x}px`;
		image.style.top = `${y}px`;
		image.style.zIndex = globalIndex;

		image.dataset.status = "active";

		last = { x, y };
	};

	const distanceFromLast = (x: number, y: number) => {
		return Math.hypot(x - last.x, y - last.y);
	};

	const handleOnMove = (e: MouseEvent) => {
		const clientX = e.clientX;
		const clientY = e.clientY;

		if (distanceFromLast(clientX, clientY) > window.innerWidth / 8) {
			const lead = Images[globalIndex % Images.length];
			const tail = Images[(globalIndex - 8) % Images.length];

			activate(lead, clientX, clientY);

			if (tail) tail.dataset.status = "inactive";

			globalIndex++;
		}
	};

	useEffect(() => {
		window.addEventListener("mousemove", handleOnMove);

		return () => {
			window.removeEventListener("mousemove", handleOnMove);
		};
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{Images.map((image, index) => (
				<div
					key={index}
					className="image"
					style={image.style}
					data-status={image.dataset.status}
				>
					<img
						src="your_image_source"
						alt={`Image ${index}`}
						width={100}
						height={100}
					/>
				</div>
			))}
			<p className="courier-new">Meet Rende. Meet anyone, whenever.</p>
		</main>
	);
};

export default Home;
