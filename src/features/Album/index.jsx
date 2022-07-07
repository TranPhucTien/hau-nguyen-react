import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Doa hong nhac viet',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/5/7/0/c/570cf1e80793ab207aecd51f535906c8.jpg',
        },
        {
            id: 2,
            name: 'K-EDM',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/6/3/b/2/63b2882dd6c45019276504675dcea419.jpg',
        },
        {
            id: 3,
            name: 'V-pop Day hua hen',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/a/3/e/9a3ec6a734da129c3805ffcb0f9e1822.jpg',
        },
    ]
    return (
        <div>
            <h2>Co the ban se thich day~</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;