import ContentLoader from "react-content-loader";

const GameCardLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={64}
		height={64}
		viewBox="0 0 64 64"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		className="mx-auto rounded-full"
		{...props}
	>
		<rect x="15" y="453" rx="3" ry="3" width="180" height="8" />
		<rect x="0" y="0" rx="6" ry="6" width="334" height="430" />
	</ContentLoader>
);

export default GameCardLoader;
