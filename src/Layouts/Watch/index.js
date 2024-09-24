
import classNames from "classnames/bind";
import { Spin, Carousel, ConfigProvider } from 'antd'
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { LoadingOutlined } from '@ant-design/icons';

import styles from './Watch.module.scss'
import Card from "../../Components/Card";
import LoadingPage from "../../Components/LoadingPage";

const cx = classNames.bind(styles)

function Watch({className= ''}) {
    className = className?.split(' ')

    const [LoadingPg, setLoadingPg] = useState(false)
    const [movie, setMovie] = useState({})
    const [episode, setEpisode] = useState({})
    const [category, setCategory] = useState('')
    const [relateMovies, setRelateMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedEp, setSelectedEp] = useState(false)
    const [getEPS, setgetEPS] = useState([])

    const pathSegments = window.location.href.split('/')
    const idx = pathSegments.findIndex((pathSegment)=> pathSegment == "phim") + 1
    const slug = pathSegments[idx]
    const url = new URL(window.location.href)
    let paramValue = url.searchParams.get('tap')
    let movieName
    
    const arrayEPS = document.querySelectorAll('.Ep')

    if (arrayEPS.length > 0) {
        arrayEPS.forEach((EPS)=>{
            const activeCls = cx('active')
            const dataIndex = paramValue - 1
            EPS.classList.remove(activeCls)
            if (EPS.dataset.index == dataIndex) {
                EPS.classList.add(activeCls)
            }
        })
    }

    if(paramValue == 'Full') {
        paramValue = 1
    }

    useEffect(()=> {
        async function GetMovie () {
            setLoadingPg(true)
            try {
                await fetch(`https://phim.nguonc.com/api/film/${slug}`)
                .then(res => res.json())
                .then(data => setMovie(data.movie))
                .catch(error => console.log(error))
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoadingPg(false)
            }
        }
        GetMovie()
    },[])

    useEffect(() =>{
        if(movie.name) {
            document.title = `${movie.name}`
        }
        let categorySlug = (movie?.category?.["2"].list?.["0"]?.name?.toLowerCase()?.replace(/ /g, '-')) 
        if (categorySlug) {
            categorySlug = (categorySlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')) 
            setCategory(categorySlug)
        }
        
        if (movie.episodes) {
            const episodeCurrentIndex = paramValue - 1
            const episodeCurrent = movie.episodes["0"]?.items[episodeCurrentIndex]
            setEpisode(episodeCurrent)
        }
    },[movie])
    
    useEffect(()=> {
        async function GetRelateMovie() {
            await fetch(`https://phim.nguonc.com/api/films/the-loai/${category}?page=1`)
            .then(res => res.json())
            .then(data => setRelateMovies(data.items))
        }
        if (category != '') {
            GetRelateMovie()
        }
    },[category])

    useEffect(()=>{
        if (episode?.name && movieName)  {
            document.title = movieName + ` - Tập ${episode.name}`
        }

    },[episode])

    function handleSelectedEpisode(e) {
        const epSelectedIndex = parseInt(e.target.dataset.index)
        const epSelected = movie?.episodes?.["0"]?.items?.[epSelectedIndex]
        setEpisode(epSelected)
        setSelectedEp(true)
    }

    if (movie.name) {
        movieName = movie.name
    }


   
    return (  
        <div className={cx('wrapper', ...className)}>
            {LoadingPg ? 
                <LoadingPage/>
                :
                <div>
                    <div className={cx('video')}>                
                        { episode ? 
                                <iframe  
                                    src={episode.embed} 
                                    frameBorder={0}
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            : 
                            <video className={cx('vd')} controls ></video> }
                        { loading && <Spin className={cx('loading')} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> }
                    </div>
                    { (movie?.episodes?.length < 2) ? 
                        <div className={cx('movie-info')}>
                            <h1 className={cx('movie-lang')}>{movie?.language}</h1>
                            <div className={cx('movie-episodes')}>
                                { movie?.episodes?.["0"]?.items.map((item, index)=> 
                                    {
                                        return (
                                            <Link to={`/phim/${slug}/watch?tap=${index + 1}`} 
                                                key={item?.name} 
                                                className={cx('episode', {'Ep' : true})} 
                                                data-index = {index} 
                                                onClick ={handleSelectedEpisode} 
                                            >
                                                {item?.name} 
                                            </Link>
                                        )
                                    }) 
                                }
                            </div>
                        </div>
                        :
                        movie?.episodes?.map((server)=> {
                            return (
                                <div key={server.server_name} className={cx('movie-info')}>
                                    <h1 className={cx('movie-lang')}>{server.server_name}</h1>
                                    <div className={cx('movie-episodes')}>
                                        {server.items.map((item , index)=>{
                                            
                                            return (
                                                <Link 
                                                    key={item?.embed} 
                                                    className={cx('episode' )}  
                                                    data-item = {JSON.stringify(item)}  
                                                    onClick ={(e)=>{ 
                                                        e.preventDefault()
                                                        const episodeSelected = JSON.parse(e.target.dataset.item)
                                                        setEpisode (episodeSelected)
                                                    }} 
                                                > 
                                                    {item?.name} 
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
        
                    <div className={cx('relate-movies-wrapper')}>
                        <h1>Phim có thể thích</h1>
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
                                slidesToShow={5}
                                slidesToScroll={2}
                                style={{marginTop: '25px'}}
                                
                            >
                                {relateMovies && 
                                    relateMovies.map((relateMovie)=> 
                                        <Card 
                                            key={relateMovie.name} 
                                            className={cx('relate-movie')} 
                                            to={`/phim/${relateMovie.slug}`} 
                                            thumbnail={relateMovie.thumb_url}
                                        />
                                    )
                                }
                            </Carousel>
                        </ConfigProvider>
                    </div>
                </div>
            }
        </div>
    );
}

export default Watch;