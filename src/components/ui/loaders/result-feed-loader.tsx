import ResultCardLoader from "@components/ui/loaders/result-card-loader";

interface Props {
	limit?: number;
	uniqueKey?: string;
}

const ResultFeedLoader = ({ limit = 8, uniqueKey = "results" }: Props) => {
	return (
		<>
			{Array.from({ length: limit }).map((_, idx) => (
				<ResultCardLoader key={idx} uniqueKey={`${uniqueKey}-${idx}`} />
			))}
		</>
	);
};

export default ResultFeedLoader;
