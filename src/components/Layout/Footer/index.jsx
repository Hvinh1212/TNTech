
import { Button, Input, Layout } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import tab from '../../../assets/images/real.png'



function Footer() {
    return (
        <div className="bg-white border-t-2 border-gray-200 px-4 py-8 sm:px-6 lg:px-8">
            <div className="footer__container grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
                {/* Logo và thông tin công ty */}
                <div className='footer__app__info'>
                    <div className="flex flex-col items-start gap-4">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px'
                        }}>
                            <img src={tab} className="w-[200px]" />

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
                    <p className="text-lg font-semibold mb-4">Tổng đài hỗ trợ</p>
                    <ul className="list-none p-0">
                        <li className="mb-2">
                            <p
                                style={{
                                    color: '#666',
                                    transition: 'color 0.2s ease' // Thêm transition cho smooth hover
                                }}

                            >Gọi mua: <span style={{ fontWeight: 500, color: '#1677ff' }}>0123456789</span> (8:00 - 21:30)</p>
                        </li>
                        <li className="mb-2">

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
                    <p className="text-lg font-semibold mb-4">Thông tin khác</p>
                    <ul className="list-none p-0">
                        <li className="mb-2">
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
                    <p className="text-lg font-medium mb-4">Đăng ký</p>
                    <p className="text-sm text-gray-600 mb-4">
                        Đăng ký ngay để nhận được thông tin mới nhất từ chúng tôi
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Input
                            className="flex-1 min-w-[100px] sm:min-w-[150px] h-10 rounded-md"
                            placeholder='Email...'
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="h-10 rounded-md px-6"
                        >
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;