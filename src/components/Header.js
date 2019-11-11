import React from 'react';
import logo from '../assets/images/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Router Module
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Header(props) {
    const { isUserLoggedIn, onUserLogout, history } = props;

    function logout() {
        onUserLogout();
        history.push("/");
    }
    
    return (
        <header className="container bg-primary">
            <nav className="navbar navbar-expand-lg navbar-dark navbar-white">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className="header-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {!isUserLoggedIn &&
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/" activeClassName="selected">Home</NavLink>
                            </li>
                        }
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/expenses" activeClassName="selected">Expenses</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" activeClassName="selected">Contact</NavLink>
                        </li>
                        {isUserLoggedIn &&
                            <li className="nav-item">
                                <div className="nav-link">
                                    <button className="btn btn-outline-light btn-sm" onClick={logout}>
                                        <FontAwesomeIcon 
                                            icon={faSignOutAlt}
                                            size="1x"
                                        />
                                    </button>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default withRouter(Header);
