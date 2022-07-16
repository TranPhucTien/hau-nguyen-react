import { Box, Container, Grid, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const BoxRoot = styled(Box)({});

const GridLeft = styled(Grid)({
    width: '400px',
    padding: '12px',
    borderRight: '1px solid #ddd',
});

const GridRight = styled(Grid)({
    flex: '1 1 0',
    padding: '12px',
});

function DetailPage() {
    const { productId } = useParams();

    const { product, loading } = useProductDetail(productId);

    if (loading) {
        return <Box>Loading...</Box>
    }

    return (
        <BoxRoot>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <GridLeft item>
                            <ProductThumbnail product={product} />
                        </GridLeft>

                        <GridRight item>Product info</GridRight>
                    </Grid>
                </Paper>
            </Container>
        </BoxRoot>
    );
}

export default DetailPage;
