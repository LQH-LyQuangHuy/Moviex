
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './Card.module.scss'

const cx = classNames.bind(styles)

function Card({className, thumbnail, name, language, to ="", href="", data, ...passProps }) {
    className = className?.split(' ')
    
    let Comp = 'a'
    const props = {
        ...passProps
    }

    if (to) {
        Comp = Link
        props.to = to
    }
    if (href) {
        Comp = 'a'
        props.href = href 
    }
    
    return (  
        <Comp className={cx('wrapper', className)} {...props} >
            <div className={cx('thumbnail')}>
                <img src={thumbnail || ''}  alt={name || "Tên Phim"}/>
            </div>
            {name && <div className={cx('name')}>
                <div>{name}</div>
            </div>}
            {/* {language && <div className={cx('language')}>
                {language}
            </div>} */}
        </Comp>
    );
}

export default Card;