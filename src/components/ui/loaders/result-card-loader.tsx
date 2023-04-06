import ContentLoader from "react-content-loader";

const ResultCardLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={334}
		height={230}
		viewBox="0 0 334 230"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		className="w-full h-auto"
		{...props}
	>
		<rect x="0" y="0" rx="6" ry="6" width="334" height="230" />
	</ContentLoader>
);

export default ResultCardLoader;
