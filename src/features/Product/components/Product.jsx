import { Box, Skeleton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

Product.propTypes = {
    product: PropTypes.object,
};

function Product({ product }) {
    return (
        <Box padding={1}>
            <Skeleton variant="rectangular" width="100%" height={118} />

            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                {product.salePrice} - {product.promotionPercent}
            </Typography>
        </Box>
    );
}

export default Product;
