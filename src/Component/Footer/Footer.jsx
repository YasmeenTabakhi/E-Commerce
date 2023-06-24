import "./Footer.css";
import { Link } from "react-router-dom";
import LogoFooter from "../../assets/Union.svg";
function Footer() {
  return (
    <>
      {/* Footer */}
      <footer
        className="text-center text-lg-start text-muted"
        style={{ background: "#F9FAFB" }}
      >
        <div className="container ">
          {/* Section: Social media */}
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom flex-wrap gap-4">
            {/* Left */}
            <div className="me-5 d-lg-flex align-items-center">
              <img src={LogoFooter} alt="Logo_footer" />
              <span>
                <Link
                  to="/"
                  className=" text-decoration-none fw-semibold text-dar"
                  style={{ color: "#4B5563" }}
                >
                  Company
                </Link>
              </span>
            </div>
            {/* Left */}
            {/* Center */}
            <div className="Center_Link d-flex  gap-3">
              <Link
                to="/AboutUS"
                className="me-4 text-decoration-none fw-semibold text-dar"
              >
                About Us
              </Link>

              <Link
                to="/Products"
                className="me-4 text-decoration-none fw-semibold text-dar"
              >
                Products
              </Link>

              <a
                href="#"
                className="me-4 text-decoration-none fw-semibold text-dark"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="me-4 text-decoration-none fw-semibold text-dark"
              >
                Contact Us
              </a>
            </div>
            {/* Center */}
            {/* Right */}
            <div>
              <a href="#" className="me-4 link-secondary">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="me-4 link-secondary">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="me-4 link-secondary">
                <i className="fab fa-google" />
              </a>
              <a href="#" className="me-4 link-secondary">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="me-4 link-secondary">
                <i className="fab fa-linkedin" />
              </a>
              <a href="#" className="me-4 link-secondary">
                <i className="fab fa-github" />
              </a>
            </div>
            {/* Right */}
          </section>
          {/* Section: Social media */}
          {/* Copyright */}
          <div className="text-center p-4">
            © Copyright. All rights reserved by{" "}
            <span className="fw-bold"> My Company</span>.
          </div>
          {/* Copyright */}
        </div>
      </footer>
      {/* Footer */}
    </>
  );
}

export default Footer;
