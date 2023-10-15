import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import './carousel.css'
import { useEffect } from 'react';

const carousel = [
    {
        id: 1,
        img: "https://via.placeholder.com/210/000FF00?text=1"
    },
    {
        id: 2,
        img: "https://via.placeholder.com/220/0FF000?text=2"
    },
    {
        id: 3,
        img: "https://via.placeholder.com/230/0FFF00?text=3"
    },
    {
        id: 4,
        img: "https://via.placeholder.com/240/000FF0?text=4"
    },
    {
        id: 5,
        img: "https://via.placeholder.com/250/0000FF?text=5"
    },
    {
        id: 6,
        img: "https://via.placeholder.com/260/F0000F?text=6"
    },
    {
        id: 7,
        img: "https://via.placeholder.com/270/F000F0?text=7"
    },
    {
        id: 8,
        img: "https://via.placeholder.com/280/F0000F?text=8"
    },
    {
        id: 9,
        img: "https://via.placeholder.com/290/F0F000?text=9"
    },
    {
        id: 10,
        img: "https://via.placeholder.com/280/F0FF00?text=10"
    }
]
const Carousel = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [infiniteCarousel, setInfiniteCarousel] = useState([...carousel]);
    useEffect(() => {
        const interval = setInterval(() => {
            setSliderIndex((prev) => (prev + 1));
            if (sliderIndex % carousel.length === 0) { 
                setInfiniteCarousel((prev) => [...prev, ...carousel]) 
            }
        }, 3000)
        return () => clearInterval(interval);
    })
    return (
        <div className="carouselContainer">
            <div className="slider" style={{ "--slider-index": `${sliderIndex}` }}>
                {infiniteCarousel.map((item) =>{ 
                    return <img key={uuid()} src={item.img} alt="carouselItem" />
                })}
            </div>
            <div className="progressBar">
                {carousel.map((item, index) => <button key={item.id} className={`progressItem ${index === sliderIndex % carousel.length && "active"}`} onClick={() => setSliderIndex(index)}></button>)}
            </div>
        </div>
    )
}

export default Carousel