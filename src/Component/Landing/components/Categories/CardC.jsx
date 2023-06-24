import './cardCategory.css'
export default function CardCategory(props) {
    return (
        <>
            <div className="cardCategory">
            <img src={props.src} alt="" />
            <h3>{props.categoryName}</h3>
            <p>{props.catgoryNumb}</p>
            </div>
        </>
    )
}