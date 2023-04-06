import GameListCardLoader from "./game-list-card-loader";

interface Props {
	limit?: number;
}

const GameListFeedLoader = ({ limit = 12 }: Props) => {
	return (
		<>
			{Array.from({ length: limit }).map((_, idx) => (
				<GameListCardLoader key={idx} uniqueKey={`game-popular-${idx}`} />
			))}
		</>
	);
};

export default GameListFeedLoader;
