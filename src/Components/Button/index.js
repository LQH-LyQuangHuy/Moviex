
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Button.module.scss'


const cx = classNames.bind(styles)

function Button({className= '' , children, to, href, ...passProps}) {
    className = className?.split(' ')
    let Comp = 'a'
    const props = {
        ...passProps
    }
    if (to) {
        Comp = Link
        props.to = to
    }
    else if (href) {
        Comp = 'a'
        props.href = href
    }


    return (  
        <Comp className={cx('wrapper', ...className)} {...props}>
            {children}
        </Comp>
    );
}

export default Button;