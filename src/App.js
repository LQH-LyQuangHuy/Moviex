
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';


import './App.css';
import styles from './App.module.scss'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Search from './Layouts/Search'
import Home from './Layouts/Home'
import Detail from './Layouts/Detail'
import Watch from './Layouts/Watch'
import Movie from './Layouts/Movie';


const cx = classNames.bind(styles)

function App() {
    const location = useLocation()
    const [path, setPath] = useState('')
    
    const userAgent = window.navigator.userAgent;
    if (/Mobile|Android/i.test(userAgent)) {
        console.log('Đang truy cập bằng thiết bị Androi, Mobile')
    } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
      console.log('Đang truy cập bằng thiết bị iOS (iPad, iPhone, iPod)')
    }
    
    useEffect(()=>{
        if (!location.pathname.includes('/phim/')) {
            setPath(location.pathname)
        }
    },[location])

    return (
        <div className={cx('App')}>
            <Header className={cx('header')} />
            <Routes>
                <Route path='/' Component={Home} />
                {/* <Route path='/tim-kiem' Component={Search} /> */}
                <Route path='/phim/:slug' Component={Detail} />
                <Route path='/phim/:slug/watch' Component={Watch} />
                <Route path={path} Component={Movie}/>
            </Routes>
            <Footer>
            </Footer>
        </div>
    );
}

export default App;
