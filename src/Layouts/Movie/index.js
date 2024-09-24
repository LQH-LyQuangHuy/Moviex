
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, ConfigProvider } from 'antd';


import styles from './Movie.module.scss'
import LoadingPage from '../../Components/LoadingPage'
import Card from '../../Components/Card'
const cx = classNames.bind(styles)

function Movie() {
    const [page, setPage] = useState(1)
    const [slug, setSlug] = useState('')
    const [movies, setMovies] = useState([])
    const [paginate, setPaginate] = useState(1)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const location = useLocation()
    const [isSearch, setIsSearch] = useState(false)
    const [keyword, setKeyword] = useState('')
    let totalPaginate 
    const defaultPaginate = 10

    if (paginate >= 100) {
        totalPaginate = 990
    }
    else if (paginate >= 1 || paginate < 100){
        totalPaginate = paginate * defaultPaginate
    }

    useEffect(()=>{
        if (location.pathname.includes('/tim-kiem') && location.search) {
            console.log(location)
            setTitle('Tìm Kiếm')
        }
        else {
            switch (location.pathname) {
                // --------Lọc theo danh sách--------
    
                case '/phim-moi-cap-nhat':
                    setSlug('/phim-moi-cap-nhat')
                    setTitle('Phim Mới Cập Nhật')
                    break
                case '/danh-sach/phim-le':
                    setSlug('/danh-sach/phim-le')
                    setTitle('Phim Lẻ')
                    break
                case '/danh-sach/phim-bo':
                    setSlug('/danh-sach/phim-bo')
                    setTitle('Phim Bộ')
                    break
                case '/danh-sach/tv-shows':
                    setSlug('/danh-sach/tv-shows')
                    setTitle('TV Shows')
                    break
    
                // --------Lọc theo thể loại--------
    
                case '/the-loai/hanh-dong':
                    setSlug('/the-loai/hanh-dong')
                    setTitle('Hành Động')
                    break
                case '/the-loai/hoat-hinh':
                    setSlug('/the-loai/hoat-hinh')
                    setTitle('Hoạt Hình')
                    break
                case '/the-loai/phieu-luu':
                    setSlug('/the-loai/phieu-luu')
                    setTitle('Phiêu Lưu')
                    break
                case '/the-loai/hai':
                    setSlug('/the-loai/hai')
                    setTitle('Hài')
                    break
                case '/the-loai/hinh-su':
                    setSlug('/the-loai/hinh-su')
                    setTitle('Hình Sự')
                    break 
                case '/the-loai/tai-lieu':
                    setSlug('/the-loai/tai-lieu')
                    setTitle('Tài Liệu')
                    break   
                case '/the-loai/chinh-kich':
                    setSlug('/the-loai/chinh-kich')
                    setTitle('Chính Kịch')
                    break
                case '/the-loai/gia-dinh':
                    setSlug('/the-loai/gia-dinh')
                    setTitle('Gia Đình')
                    break
                case '/the-loai/gia-tuong':
                    setSlug('/the-loai/gia-tuong')
                    setTitle('Giả Tưởng')
                    break
                case '/the-loai/lich-su':
                    setSlug('/the-loai/lich-su')
                    setTitle('Lịch Sử')
                    break
                case '/the-loai/kinh-di':
                    setSlug('/the-loai/kinh-di')
                    setTitle('Kinh Dị')
                    break
                case '/the-loai/nhac':
                    setSlug('/the-loai/nhac')
                    setTitle('Nhạc')
                    break
                case '/the-loai/bi-an':
                    setSlug('/the-loai/bi-an')
                    setTitle('Bí Ẩn')
                    break
                case '/the-loai/lang-man':
                    setSlug('/the-loai/lang-man')
                    setTitle('Lãng Mạn')
                    break
                case '/the-loai/khoa-hoc-vien-tuong':
                    setSlug('/the-loai/khoa-hoc-vien-tuong')
                    setTitle('Khoa Học Viễn Tưởng')
                    break
                case '/the-loai/gay-can':
                    setSlug('/the-loai/gay-can')
                    setTitle('Gây Cấn')
                    break
                case '/the-loai/chien-tranh':
                    setSlug('/the-loai/chien-tranh')
                    setTitle('Chiến Tranh')
                    break
                case '/the-loai/tam-ly':
                    setSlug('/the-loai/tam-ly')
                    setTitle('Tâm Lý')
                    break
                case '/the-loai/tinh-cam':
                    setSlug('/the-loai/tinh-cam')
                    setTitle('Tình Cảm')
                    break
                case '/the-loai/co-trang':
                    setSlug('/the-loai/co-trang')
                    setTitle('Cổ Trang')
                    break
    
                // --------Lọc theo quốc gia--------
    
                case '/quoc-gia/viet-nam':
                    setSlug('/quoc-gia/viet-nam')
                    setTitle('Việt Nam')
                    break
                case '/quoc-gia/han-quoc':
                    setSlug('/quoc-gia/han-quoc')
                    setTitle('Hàn Quốc')
                    break
                case '/quoc-gia/trung-quoc':
                    setSlug('/quoc-gia/trung-quoc')
                    setTitle('Trung Quốc')
                    break
                case '/quoc-gia/au-my':
                    setSlug('/quoc-gia/au-my')
                    setTitle('Âu Mỹ')
                    break
                case '/quoc-gia/anh':
                    setSlug('/quoc-gia/anh')
                    setTitle('Nước Anh')
                    break
                case '/quoc-gia/indonesia':
                    setSlug('/quoc-gia/indonesia')
                    setTitle('Indonesia')
                    break
                case '/quoc-gia/phap':
                    setSlug('/quoc-gia/phap')
                    setTitle('Nước Pháp')
                    break
                case '/quoc-gia/hong-kong':
                    setSlug('/quoc-gia/hong-kong')
                    setTitle('Hồng Kông')
                    break
                case '/quoc-gia/nhat-ban':
                    setSlug('/quoc-gia/nhat-ban')
                    setTitle('Nhật Bản')
                    break
                case '/quoc-gia/thai-lan':
                    setSlug('/quoc-gia/thai-lan')
                    setTitle('Thái Lan')
                    break
                case '/quoc-gia/dai-loan':
                    setSlug('/quoc-gia/dai-loan')
                    setTitle('Đài Loan')
                    break
                case '/quoc-gia/nga':
                    setSlug('/quoc-gia/nga')
                    setTitle('Nước Nga')
                    break
                case '/quoc-gia/philippines':
                    setSlug('/quoc-gia/philippines')
                    setTitle('Phiplippines')
                    break
                case '/quoc-gia/ha-lan':
                    setSlug('/quoc-gia/ha-lan')
                    setTitle('Hà Lan')
                    break
                case '/quoc-gia/an-do':
                    setSlug('/quoc-gia/an-do')
                    setTitle('Ấn Độ')
                    break
                case '/quoc-gia/quoc-gia-khac':
                    setSlug('/quoc-gia/quoc-gia-khac')
                    setTitle('Quốc Gia Khác')
                    break
    
                // --------Lọc theo năm--------
    
                case '/nam-phat-hanh/2004':
                    setSlug('/nam-phat-hanh/2004')
                    setTitle('Năm 2004')
                    break
                case '/nam-phat-hanh/2005':
                    setSlug('/nam-phat-hanh/2005')
                    setTitle('Năm 2005')
                    break
                case '/nam-phat-hanh/2006':
                    setSlug('/nam-phat-hanh/2006')
                    setTitle('Năm 2006')
                    break
                case '/nam-phat-hanh/2007':
                    setSlug('/nam-phat-hanh/2007')
                    setTitle('Năm 2007')
                    break
                case '/nam-phat-hanh/2008':
                    setSlug('/nam-phat-hanh/2008')
                    setTitle('Năm 2008')
                    break
                case '/nam-phat-hanh/2009':
                    setSlug('/nam-phat-hanh/2009')
                    setTitle('Năm 2009')
                    break
                case '/nam-phat-hanh/2010':
                    setSlug('/nam-phat-hanh/2010')
                    setTitle('Năm 2010')
                    break
                case '/nam-phat-hanh/2011':
                    setSlug('/nam-phat-hanh/2011')
                    setTitle('Năm 2011')
                    break
                case '/nam-phat-hanh/2012':
                    setSlug('/nam-phat-hanh/2012')
                    setTitle('Năm 2012')
                    break
                case '/nam-phat-hanh/2013':
                    setSlug('/nam-phat-hanh/2013')
                    setTitle('Năm 2013')
                    break
                case '/nam-phat-hanh/2014':
                    setSlug('/nam-phat-hanh/2014')
                    setTitle('Năm 2014')
                    break
                case '/nam-phat-hanh/2015':
                    setSlug('/nam-phat-hanh/2015')
                    setTitle('Năm 2015')
                    break
                case '/nam-phat-hanh/2016':
                    setSlug('/nam-phat-hanh/2016')
                    setTitle('Năm 2016')
                    break
                case '/nam-phat-hanh/2017':
                    setSlug('/nam-phat-hanh/2017')
                    setTitle('Năm 2017')
                    break
                case '/nam-phat-hanh/2018':
                    setSlug('/nam-phat-hanh/2018')
                    setTitle('Năm 2018')
                    break
                case '/nam-phat-hanh/2019':
                    setSlug('/nam-phat-hanh/2019')
                    setTitle('Năm 2019')
                    break
                case '/nam-phat-hanh/2020':
                    setSlug('/nam-phat-hanh/2020')
                    setTitle('Năm 2020')
                    break
                case '/nam-phat-hanh/2021':
                    setSlug('/nam-phat-hanh/2021')
                    setTitle('Năm 2021')
                    break
                case '/nam-phat-hanh/2022':
                    setSlug('/nam-phat-hanh/2022')
                    setTitle('Năm 2022')
                    break
                case '/nam-phat-hanh/2023':
                    setSlug('/nam-phat-hanh/2023')
                    setTitle('Năm 2023')
                    break
                case '/nam-phat-hanh/2024':
                    setSlug('/nam-phat-hanh/2024')
                    setTitle('Năm 2024')
                    break
            }
        }
        // console.log(location)
    },[location])

    useEffect(() =>{
        try {
            setLoading(true)
           ;(async function (){
                if (slug) {
                    if(!isSearch) {
                        fetch(`https://phim.nguonc.com/api/films${slug}?page=${page}`)
                        .then(res => res.json())
                        .then(data => {
                            setPaginate(data.paginate.total_page)
                            setMovies(data.items)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                    else{
                        fetch(`https://phim.nguonc.com/api/films/search?keyword=${keyword}`)
                        .then(res => res.json())
                        .then(data => {
                            setPaginate(data.paginate.total_page)
                            setMovies(data.items)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                }
           })()
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    },[page, slug])



    return ( 
        <div className={cx('wrapper')}>
            { loading ?
                <LoadingPage/>
                :
                <div className={cx('movie-wrapper')}>
                    <div className={cx('title', 'title-resize')}><h3>{title ? title : 'Danh Sách'}</h3></div>
                    {movies.length > 0 ?   
                        <div className={cx('movies-container')}>
                            {movies.map(movie => {
                                return (
                                    <Card
                                        key={movie.name}
                                        className={cx('movie-card')}
                                        thumbnail={movie.thumb_url}
                                        name={movie.name}
                                        to={`/phim/${movie.slug}`} 
                                    />
                                )
                            })}
                        </div>                  
                        :
                        null
                    }
                    <div className={cx('pagination')}>
                        <ConfigProvider
                            theme={{
                            token: {
                                colorPrimary: '#000000',
                                colorBgContainer: '#fafafa',
                                colorBgContainerDisabled: '#ff0000'
                            },
                            }}
                        >
                            <Pagination
                                total={totalPaginate}
                                showSizeChanger={false}
                                align="center"
                                onChange={(pageindex) => {
                                    setPage(pageindex)
                                }}
                            />
                        </ConfigProvider>
                    
                    </div>
                </div>
            }
        </div>
    );
}

export default Movie;