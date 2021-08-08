import React, { Fragment } from 'react'
import HeroSection from "./HeroSection"
import WhyChooseUs from "./WhyChooseUs"
import NewArrival from "./NewArrival"
import MostViewed from "./MostViewed"
import ChooseCategory from "./ChooseCategory"
import AboutUs from './AboutUs'
import SubHeader from './SubHeader';


const Home = () => {
    return (
        <Fragment>
            <SubHeader />
            <HeroSection />
            <ChooseCategory />
            <NewArrival />
            <MostViewed />
            <WhyChooseUs />
            <AboutUs />
        </Fragment>
    )
}

export default Home