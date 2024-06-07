import { Link, useLocation } from "react-router-dom";
import "./nav.scss"
import pu from "./pui.png"
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function Nav() {


    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    const [user] = useAuthState(auth)





    return (




        < div className={isActive("/") ? "Nav" : "Nav Nav-white"} >
            <div className="nav-box">
                <Link to='/'><p className={isActive("/") ? "logo" : "logo logo-white"}>BrightSpark</p></Link>
                <div className="menu">

                    {
                        isActive("/") ?
                            <Link to='/'>
                                <a href="#services" className={isActive("/") ? "menu-item dsit" : "menu-item menu-item-white dsit"}>Services</a>
                            </Link>
                            : null
                    }
                    {
                        isActive("/")
                            ?
                            <a href="#contact" className={isActive("/") ? "menu-item dsit" : "menu-item menu-item-white dsit"}>Contact</a>
                            : null
                    }
                    {
                        user ? (
                            <Link to='/profile'>
                                <img alt="user" className="uimg" src={pu} />
                            </Link>
                        )
                            : <Link to='/login'>
                                <p className={isActive("/") ? "menu-item" : "menu-item menu-item-white"}>Login</p>
                            </Link>
                    }
                </div>
            </div>
        </div >
    )
}

export default Nav;