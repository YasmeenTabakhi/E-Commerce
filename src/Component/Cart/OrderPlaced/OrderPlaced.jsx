import './OrderPlaced.css'
import VectorSuccee from '../../../assets/Vector_succee.svg'
import DeliveryOrder from '../../../assets/Delivery_Order.svg'
import { Link } from 'react-router-dom'



function OrderPlaced() {

    return (
        <>
            <div className='continer pt-5 pb-5'>
                <div className='confirmed text-center d-flex flex-column align-items-center gap-3'  >
                    <div className='confirmed_Succee d-flex align-items-end '>
                        <h1 className='me-4 m-0 fw-bold'>CONFIRMED</h1>
                        <img src={VectorSuccee} alt='Vector Succee' width='50' height='50' />
                    </div>
                    <div>
                        <p className='fw-bold'>THANK YOU FOR YOUR ORDER!</p>
                        <p className='fw-bold'>Order Id: 56089</p>
                    </div>
                    <div className='Delivery_Order'>
                        <img src={DeliveryOrder} alt='Delivery_Order' />
                    </div>
                    <div className=''>
                        <p className='fw-bold'>Estimated Delivery </p>
                        <p className='fw-bold'>Monday, 09th January, 2023</p>
                    </div>
                    <div className=''>
                        <Link to='/Products'><button className='button_order ps-5 pe-5 mt-3 border border-secondary-subtle fw-semibold text-white rounded-2'>Continue Shopping <i className="fa-solid fa-arrow-right"></i></button></Link>
                    </div>
                </div >
            </div >
        </>
    )
}

export default OrderPlaced
