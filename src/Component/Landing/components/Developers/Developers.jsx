import Card from './Card'
import Ibrahim from './img-y/Ibrahim.jpg'
import Abdelrahman from './img-y/Abdelrahman.jpg'
import Yasmeen from './img-y/Yasmeen.jpg'
import Haneen from './img-y/Haneen.jpg'
import Tala from './img-y/Tala.jpg'
export default function Devlopers() {
    return (
        <div className="container text-center" style={{marginBottom:"60px"}}>
            <h1 style={{ fontWeight: 600, margin: "20px" }}>Our Team</h1>
            <div className="row" style={{ rowGap: "32px" }}>
                <div className="col">
                    <Card src={Ibrahim} name="Ibrahim Salem" githublink="    IbrahimSalem96" linkedin="    ibrahimsalem96"
                        linkL="https://www.linkedin.com/in/ibrahimsalem96/"
                        linkG="https://github.com/IbrahimSalem96"
                    />
                </div>
                <div className="col">
                    <Card src={Abdelrahman} name="Abdelrahman Haroun" githublink="    abdelrahman-haroun" linkedin="    Abdelrhaman Haroun"
                        linkL="https://www.linkedin.com/in/abdelrhaman-haroun/"
                        linkG="https://github.com/abdelrahman-haroun"
                    />

                </div>
                <div className="col">
                    <Card src={Yasmeen} name="Yasmeen Tabakhi" githublink="    YasmeenTabakhi" linkedin="    yasmeen-tabakhi"
                        linkL="https://www.linkedin.com/in/yasmeen-tabakhi/"
                        linkG="https://github.com/YasmeenTabakhi"
                    />
                </div>
                <div className="col">
                    <Card src={Haneen} name="Haneen Abo-romman" githublink="    haneen-taher" linkedin="    haneen-aburumman"
                        linkL="https://www.linkedin.com/in/haneen-aburumman/"
                        linkG="https://github.com/haneen-taher"
                    />
                        
                </div>
                <div className="col">
                    <Card src={Tala} name="Tala Abuoliem" githublink="    TalaAbooleim" linkedin="    tala-abooleim"
                        linkL="https://www.linkedin.com/in/tala-abooleim/"
                        linkG="https://github.com/TalaAbooleim"/>
                        
                </div>

            </div>
        </div>
    )
}