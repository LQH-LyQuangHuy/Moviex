
import { Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles)

function LoadingPage({className = ''}) {
    className = className.split(' ')
    return (  
        <div className={cx('wrapper', className )}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
    );
}

export default LoadingPage;