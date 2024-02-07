import { Link } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <nav className="main-nav">
            <Link to="/"><img src={logo} alt='logo argent bank'/></Link>
            <h1 className='sr-only'>Argent Bank</h1>
            <div>
                <Link to="/sign-in">
                    <FontAwesomeIcon icon={faUserCircle} />
                    Sign In
                </Link>
            </div>
        </nav>
    )
}

export default Header;