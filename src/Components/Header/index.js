
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LoadingOutlined, CloseCircleOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


import './Header.css'
import styles from './Header.module.scss'
import { useDebounce } from "../../Hooks";
import TooltipCustom from "../../Components/TooltipCustom";


const cx = classNames.bind(styles)

function Header({className}) {
    const location = useLocation()
    const searchWrapperRef = useRef(null)
    const searchRef = useRef(null)
    const selectedmovieSearch = useRef(null)
    const menuBarRef = useRef(null)

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchresult, setSearchresult] = useState([])
    
    const debounced = useDebounce(searchInput, 600)

    const categoryOptions = [
        {
            item: 'Hoạt Hình',
            path: '/the-loai/hoat-hinh'
        },
        {
            item: 'Hành Động',
            path: '/the-loai/hanh-dong'
        },
        {
            item: 'Cổ Trang',
            path: '/the-loai/co-trang'
        },
        {
            item: 'Tâm Lý',
            path: '/the-loai/tam-ly'
        },
        {
            item: 'Tình Cảm',
            path: '/the-loai/tinh-cam'
        },
        {
            item: 'Lãng Mạn',
            path: '/the-loai/lang-man'
        },
        {
            item: 'Hài',
            path: '/the-loai/hai'
        },
        {
            item: 'Phiêu Lưu',
            path: '/the-loai/phieu-luu'
        },
        {
            item: 'Hình Sự',
            path: '/the-loai/hinh-su'
        },
        {
            item: 'Tài Liệu',
            path: '/the-loai/tai-lieu'
        },
        {
            item: 'Chiến Tranh',
            path: '/the-loai/chien-tranh'
        },
        {
            item: 'Chính Kịnh',
            path: '/the-loai/chinh-kich'
        },
        {
            item: 'Lịch Sử',
            path: '/the-loai/lich-su'
        },
        {
            item: 'Giả Tưởng',
            path: '/the-loai/gia-tuong'
        },
        {
            item: 'Kinh Dị',
            path: '/the-loai/kinh-di'
        },
        {
            item: 'Bí Ẩn',
            path: '/the-loai/bi-an'
        },
        {
            item: 'Gây Cấn',
            path: '/the-loai/gay-can'
        },
        {
            item: 'Miền Tây',
            path: '/the-loai/mien-tay'
        },
        {
            item: 'Gia Đình',
            path: '/the-loai/gia-dinh'
        },
        {
            item: 'Nhạc',
            path: '/the-loai/nhac'
        },
        {
            item: 'Khoa Học Viễn Tưởng',
            path: '/the-loai/khoa-hoc-vien-tuong'
        },
    ]

    const nationalOptions =[
        {
            item: 'Việt Nam',
            path: '/quoc-gia/viet-nam'
        },
        {
            item: 'Hàn Quốc',
            path: '/quoc-gia/han-quoc'
        },
        {
            item: 'Trung Quốc',
            path: '/quoc-gia/trung-quoc'
        },
        {
            item: 'Thái Lan',
            path: '/quoc-gia/thai-lan'
        },
        {
            item: 'Nhật Bản',
            path: '/quoc-gia/nhat-ban'
        },
        {
            item: 'Đài Loan',
            path: '/quoc-gia/dai-loan'
        },
        {
            item: 'Hồng Kông',
            path: '/quoc-gia/hong-kong'
        },
        {
            item: 'Ấn Độ',
            path: '/quoc-gia/an-do'
        },
        {
            item: 'Âu Mỹ',
            path: '/quoc-gia/au-my'
        },
        {
            item: 'Hà Lan',
            path: '/quoc-gia/ha-lan'
        },
        {
            item: 'Indonesia',
            path: '/quoc-gia/indonesia'
        },
        {
            item: 'Nga',
            path: '/quoc-gia/nga'
        },
        {
            item: 'Pháp',
            path: '/quoc-gia/phap'
        },
        {
            item: 'Anh',
            path: '/quoc-gia/anh'
        },
        {
            item: 'Philippines',
            path: '/quoc-gia/philippines'
        },
        {
            item: 'Các Quốc Gia Khác',
            path: '/quoc-gia/quoc-gia-khac'
        },
    ]

    const yearsOptions = [
        {
            item: 'Năm 2004',
            path: '/nam-phat-hanh/2004'
        },
        {
            item: 'Năm 2005',
            path: '/nam-phat-hanh/2005'
        },
        {
            item: 'Năm 2006',
            path: '/nam-phat-hanh/2006'
        },
        {
            item: 'Năm 2007',
            path: '/nam-phat-hanh/2007'
        },
        {
            item: 'Năm 2008',
            path: '/nam-phat-hanh/2008'
        },
        {
            item: 'Năm 2009',
            path: '/nam-phat-hanh/2009'
        },
        {
            item: 'Năm 2010',
            path: '/nam-phat-hanh/2010'
        },
        {
            item: 'Năm 2011',
            path: '/nam-phat-hanh/2011'
        },
        {
            item: 'Năm 2012',
            path: '/nam-phat-hanh/2012'
        },
        {
            item: 'Năm 2013',
            path: '/nam-phat-hanh/2013'
        },
        {
            item: 'Năm 2014',
            path: '/nam-phat-hanh/2014'
        },
        {
            item: 'Năm 2015',
            path: '/nam-phat-hanh/2015'
        },
        {
            item: 'Năm 2016',
            path: '/nam-phat-hanh/2016'
        },
        {
            item: 'Năm 2017',
            path: '/nam-phat-hanh/2010'
        },
        {
            item: 'Năm 2018',
            path: '/nam-phat-hanh/2018'
        },
        {
            item: 'Năm 2019',
            path: '/nam-phat-hanh/2019'
        },
        {
            item: 'Năm 2020',
            path: '/nam-phat-hanh/2020'
        },
        {
            item: 'Năm 2021',
            path: '/nam-phat-hanh/2021'
        },
        {
            item: 'Năm 2022',
            path: '/nam-phat-hanh/2022'
        },
        {
            item: 'Năm 2023',
            path: '/nam-phat-hanh/2023'
        },
        {
            item: 'Năm 2024',
            path: '/nam-phat-hanh/2024'
        },
    ]

    useEffect(()=>{
        if (debounced) {
            setSearchInput('')
            setShow(false)
        }
    },[location])

    useEffect(()=>{
        if(!debounced.trim()) {
            setSearchInput('')
            setSearchresult([])
            return 
        }
        const movieSlug = debounced.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(' ', '-')
        async function searchMovie() {
            try {
                await fetch(`https://phim.nguonc.com/api/films/search?keyword=${movieSlug}`)
                .then(res => res.json())
                .then(data => {
                    setSearchresult(data.items)
                    
                })
            }
            catch (error) {
                console.log('Internet error')
            }
        }
        searchMovie()
        
    },[debounced])

    useEffect(()=>{
        if(searchresult.length > 0 && debounced){
            setShow(true)
        }
        else {
            setShow(false)
        }
    },[searchresult, debounced])

    function handleSerachInput(e) {
        setSearchInput(e.target.value)
    }

    function handlefocusSearchInput (e) {
        if (document.activeElement === searchRef.current) {
            setShow(true)
        }
        
    }

    useEffect(()=>{
        function show (e) {
            if (document.activeElement != searchRef.current) {
                setShow(false)
            }
        }
        window.addEventListener ('click', show)
        
        // cleanup ffc
        return () => {
            window.removeEventListener('click', show)
        }
        
    },[show])
    
    useEffect(()=>{
        function hanhleHiden() {
            if(window.innerWidth > 784) {
                const showMenuBar = cx('show-menu-bar')
                menuBarRef.current.classList.remove(showMenuBar)
            }
            if(window.innerWidth > 1089) {
                const showCls = cx('show')
                searchWrapperRef.current.classList.remove(showCls)
            }

        }

        window.addEventListener('resize', hanhleHiden)

        return () =>{
            window.removeEventListener('resize', hanhleHiden)
        }
    },[])

    function handleClear() {
        setSearchInput('')
    }
    
    return (  
       <div className={cx('wrapper', className)}>
            <Link to='/' className={cx('logo', 'flex')}>MOVIEX</Link>
            <Link to='/' className={cx('nav', 'flex')} >Trang chủ</Link>
            <Link to={'/phim-moi-cap-nhat'} className={cx('nav', 'flex')}>Phim Mới</Link>
            <Link to={'/danh-sach/phim-le'} className={cx('nav', 'flex')}>Phim Lẻ</Link>
            <Link to={'/danh-sach/phim-bo'} className={cx('nav', 'flex')}>Phim Bộ</Link>
            <Link to={'/danh-sach/tv-shows'} className={cx('nav', 'flex')}>TV Shows</Link>
            <div className={cx('nav', 'flex', 'category')}>
                Thể loại
                <TooltipCustom className={cx('sub-nav', 'category-sub-nav', 'active')} options={categoryOptions}/>
            </div>
           
            <div className={cx('nav', 'flex', 'national')}>
                Quốc Gia
                <TooltipCustom className={cx('sub-nav', 'national-sub-nav', 'active')} options={nationalOptions}/>
            </div>
            <div className={cx('nav', 'flex', 'year')}>
                Năm
                <TooltipCustom className={cx('sub-nav', 'year-sub-nav',  'active')} options={yearsOptions}/>
            </div>
            <div ref={searchWrapperRef} className={cx('search', 'flex')}>
                <input 
                    ref={searchRef} 
                    value={searchInput}
                    onChange={handleSerachInput} 
                    onClick={handlefocusSearchInput} 
                    placeholder="Tìm Kiếm..."
                />
                {loading && 
                    <div className={cx('search-loading', 'input-fns')}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} />
                    </div>
                }

                {debounced && 
                    <div className={cx('search-clear', 'input-fns')} onClick={handleClear}>
                        <CloseCircleOutlined />
                    </div>
                }
                
                <div className={cx("search-result", {'Header_active' : show})}>
                    
                    {(searchresult.length > 0 ) ? 
                        searchresult.map((movie)=>{
                           return(
                                <Link 
                                    key={movie.name} 
                                    ref={selectedmovieSearch} 
                                    to={`/phim/${movie.slug}`} 
                                    className={cx('movie-container')} 
                                    
                                >
                                    <img className={cx('thumbnail')} src={movie.thumb_url || movie.poster_url}></img>
                                    <div className={cx('movie-info')} >
                                        <h4 className={cx('movie-name')}>{movie.name}</h4>
                                        <div className={cx('movie-language')}>{movie.language}</div>
                                    </div>
                                </Link>
                           )
                        })
                        
                        :
                        <div className={cx('null-search-result')}>Không có kết quả tìm kiếm</div>
                        
                    }
                </div>
            </div>
            <div 
                className={cx('search-icon')}
                onClick={(e)=> {
                    const showCls = cx('show')
                    searchWrapperRef.current.classList.toggle(showCls)
                }}
            >
                <SearchOutlined  />
            </div>
            <div 
                className={cx('menu-icon')}
                onClick={(e)=> {
                    const showMenuBar = cx('show-menu-bar')
                    menuBarRef.current.classList.toggle(showMenuBar)
                }}
            >
                <MenuOutlined />
            </div>
            <div ref={menuBarRef} className={cx('menu-container')}>
                <Link to='/' className={cx('menu-item')}>Trang chủ</Link>
                <Link to={'/phim-moi-cap-nhat'} className={cx('menu-item')}>Phim Mới</Link>
                <Link to={'/danh-sach/phim-le'} className={cx('menu-item')}>Phim Lẻ</Link>
                <Link to={'/danh-sach/phim-bo'} className={cx('menu-item')}>Phim Bộ</Link>
                <Link to={'/danh-sach/tv-shows'} className={cx('menu-item')}>TV Shows</Link>
                <div className={cx('menu-item')}>Thể loại</div>
                <div className={cx('menu-item')}>Quốc Gia</div>
                <div className={cx('menu-item')}>Năm</div>
            </div>
       </div>
        
    );
}

export default Header;