import ContentLoader from "react-content-loader";

const GameListCardLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={644}
		height={96}
		viewBox="0 0 644 96"
		backgroundColor="#f9f9f9"
		foregroundColor="#ecebeb"
		className="w-full h-auto"
		{...props}
	>
		<rect x="296" y="120" rx="3" ry="3" width="280" height="8" />
		<rect x="296" y="160" rx="3" ry="3" width="80" height="8" />
		<rect x="296" y="88" rx="3" ry="3" width="180" height="8" />
		<rect x="0" y="0" rx="6" ry="6" width="96" height="96" />
	</ContentLoader>
);

export default GameListCardLoader;
