import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Header.css";
import { AuthContext } from '../../context/AuthContext';

const nav__links = [
    { path: '/home', display: "Home" },
    { path: '/tours', display: "Tours" },
    { path: '/gallery', display: "Gallery" },
    { path: '/about', display: "About" },
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        console.log("Logout button clicked"); 
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const handleScroll = () => {
        if (headerRef.current) {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }
        }
    };

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className='header' ref={headerRef}>
            <Container>
                <Row>
                    <div className='nav__wrapper d-flex align-items-center justify-content-between'>

                        <div className="logo">
                            <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626662/logo_nxjrps.png' alt="logo" />
                        </div>

                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                            <ul className='menu d-flex align-items-center gap-5'>
                                {
                                    nav__links.map((item, index) => (
                                        <li className="nav__item" key={index}>
                                            <NavLink className={navClass => navClass.isActive ? 'active__link' : ""} to={item.path}>
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="nav__right d-flex align-items-center gap-4">
                            <div className="nav__btns d-flex align-items-center gap-4">
                                {user ? (
                                    <>
                                        <h5 className='mb-0'>{user.Name.replace(/\b\w/g, (char) => char.toUpperCase())}</h5>
                                        {user.role === "admin" && ( 
                                            <Button className='btn secondary__btn'>
                                                <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin Options</Link>
                                            </Button>
                                        )}
                                        <Button className='btn btn-dark' onClick={logout}>
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button className='btn secondary__btn'>
                                            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>login</Link>
                                        </Button>
                                        <Button className='btn primary__btn'>
                                            <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Register</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                            <span className='mobile__menu' onClick={toggleMenu}>
                                <i className='ri-menu-line'></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
