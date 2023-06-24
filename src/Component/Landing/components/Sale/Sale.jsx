import img from './Rectangle 6322.png'
import './sale.css'
export default function Sale() {
    return (
        <>
        <div className='sale'> 
            <div className='text'>
            <p className='p'>PROMOTIONS</p>
                    <h1>30% Mega Sale</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, aperiam. Provident facilis quibusdam quae, iste doloribus exercitationem praesentium quo earum. Modi, quidem laborum. Vel soluta quaerat tempora. Sunt, est nobis.</p>
                <div className="button">
                <button className='btnn btn-a'>Get the Deal</button>
            <button className='btnn btn-b'>Explore</button>
        </div>
            </div>
            <div>
            <img src={img} alt="" />
            </div>
        </div>
        </>

    )
}