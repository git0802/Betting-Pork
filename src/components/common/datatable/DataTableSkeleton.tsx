import ContentLoader from 'react-content-loader';

const DataTableSkeleton = () => (
  <ContentLoader
    backgroundColor="#ababab"
    foregroundColor="#919191"
    width="80%"
    height="15"
  >
    <rect x="0" y="0" rx="5" ry="5" width="80%" height="15" />
  </ContentLoader>
);

export default DataTableSkeleton;
