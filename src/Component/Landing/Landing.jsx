import React from 'react'
import Developers from "./components/Developers/Developers";
import Sale from "./components/Sale/Sale";
import Review from "./components/Review/Review";
import Categories from "./components/Categories/Categories";
import Hero from "./components/Hero/Hero";
function Landing() {
    return (
    		<>
			<Hero videoId="6CiRM8_QQl8" />
			<Categories />
			<Sale />
			<Review />
			<Developers />
		</>
        
    )
}

export default Landing
