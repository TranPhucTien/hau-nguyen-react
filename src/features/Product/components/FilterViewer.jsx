import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, styled } from '@mui/material';
import { useMemo } from 'react';

const BoxRoot = styled(Box)({
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    padding: 0,
    margin: '16px 0',
    listStyleType: 'none',

    '& > li': {
        margin: 0,
        padding: '8px',
    },
});

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: (filters) => true,
        isRemovable: false,
        onRemove() {},
        onToggle(filters) {
            const newFilters = { ...filters };

            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove(filters) {
            const newFilters = { ...filters };
            delete newFilters.isPromotion;

            return newFilters;
        },
        onToggle() {},
    },
    {
        id: 3,
        getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove(filters) {
            const newFilters = { ...filters };
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;

            return newFilters;
        },
        onToggle() {},
    },
    {
        id: 4,
        getLabel: (filters) => `${filters['category.name']}`,
        isActive: () => true,
        isVisible: (filters) => Boolean(filters['category.id']),
        isRemovable: true,
        onRemove(filters) {
            const newFilters = { ...filters };
            delete newFilters['category.id'];
            delete newFilters['category.name'];

            return newFilters;
        },
        onToggle(filters) {},
    },
];

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    }, [filters]);

    return (
        <BoxRoot component="ul">
            {visibleFilters.map((x) => (
                <li key={x.id}>
                    <Chip
                        size="small"
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={
                            x.isRemovable
                                ? null
                                : () => {
                                      if (!onChange) return;

                                      const newFilters = x.onToggle(filters);
                                      onChange(newFilters);
                                  }
                        }
                        onDelete={
                            x.isRemovable
                                ? () => {
                                      if (!onChange) return;

                                      const newFilters = x.onRemove(filters);
                                      onChange(newFilters);
                                  }
                                : null
                        }
                    />
                </li>
            ))}
        </BoxRoot>
    );
}

export default FilterViewer;
