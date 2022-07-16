import { Box, Skeleton, styled } from '@mui/material';
import PropTypes from 'prop-types';

FilterSkeletonByCategory.propTypes = {
    length: PropTypes.number,
};

FilterSkeletonByCategory.defaultProps = {
    length: 6,
};

const BoxRoot = styled(Box)({
    padding: '16px',
});

const UlMenu = styled('ul')({
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
        marginTop: '8px',
        transition: 'all linear 0.25s',

        '&:hover': {
            color: 'blue',
            cursor: 'pointer',
        },
    },
});

function FilterSkeletonByCategory({ length = 9 }) {
    return (
        <BoxRoot>
            <Skeleton />
            <UlMenu>
                {Array.from(new Array(length)).map((x, index) => (
                    <li key={index}><Skeleton /></li>
                ))}
            </UlMenu>
        </BoxRoot>
    );
}

export default FilterSkeletonByCategory;
