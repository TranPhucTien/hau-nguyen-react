import { Box, Container, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import productsApi from '~/api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';

ListPage.propTypes = {};

const GridLeft = styled(Grid)({
    width: '250px',
});

const GridRight = styled(Grid)({
    flex: '1 1 0',
});

function ListPage(props) {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await productsApi.getAll({ _page: 1, _limit: 10 });
                setProductList(data);
            } catch (error) {
                console.log('faild to fetch product list: ', error);
            }

            setLoading(false);
        })();
    }, []);

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <GridLeft item>
                        <Paper elevation={0}>Left column</Paper>
                    </GridLeft>

                    <GridRight item>
                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
                        </Paper>
                    </GridRight>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
