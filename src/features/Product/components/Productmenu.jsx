import { Box, Link, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

ProductMenu.propTypes = {};

const Root = styled(Box)({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
        padding: '16px 32px',
    },

    '& > li > a': {
        color: '#555',
        textDecoration: 'none',
    },

    '& > li > a.active': {
        color: '#1976d2;',
        textDecoration: 'underline',
    },
});

function ProductMenu(props) {
    return (
        <Root component="ul">
            <li>
                <Link component={NavLink} to="" end>
                    Description
                </Link>
            </li>
            <li>
                <Link component={NavLink} to="additional">
                    Additional Information
                </Link>
            </li>
            <li>
                <Link component={NavLink} to="reviews">
                    Review
                </Link>
            </li>
        </Root>
    );
}

export default ProductMenu;
