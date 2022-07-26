import { Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { formatPrice } from '~/utils';

ProductInfo.propTypes = {
    product: PropTypes.object,
};

const BoxRoot = styled(Box)({
    paddingBottom: '16px',
    borderBottom: '1px solid #eee'
});

const PriceBox = styled(Box)({
    padding: '16px',
    backgroundColor: '#eee',
});

const DescType = styled(Typography)({
    margin: '16px 0',
});

const SalePriceBox = styled(Box)({
    marginRight: '24px',
    fontSize: '32px',
    fontWeight: 'bold',
});

const OriginalPriceBox = styled(Box)({
    marginRight: '16px',
    textDecoration: 'line-through',
});

function ProductInfo({ product = {} }) {
    const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;

    return (
        <div>
            <BoxRoot>
                <Typography component="h1" variant="h4">
                    {name}
                </Typography>
                <DescType variant="body2">{shortDescription}</DescType>

                <PriceBox>
                    <SalePriceBox component="span">{formatPrice(salePrice)}</SalePriceBox>

                    {promotionPercent > 0 && (
                        <>
                            <OriginalPriceBox component="span">{formatPrice(originalPrice)}</OriginalPriceBox>
                            <Typography component="span">{` -${promotionPercent}%`}</Typography>
                        </>
                    )}
                </PriceBox>
            </BoxRoot>
        </div>
    );
}

export default ProductInfo;
