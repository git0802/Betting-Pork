import ContentLoader from 'react-content-loader';

export const SkeletonCarouselSwiper = () => {
    return (
        <div>
            <ContentLoader
                backgroundColor="#ededed"
                foregroundColor="#9e9e9e"
                width={400}
                height={25}
            >
                <rect x="30" y="250" rx="0" ry="0" width="200" height="25" />
            </ContentLoader>
            <ContentLoader
                backgroundColor="#ededed"
                foregroundColor="#9e9e9e"
                width={400}
                height={400}
                className='grid grid-cols-2 gap-3'
            >
                    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
            </ContentLoader>
        </div>
    )  
};
