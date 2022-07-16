import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import categoryApi from '~/api/categoryApi';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';
import FilterSkeletonByCategory from './Filters/FilterSkeletonByCategory';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await categoryApi.getAll();
                setCategoryList(
                    list.map((x) => ({
                        id: x.id,
                        name: x.name,
                    })),
                );

                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch category list: ', error);
            }
        })();
    }, []);

    const handleCategoryChange = (newCategoryId, newCategoryName) => {
        if (!onChange) return;

        const newFilters = {
            'category.id': newCategoryId,
            'category.name': newCategoryName,
        };

        onChange(newFilters);
    };

    const handleChange = (values) => {
        if (onChange) onChange(values);
    };

    return (
        <Box>
            {loading ? (
                <FilterSkeletonByCategory length={9} />
            ) : (
                <FilterByCategory data={categoryList} onChange={handleCategoryChange} />
            )}
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    );
}

export default ProductFilters;
