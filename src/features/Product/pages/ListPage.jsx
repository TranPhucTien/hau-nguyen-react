import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import productsApi from '~/api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import { useMemo } from 'react';

ListPage.propTypes = {};

const GridLeft = styled(Grid)({
    width: '250px',
});

const GridRight = styled(Grid)({
    flex: '1 1 0',
});

const BoxPagination = styled(Box)({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '20px',
    paddingBottom: '20px',
});

function ListPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);

        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 9,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    }, [location.search]);

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    });
    const [loading, setLoading] = useState(true);

    // const [filters, setFilters] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 9,
    //     _sort: queryParams._sort || 'salePrice:ASC',
    // }));

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productsApi.getAll(queryParams);
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('failed to fetch product list: ', error);
            }

            setLoading(false);
        })();
    }, [queryParams]);

    // useEffect(() => {
    //     navigate({
    //         pathname: location.pathname,
    //         search: queryString.stringify(filters),
    //     });
    // }, [filters, navigate, location.pathname]);

    const handlePageChange = (e, page) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page,
        // }));

        const filters = {
            ...queryParams,
            _page: page,
        };

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleSortChange = (newSortValue) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _sort: newSortValue,
        // }));

        const filters = {
            ...queryParams,
            _sort: newSortValue,
        };

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleFiltersChange = (newFilters) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters,
        // }));

        const filters = {
            ...queryParams,
            ...newFilters,
        };

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const setNewFilters = (newFilters) => {
        // setFilters(newFilters);
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(newFilters),
        });
    };

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <GridLeft item>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                        </Paper>
                    </GridLeft>

                    <GridRight item>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                            <FilterViewer filters={queryParams} onChange={setNewFilters} />

                            {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

                            <BoxPagination>
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                />
                            </BoxPagination>
                        </Paper>
                    </GridRight>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
