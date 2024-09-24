
import { Routes, Route } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Detail.module.scss'
import { useEffect, useState,  } from "react";

import Button from '../../Components/Button';
import LoadingPage from "../../Components/LoadingPage";

const cx = classNames.bind(styles)

function Detail() {
    const pathSegments = window.location.href.split('/')
    const slug = pathSegments[pathSegments.length - 1]
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})
    const [NewEpisode, setNewEpisode] = useState({})
    
    useEffect(()=>{
        async function getFilm() {
            setLoading(true)
            try {
                await fetch(`https://phim.nguonc.com/api/film/${slug}`)
                .then(res => res.json())
                .then(data => {
                    setMovie(data.movie)
                    
                })
                .catch(error => console.log(error))
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
            
        }
        getFilm()
        
    },[])
    
    useEffect(()=>{
        if (movie) {
            let NewEpisodeIndex
            NewEpisodeIndex = movie?.episodes?.["0"]?.items.length - 1 
            const newE = movie?.episodes?.["0"]?.items[NewEpisodeIndex]
            setNewEpisode(newE) 
            if (movie.name) {
                document.title = movie.name
            }
        }
    },[movie])

    if(NewEpisode?.name == "Full") {
        NewEpisode.name = 1
    }
    // console.log(movie)
    return (  
        <div className={cx('wrapper')}>
            {loading ? 
                <LoadingPage className="loading-modal"/>
                :
                <div className={cx('container-info')}>
                    <div className={cx('thumbnail')}>
                        <div className={cx('img-container')}>
                            <img src={movie?.thumb_url}/>
                        </div>
                    </div>
                    <div className={cx('movie-info')}>
                        <div className={cx("name-container")}>
                            <h1 className={cx('movie-name')}>{movie?.name}</h1>
                            <div className={cx('origin-movie-name', 'text-color')}>{movie?.original_name}</div>
                        </div>
                        <div className={cx('detail-info')}>
                            <div className={cx('detail-info-col')}>
                                <div className={cx('movie-episodes', 'text-color')}>
                                    { ( movie.total_episodes !=0 ) ? 
                                        `Số tập: ${movie.episodes?.["0"]?.items.length}/${movie.total_episodes}` 
                                        : 
                                        `Số tập: ${movie.episodes?.["0"]?.items.length}/chưa rõ`
                                    }
                                    </div>
                                <div className={cx('movie-lang', 'text-color')}>Ngôn ngữ: {movie?.language}</div>
                                <div className={cx('movie-category', 'text-color')}>
                                    Thể loại: {movie?.category?.["2"].list.map((category) => {
                                        return <span key={category.id}>{` ${category.name}, `}</span>
                                    })}
                                </div>
                                <div className={cx('movie-year', 'text-color')}>
                                    Phát hành: {movie?.category?.["3"].list.map((year) => {
                                        return <span key={year.id}>{` ${year.name}`}</span>
                                    })}
                                </div>
                                <div className={cx('director-info', 'text-color')}>
                                    Định dạng: <span>{ movie?.category?.["1"].list["0"].name}</span>
                                </div>
                            </div>
                            <div className={cx('detail-info-col')}>
                                <div className={cx('director-info', 'text-color')}>Đạo diễn: {movie?.director}</div>
                                <div className={cx('casts-info', 'text-color')}>Diễn viên: {movie?.casts}</div> 
                                <div className={cx('director-info', 'text-color')}>
                                    Quốc gia: { movie?.category?.["4"].list.map((national)=> {
                                        return <span key={national.id}>{` ${national.name},`}</span>
                                    })}
                                </div> 
                                
                            </div>
                        </div>
                        <div className={cx('movie-description')}>{movie?.description?.replace('<p>', '').replace('</p>', '')}</div>
                        { (movie.episodes?.length > 0) && <Button to={`/phim/${movie?.slug}/watch?tap=${NewEpisode?.name}`} className={cx('watch-btn', 'large')}>Xem Phim</Button>}
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;