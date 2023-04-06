import GameCardLoader from "@components/ui/loaders/game-grid-card-loader";

interface Props {
	limit?: number;
	uniqueKey?: string;
}

const GameFeedLoader = ({ limit = 6, uniqueKey = "game" }: Props) => {
	return (
		<>
			{Array.from({ length: limit }).map((_, idx) => (
				<GameCardLoader key={idx} uniqueKey={`${uniqueKey}-${idx}`} />
			))}
		</>
	);
};

export default GameFeedLoader;
