import { useState, useEffect, useContext } from 'react'
import DataContext from '../../context/DataContext';
import { v4 as uuid } from 'uuid';
import './carousel.css'

const Carousel = () => {
    const { posts } = useContext(DataContext);
    const carousel = posts.slice(-8);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [infiniteCarousel, setInfiniteCarousel] = useState([...carousel]);
    const [imgState, setImgState] = useState([...Array(20)].map(() => false));
    useEffect(() => {
        const interval = setInterval(() => {
            setSliderIndex((prev) => (prev + 1));
            if (sliderIndex % (carousel.length - 1) === 0) {
                setInfiniteCarousel((prev) => [...prev, ...carousel]);
            }
        }, 3000)
        return () => clearInterval(interval);
    })
    // console.log(imgState)
    return <>
        {
            carousel && carousel.length > 0 && <>
                <div className="carouselContainer">
                    <div className="slider" style={{ "--slider-index": `${sliderIndex}`, minHeight:"50vh", minWidth:"100vw"}}>
                        {infiniteCarousel.map((item, idx) => {
                            return <div key={uuid()} style={{minHeight:"80vh", minWidth:"100vw"}}>
                                <img src={item.image} alt="carouselItem" />
                                <h1>{item.title}</h1>
                                <p>{item.datetime.split(' ').slice(0, 3).join(' ')}</p>
                            </div>
                        })}
                    </div>
                    <div className="progressBar">
                        {carousel.map((item, index) => <button key={uuid()} className={`progressItem ${index === sliderIndex % carousel.length && "active"}`} onClick={() => setSliderIndex(index)}></button>)}
                    </div>
                </div>
            </>
        }
    </>
}

export default Carousel