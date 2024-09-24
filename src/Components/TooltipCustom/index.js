
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";


import styles from './TooltipCustom.module.scss'

const cx = classNames.bind(styles)

function TooltipCustom({options = [{item: 'Name option', path: ''}], className= '', children}) {
    className = className.split(' ')

    return (  
        <div className={cx( 'wrapper', className)}>
            <div className={cx('options-container')}>
                {options.map((option) => {
                    const random = Math.round(Math.random() * 999999999)
                    return <Link key={random} className={cx('option')} to={option.path}>{option.item}</Link>
                })}
                
            </div>
        </div>
    );
}

export default TooltipCustom;