import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';

const Profile = ({ username }) => {
    const navigate = useNavigate();
    return (
        <div className='profile'>
            <FontAwesomeIcon icon={faUserCircle} className='fa-xl'/>
            <p onClick={() => navigate('/user')}>{username}</p>
        </div>
    )
}

const Header = () => {
    const dispatch = useDispatch();
    const { token, userName } = useSelector(state => state.user);
    return (
        <nav className="main-nav">
            <Link to="/"><img className='main-nav-logo-image' src={logo} alt='logo argent bank'/></Link>
            <h1 className='sr-only'>Argent Bank</h1>
            <div>
                {
                token ? 
                <div className="profile-container">
                    <Profile username={userName} />
                    <div className="profile">
                        <FontAwesomeIcon icon={faRightFromBracket} className='fa-xl'/>
                        <span onClick={() => {
                            dispatch(logout());
                            localStorage.clear();
                        }}>Sign Out</span>
                    </div>
                </div>
                :
                <Link to="/sign-in">
                    <FontAwesomeIcon icon={faUserCircle} />
                    Sign In
                </Link> 
                }
            </div>
        </nav>
    )
}

export default Header;