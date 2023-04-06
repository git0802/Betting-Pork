/* eslint-disable @next/next/no-img-element */
import CardItemGamesBlur from "./card-item-games-blur-rtp";
import CardItemGamesTransform from "./card-item-games-transform-rtp";
interface Props {
  name: string;
  image: string;
  provider: string;
  showRTP?: boolean;
  valueRTP?: number;
  height?: string;
  type?: "blur" | "transform" | string;
}

const CardItemGames = ({
  name,
  image,
  provider,
  showRTP = false,
  valueRTP,
  height,
  type,
}: Props) => {
  if (type === "blur")
    return (
      <CardItemGamesBlur
        name={name}
        image={image}
        provider={provider}
        showRTP={showRTP}
        valueRTP={valueRTP}
        height={height}
      />
    );
  else if (type === "transform")
    return (
      <CardItemGamesTransform
        name={name}
        image={image}
        provider={provider}
        showRTP={showRTP}
        valueRTP={valueRTP}
        height={height}
      />
    );

  return (
    <CardItemGamesBlur
      name={name}
      image={image}
      provider={provider}
      showRTP={showRTP}
      valueRTP={valueRTP}
      height={height}
    />
  );
};

export default CardItemGames;
