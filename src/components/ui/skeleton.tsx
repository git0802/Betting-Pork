import ContentLoader from 'react-content-loader';

type TSkeleton = {
  width: string;
  height: string;
}

const Skeleton = (props: TSkeleton) => (
  <ContentLoader
    backgroundColor="#5c5c5c1f"
    foregroundColor="#7e7e7e1f"
    width={props.width}
    height={props.height}
  >
    <rect  width={props.width} height={props.height} />
  </ContentLoader>
);

export default Skeleton;
