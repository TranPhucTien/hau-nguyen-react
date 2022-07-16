import { Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
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

function FilterByCategory({ data, onChange }) {
    const handleCategoryClick = (category) => {
        if (onChange) {
            onChange(category.id, category.name);
        }
    };

    return (
        <BoxRoot>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
            <UlMenu>
                {data.map((category) => (
                    <li key={category.id} onClick={() => handleCategoryClick(category)}>
                        <Typography variant="body2">{category.name}</Typography>
                    </li>
                ))}
            </UlMenu>
        </BoxRoot>
    );
}

export default FilterByCategory;
