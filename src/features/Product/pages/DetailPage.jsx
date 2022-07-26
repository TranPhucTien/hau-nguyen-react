import { Box, Container, Grid, LinearProgress, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addToCart } from '~/features/Cart/cartSlice';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/Productmenu';
import ProductReview from '../components/ProductReview';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const BoxRoot = styled(Box)({
    paddingBottom: '24px',
});

const GridLeft = styled(Grid)({
    width: '400px',
    padding: '12px',
    borderRight: '1px solid #ddd',
});

const GridRight = styled(Grid)({
    flex: '1 1 0',
    padding: '12px',
});

const LoadingBox = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
});

function DetailPage() {
    const { productId } = useParams();

    const { product, loading } = useProductDetail(productId);
    const dispatch = useDispatch();

    if (loading) {
        return (
            <LoadingBox>
                <LinearProgress />
            </LoadingBox>
        );
    }

    const handleAddToCartSubmit = ({ quantity }) => {
        const action = addToCart({
            id: product.id,
            product,
            quantity,
        });
        dispatch(action);
    };

    return (
        <BoxRoot>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <GridLeft item>
                            <ProductThumbnail product={product} />
                        </GridLeft>

                        <GridRight item>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </GridRight>
                    </Grid>
                </Paper>

                <ProductMenu />
                <Routes>
                    <Route path="/" element={<ProductDescription product={product} />} />
                    <Route path="additional" element={<ProductAdditional />} />
                    <Route path="reviews" element={<ProductReview />} />
                </Routes>
            </Container>
        </BoxRoot>
    );
}

export default DetailPage;
