import Card from './CardC'
import watches from './img/watches.png'
import jewellery from './img/jewellery.png'
import men from './img/men.png'
import women from './img/women.png'
import children from './img/children.png'
import bag from './img/bag.png'
import accessories from './img/accessories.png'
import shoe from './img/shoes.png'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useState, useEffect } from 'react';

export default function Categories() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    let item;
    if (windowWidth <= 500)
        item = 1;
    else if (windowWidth > 400 && windowWidth < 895)
        item = 2
    else if (windowWidth > 895 && windowWidth <= 1286)
        item = 3
    else
        item = 4;
    return (
        <div>
            {/* <h1>{windowWidth}</h1> */}
            <div className='container-fluid' style={{margin:"80px 0"}} >
            </div>
            <div className='container-fluid' >
                <OwlCarousel
                    items={item}
                    className="owl-theme"
                    loop
                    nav
                    margin={8}
                    style={{ width: "85%", margin: "auto" }}>
                    <div ><Card categoryName="Watches" src={watches} catgoryNumb="12 Products Available" /></div>
                    <div><Card categoryName="Men's Clothing" src={men} catgoryNumb="120 Products Available" /></div>
                    <div><Card categoryName="Women's Clothing" src={women} catgoryNumb="151 Products Available" /></div>
                    <div><Card categoryName="Jewellery" src={jewellery} catgoryNumb="30 Products Available" /></div>
                    <div><Card categoryName="Kid's Clothing" src={children} catgoryNumb="80 Products Available" /></div>
                    <div><Card categoryName="Bags" src={bag} catgoryNumb="45 Products Available" /></div>
                    <div><Card categoryName="Accessories" src={accessories} catgoryNumb="40 Products Available" /></div>
                    <div><Card categoryName="Shoes" src={shoe} catgoryNumb="20 Products Available" /></div>
                </OwlCarousel>
            </div>
        </div>
    )
}