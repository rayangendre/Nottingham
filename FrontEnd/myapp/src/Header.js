import { Link } from 'react-router-dom';

import './Header.css';

const HeaderLink = ({page}) => {
    const title = page.charAt(0).toUpperCase() + page.slice(1);
    return <Link to={'/${page}'}>{title}</Link>;
};

const Header = () => {
    return (
        <div className='header'>
            <HeaderLink page='portfolio'/>
            <HeaderLink page='watchlist'/>
            <HeaderLink page='stockcheck'/>
            <HeaderLink page='login'/>
        </div>

    );
};

export default Header;