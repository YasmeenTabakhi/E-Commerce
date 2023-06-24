import './card.css'
const mystyle = {
    paddingLeft: "67px",
    textAlign: "left",
    marginBottom: "5px"
};

export default function Card(props) {
    return (
        <>
            <div className="card" style={{ width: "315px", height: "450px", backgroundColor: "#effcfc", transform: "translate(10)", clipPath: "polygon(0 0, 100% 0, 100% 50%, 100% 100%, 100% 100%, 0 95%)", borderRadius: "0", border: "none", margin: "auto" }}>
                <img src={props.src} className="card-img-top" alt="profile-img" style={{ height: "236.25px" }} />
                <div className="card-body">
                    <h4 style={{ color: "#22737c" }}>{props.name}</h4>
                    <p className="card-text">
                        Full Stack-Developer 
                    </p>
                    <p className="card-text" style={mystyle}>
                        <i className="fa-brands fa-github"></i>
                        <a href={props.linkG}>{props.githublink}</a>
                        
                    </p>
                    <p className="card-text" style={mystyle}>
                        <i className="fa-brands fa-linkedin-in"></i>
                        <a href={props.linkL}>{props.linkedin}</a>
                    </p>
                </div>
            </div>
        </>
    )
}