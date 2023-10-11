import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};





function SlideBarCar() {

    const [Vehicles, setVehicles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8090/vehicles/getVehicles').then(res => {
            {
                setVehicles(res.data)
            };
        });
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, [])



    return (
        <>

            <div className='block-t py-5' data-aos="zoom-in-up">
                <h1>Explore the Vehicle</h1>
                <p>Find and book a great experience.</p>
                <hr />
            </div>

            <div className='container-fluide ' id=''>


                <div class="testimonial-slider container-fluid">
                    <div id="carouselExampleControls" class="carousel carousel-dark">
                        <div class="container-fluid">
                            <div class="row"  data-aos="fade-up">

                                <div className='col-md-12 '>
                               
                                    <Carousel responsive={responsive}
                                        autoPlay
                                        autoPlaySpeed={2000}
                                        infinite>
                                        {Vehicles.length > 0 && Vehicles.map((Vehicle, index) => (
                                            <div className='cardBlock-1' key={index}>
                                                <div class=" m-3">
                                                    <div class="card" id='cardv '>
                                                        <div class="img-wrapper rounded-2xl">
                                                            {Vehicle.photos?.[0] && (
                                                                <img
                                                                    src={'http://localhost:8090/' + Vehicle.photos?.[0]}
                                                                    class="d-block w-100"
                                                                    alt="..."
                                                                    style={{ width: '200px', height: '200px' }}
                                                                />
                                                            )}
                                                        </div>


                                                        <div class="card-body" id="tit-card">
                                                            <h5 class="card-title" >{Vehicle.model}</h5>
                                                            {Vehicle.description && Vehicle.description.length > 100
                                                                ? `${Vehicle.description.slice(0, 100)}...`
                                                                : Vehicle.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        ))}
                                    </Carousel>
                               
                                </div>

                                <div className='d-flex align-content-center justify-content-center pt-5'>
                                    <a href="/vehicle_main">
                                        <button className="btn btn-outline-dark px-3 pt-1">VIEW ALL</button>
                                    </a>

                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>


    )


}

export default SlideBarCar;