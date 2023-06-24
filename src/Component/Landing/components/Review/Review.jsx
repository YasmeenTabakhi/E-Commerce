import img from './Ellipse 760.png'
import quotetion from './”.png'
import './Review.css'
export default function Review() {
    return (
        <>
            <h1 style={{ fontWeight: 600, margin: "20px" , textAlign:"center"}}>Customer Reviews</h1>
            <div className='review'>
                <div><img src={img} className='reviewImg' alt="review-img" /></div>
                <div><p>“I recently purchased a [product] from [Store Name], and I couldn’t be happier with my online shopping experience. Their website was user-friendly, making it easy to find the perfect item. The checkout process was smooth, and I received my order promptly. The [product] arrived in excellent condition, exactly as described on their website. I’m thrilled with the quality and will definitely shop at [Store Name] again in the future. Highly recommended!”</p>
                    <h5>Jane Doe</h5>
                </div>
                <div><img src={quotetion} alt="" className='quote' /></div>
            </div>

        </>


    )
}