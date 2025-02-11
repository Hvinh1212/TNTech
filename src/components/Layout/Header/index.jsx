import { Layout, Input } from 'antd';

import Navbar from '../../Mini_components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import tab from '../../../assets/images/real.png'
import {
    faUser,
    faBagShopping,
    faBars,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { DataContexts } from '../../../AppContexts/Contexts';

function Header() {
    const userID = localStorage.getItem("id")
    const { userCart, userInfo, fetchCartUser } = useContext(DataContexts)
    const { Search } = Input;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const [query, setQuery] = useState("")
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            navigate(`/san-pham?query=${query}`);
            setQuery("");
        }
    };

    const handleSearchOnclick = () => {
        navigate(`/san-pham?query=${query}`);
        setQuery("");
    };

    const [firstLogin, setFirstLogin] = useState(true);

    useEffect(() => {
        if (userID && firstLogin) {
            fetchCartUser(userID);
            setFirstLogin(false);
        }
        return;
    }, [userID, fetchCartUser, firstLogin]);


    const styles = {
        header: {
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            height: 'auto',
            lineHeight: 'normal',
            borderBottom: '2px solid #dbdbdb',
            padding: '0.5rem 0'
        },
        container: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: windowWidth <= 768 ? 'wrap' : 'nowrap',
            gap: '1rem'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexShrink: 0,
            minWidth: 'fit-content'
        },
        logoIcon: {
            fontSize: windowWidth <= 480 ? '2rem' : '3rem',
            color: '#1677ff'
        },
        logoText: {
            fontSize: windowWidth <= 480 ? '1.5rem' : '3rem',
            fontWeight: 'bold'
        },
        mobileMenuButton: {
            display: windowWidth <= 768 ? 'block' : 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0.5rem'
        },
        searchNav: {
            width: windowWidth <= 768 ? '100%' : '45%',
            display: windowWidth <= 768 ? (isMenuOpen ? 'flex' : 'none') : 'flex',
            flexDirection: 'column',
            gap: '1rem',
            order: windowWidth <= 768 ? '3' : '0',
            marginTop: windowWidth <= 768 ? '1rem' : '0',
            flexShrink: 0,
            alignItems: 'center',
            '& .ant-tabs-nav': {
                width: '100%'
            },
            '& .ant-tabs-nav-list': {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            },
            '& .ant-tabs-tab': {
                padding: '0 8px',
                margin: '0 !important',
                flex: 1,
                display: 'flex',
                justifyContent: 'center'
            }
        },
        headerControl: {
            display: windowWidth <= 768 ? (isMenuOpen ? 'flex' : 'none') : 'flex',
            gap: '1.5rem',
            width: 'auto',
            order: windowWidth <= 768 ? '4' : '0',
            marginTop: windowWidth <= 768 ? '1rem' : '0',
            justifyContent: windowWidth <= 768 ? 'center' : 'flex-start',
            flexWrap: 'nowrap',
            flexShrink: 0,
            minWidth: 'fit-content'
        },
        accountCart: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            flexDirection: windowWidth <= 480 ? 'column' : 'row',
            textAlign: windowWidth <= 480 ? 'center' : 'left',
            whiteSpace: 'nowrap'
        },
        icon: {
            fontSize: '2rem',
            padding: '0 0.5rem',
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        heading: {
            margin: 0,
            fontSize: '0.875rem',
            paddingBottom: '0.5rem'
        },
        link: {
            fontSize: '0.875rem',
            color: 'inherit',
            textDecoration: 'none'
        },
        searchContainer: {
            marginTop: '10px',
            width: '100%'
        }
    };

    return (
        <div style={styles.header}>
            <div style={styles.container}>
                {/* Logo Section */}
                <div style={styles.logo}>
                    <img src={tab} className="w-[200px]" />
                </div>

                {/* Mobile Menu Button */}
                <button
                    style={styles.mobileMenuButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                </button>

                {/* Search and Nav Section */}
                <div style={styles.searchNav}>
                    <div style={styles.searchContainer}>
                        <Search
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            size="medium"
                            placeholder="Tìm kiếm sản phẩm"
                            onSearch={handleSearchOnclick}
                            enterButton
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div>
                        <Navbar />
                    </div>
                </div>

                {/* User Controls */}
                <div style={styles.headerControl}>
                    <div style={styles.accountCart}  >
                        <FontAwesomeIcon icon={faUser} style={styles.icon} />

                        {userID ? (
                            <div style={styles.textContainer}>
                                <h5 style={styles.heading}>Tài khoản</h5>
                                <a href="/account" style={styles.link}>{userInfo.user_name ? userInfo.user_name : "Username"}</a>
                            </div>
                        )
                            :
                            (
                                <div style={styles.textContainer}>
                                    <a href="/dang-nhap" style={styles.link}>Đăng nhập</a>
                                </div>
                            )
                        }
                    </div>

                    <div style={styles.accountCart}>
                        <FontAwesomeIcon icon={faBagShopping} style={styles.icon} />
                        {userID ? (
                            <div style={styles.textContainer}>
                                <h5 style={styles.heading}>Giỏ hàng</h5>
                                <a href="/cart" style={styles.link}>Số sản phẩm: {userCart.length}</a>
                            </div>
                        )
                            :
                            (
                                <div style={styles.textContainer}>
                                    <a href="/cart" style={styles.link}>Giỏ hàng</a>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;