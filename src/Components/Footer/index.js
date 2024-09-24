
import classNames from "classnames/bind";
import { FacebookFilled, YoutubeFilled, InstagramFilled } from '@ant-design/icons'
import { Col, Row } from 'antd'
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer({children}) {
    return (  
        <div className={cx('wrapper')}>
            <div className={cx('icons')}>
                <a href="https://www.facebook.com/LQHbedau" className={cx('socials-network')}>
                    <FacebookFilled className={cx('icon')} />
                </a>
                <a  className={cx('socials-network')}>
                    <YoutubeFilled className={cx('icon')} />
                </a>
                <a  className={cx('socials-network')}>
                    <InstagramFilled className={cx('icon')} />
                    
                </a>
            </div>
            {/* <div className={cx('info')}>
        
                
            </div> */}
            <div className={cx('created-by')}>
                <p>© Design by Quang Huy</p>
            </div>
        </div>
    );
}

export default Footer;