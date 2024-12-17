
import { Button, Input, Layout } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import tab from '../../../assets/images/caterzen_logo.jpg'



function Footer() {
    const { Footer } = Layout;
    return (
        <Footer style={{
            backgroundColor: 'white',
            borderTop: '2px solid #dbdbdb',
            padding: 'clamp(20px, 3vw, 30px) clamp(16px, 2vw, 20px)' // Responsive padding
        }}>
            <div className='footer__container' style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive grid
                gap: 'clamp(20px, 3vw, 40px)',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Logo và thông tin công ty */}
                <div className='footer__app__info'>
                    <div className='footer__logo' style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px'
                        }}>
                            <img src={tab} className="w-[100px]" />
                            <span style={{
                                fontSize: '3rem',
                                fontWeight: 'bold'
                            }}>TnTech</span>
                        </div>
                        <ul style={{
                            listStyle: 'none',
                            fontSize: 'clamp(14px, 1.6vw, 16px)',
                            padding: '0',
                            margin: '0'
                        }}>
                            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '8px', fontSize: '20px' }} />
                                Trường Đại học Công Nghệ Thông Tin
                            </li>
                            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', fontSize: '20px' }} />
                                TnTech@gmail.com
                            </li>
                            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px', fontSize: '20px' }} />
                                0123456789
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sản phẩm */}
                <div className='footer__product'>
                    <p style={{
                        fontSize: 'clamp(18px, 2vw, 20px)',
                        fontWeight: '500',
                        marginBottom: '16px'
                    }}>Tổng đài hỗ trợ</p>
                    <ul style={{
                        listStyle: 'none',
                        fontSize: 'clamp(14px, 1.6vw, 16px)',
                        padding: '0',
                        margin: '0'
                    }}>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Gọi mua: <span style={{ fontWeight: 500, color: '#1677ff' }}>0123456789</span> (8:00 - 21:30)</p>
                        </li>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>

                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Khiếu nại: <span style={{ fontWeight: 500, color: '#1677ff' }}>0123456789</span> (8:00 - 21:30)</p>
                        </li>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Bào hành: <span style={{ fontWeight: 500, color: '#1677ff' }}>0123456789</span> (8:00 - 21:30)</p>
                        </li>

                    </ul>
                </div>

                {/* Danh mục */}
                <div className='footer__category'>
                    <p style={{
                        fontSize: 'clamp(18px, 2vw, 20px)',
                        fontWeight: '500',
                        marginBottom: '16px'
                    }}>Thông tin khác</p>
                    <ul style={{
                        listStyle: 'none',
                        fontSize: 'clamp(14px, 1.6vw, 16px)',
                        padding: '0',
                        margin: '0'
                    }}>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Tích điểm quà tặng VIP</p>
                        </li>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Tuyển dụng </p>
                        </li>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Góp ý, khiếu nại</p>
                        </li>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Chính sách bảo hành </p>
                        </li>
                        <li className="footer__product__list__item" style={{ marginBottom: '8px' }}>
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Tìm siêu thị</p>
                        </li>
                    </ul>
                </div>

                {/* Đăng ký */}
                <div className='footer__register'>
                    <p style={{
                        fontSize: 'clamp(18px, 2vw, 20px)',
                        fontWeight: '500',
                        marginBottom: '16px'
                    }}>Đăng ký</p>
                    <p style={{
                        fontSize: 'clamp(14px, 1.6vw, 16px)',
                        marginBottom: '16px',
                        color: '#666'
                    }}>
                        Đăng ký ngay để nhận được thông tin mới nhất từ chúng tôi
                    </p>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                    }}>
                        <Input
                            style={{
                                flex: '1',
                                minWidth: '200px',
                                borderRadius: '8px',
                                height: '40px'
                            }}
                            placeholder='Email...'
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                height: '40px',
                                borderRadius: '8px',
                                padding: '0 24px'
                            }}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default Footer;