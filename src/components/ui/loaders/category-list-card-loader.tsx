import ContentLoader from "react-content-loader";

const CategoryListCardLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={400}
		height={'58vh'}
		viewBox="0 0 400 58vh"
		backgroundColor="#f9f9f9"
		foregroundColor="#ecebeb"
		className="w-full bg-gray-200 rounded-md"
		{...props}
	>
		<rect x="88" y="40" rx="3" ry="3" width="96" height="8" />
	</ContentLoader>
);

export default CategoryListCardLoader;
