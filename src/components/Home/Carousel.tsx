import React from "react"
import cannon from "./img/cannon.jpg"
import hekateBorder from "./img/hekateBorder.png"
const Carousel = () => (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={cannon} alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={hekateBorder} alt="Second slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={cannon} alt="Third slide"/>
                </div>
            </div>
        </div>
)
export default Carousel