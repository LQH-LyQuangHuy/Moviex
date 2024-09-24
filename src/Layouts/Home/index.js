
import classNames from "classnames/bind";
import styles from './Home.module.scss'
import { Carousel, ConfigProvider, Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from "react";

import Button from "../../Components/Button";
import Card from "../../Components/Card";
import LoadingPage from "../../Components/LoadingPage";



const cx = classNames.bind(styles)

function Home() {
    const [loading, setLoading] = useState(false)
    const [NewMovies , setNewMovies] = useState([])
    const [ShowingMovies , setShowingMovies] = useState([])
    const [FeatureFilms , setFeatureFilms] = useState([])
    const [TVShows , setTVShows] = useState([])
    const [BannerVideos , setBannerVideos] = useState([])
    

    useEffect(()=>{
        const NewUpdateMovies = fetch('https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1' )
        const ShowingMovies = fetch('https://phim.nguonc.com/api/films/danh-sach/phim-dang-chieu?page=1')
        const FeatureFilms = fetch('https://phim.nguonc.com/api/films/danh-sach/phim-le?page=1')
        const TVShows = fetch('https://phim.nguonc.com/api/films/danh-sach/tv-shows?page=1')

        setLoading(true)

        async function callAPI () {
            try {
                await Promise.all([NewUpdateMovies, ShowingMovies, FeatureFilms, TVShows])
                .then((results) => Promise.all([results[0].json(), results[1].json(), results[2].json(), results[3].json()]))
                .then((data) => {
                    setNewMovies(data[0].items)
                    setShowingMovies(data[1].items)
                    setFeatureFilms(data[2].items)
                    setTVShows(data[3].items)
                })
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }

        callAPI()
    
    },[])

    function handleClickBtn () {
        
    }
    

    return (  
        <div className={cx('wrapper')}>
            {loading ? 
                <LoadingPage/>
                :
                <div className={cx('content')}>
                    <div className={cx('banner-container')}>
                        <div className={cx('banner')}>
                            <div className={cx('banner-video')}>
                                {/* <iframe className={cx('iframe')} 
                                src="https://www.youtube.com/embed/L-aFL-bX1ao?autoplay=1&mute=1&start=20&controls=0&rel=0&loop=1"
                                frameBorder={0}
        
                                ></iframe> */}
                                <img src="https://occ-0-58-325.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR0j40lPKJvpLDTtxYw0f4hJd4dF3IaDyKf4Gpz3LLDhsU_drc_m9XP56sMu_8bFai0GBaIV4iI9NFhN9w-7BLQ8dWdmR30QWF-H.jpg?r=725"/>
                            </div>
                            <div className={cx('banner-info')}>
                                <div className={cx("info-container")}>
                                    <h1 className={cx('name')}>{BannerVideos[0]?.name || 'One Piece'}</h1>
                                    <p className={cx('description')}>
                                        {BannerVideos[0]?.description || 'One Piece Film Red kể về câu chuyện của Uta, cô ca sĩ nổi tiếng nhất thế giới. Cô sẽ tổ chức buổi biểu diễn âm nhạc khổng lồ của mình tại đảo âm nhạc Elegia và sẽ thu hút rất nhiều người. Trong đó có cả băng Mũ Rơm, hải tặc, hải quân, đặc biệt khi Uta là con gái của Tứ Hoàng Shanks Tóc Đỏ và cũng là người bạn của Luffy thuở ấu thơ.'}
                                    </p>
                                </div>
                                {BannerVideos[0] ? <Button to={`/phim/${BannerVideos[0].slug}`} className={cx('large')} onClick={handleClickBtn}>Xem Ngay</Button> : null}
                            </div>
                            
                        </div>
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('movies-container')}>
                            <h3 className={cx('list-name')}>Phim Mới Cập Nhật</h3>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Carousel: {
                                            arrowSize:25,
                                            
                                        }
                                    },
                                    token: {
                                        
                                    },
                                  }}
                            >
                                <Carousel 
                                    arrows
                                    draggable
                                    dots={false}
                                    speed={900}
                                    slidesToShow={6}
                                    slidesToScroll={2}
                                >
                                    {NewMovies.map((NewMovie) => 
                                        <Card 
                                            key={NewMovie.slug} 
                                            className={cx('movie')} 
                                            thumbnail={NewMovie.thumb_url}
                                            to= {`/phim/${NewMovie.slug}`}
                                            data={NewMovie}
                                        ></Card>
                                    )}
                                </Carousel>
                            </ConfigProvider>
                        </div>
                        <div className={cx('movies-container')}>
                            <h3 className={cx('list-name')}>Phim Mới Đang chiếu</h3>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Carousel: {
                                            arrowSize:25,
                                            
                                        }
                                    },
                                    token: {
                                        
                                    },
                                  }}
                            >
                                <Carousel 
                                    arrows
                                    draggable
                                    dots={false}
                                    speed={900}
                                    slidesToShow={6}
                                    slidesToScroll={2}
                                >
                                    {ShowingMovies.map((ShowingMovie) => 
                                        <Card 
                                            key={ShowingMovie.slug} 
                                            className={cx('movie')} 
                                            thumbnail={ShowingMovie.thumb_url}
                                            to ={`/phim/${ShowingMovie.slug}`}
                                            data={ShowingMovie}
                                        ></Card>
                                    )}
                                </Carousel>
                            </ConfigProvider>
                        </div>

                        <div className={cx('movies-container')}>
                            <h3 className={cx('list-name')}>Phim Lẻ</h3>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Carousel: {
                                            arrowSize:25,
                                            
                                        }
                                    },
                                    token: {
                                        
                                    },
                                  }}
                            >
                                <Carousel 
                                    arrows
                                    draggable
                                    dots={false}
                                    speed={900}
                                    slidesToShow={6}
                                    slidesToScroll={2}
                                >
                                    {FeatureFilms.map((FeatureFilm) => 
                                        <Card 
                                            key={FeatureFilm.slug} 
                                            className={cx('movie')} 
                                            thumbnail={FeatureFilm.thumb_url}
                                            to={`/phim/${FeatureFilm.slug}`}
                                            data={FeatureFilm}
                                        ></Card>
                                    )}
                                </Carousel>
                            </ConfigProvider>
                            
                        </div>
                        <div className={cx('movies-container')}>
                            <h3 className={cx('list-name')}>TV Shows</h3>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Carousel: {
                                            arrowSize:25,
                                            
                                        }
                                    },
                                    token: {
                                        
                                    },
                                  }}
                            >
                                <Carousel 
                                    arrows
                                    draggable
                                    dots={false}
                                    speed={900}
                                    slidesToShow={6}
                                    slidesToScroll={2}
                                >
                                    {TVShows.map((TVShow) => 
                                        <Card 
                                            key={TVShow.slug} 
                                            className={cx('movie')} 
                                            thumbnail={TVShow.thumb_url}
                                            data={TVShow}
                                            to={`/phim/${TVShow.slug}`}
                                        ></Card>
                                    )}
                                </Carousel>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            }
            
            
        </div>
    );
}

export default Home;