import "./Header.css";
import LogoNav from "../../assets/Union.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function Header() {
  const { cart } = useContext(CartContext);
  const userActive = sessionStorage.getItem("id");
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/Users/${userActive}`)
      .then((rep) => rep.json())
      .then((data) => setCart(data));
  }, [userActive]);

  let navlogout = useNavigate();
  let navProducts = useNavigate();

  const [isActive, setIsActive] = useState(false);

  function goProducts() {
    if (userActive) {
      navProducts("/Products");
      
    } else {
      navProducts("/Signin");
    }
  }

  function logout() {
    sessionStorage.clear();
    navlogout("/");
    setIsActive(false);
  }
  function logout() {
    sessionStorage.clear();
    setCart([]);
    setIsActive(false);
    navlogout("/");
  }

  const Dropdown = () => {
    if (userActive !== null) {
      const classAction = () => {
        setIsActive(!isActive);
      };

      return (
        <>
          <p className="m-0 me-2">{Cart.username}</p>

          <div className="drop-list me-3">
            <i
              className="fa-solid fa-sort-down drop-icon"
              onClick={classAction}
            ></i>
            <div className={`drop_menu ${isActive ? "activeOpen" : ""}`}>
              <Link to="/Profile">Profile</Link>
              <a onClick={logout}>Logout</a>
            </div>
          </div>
          <Link to="/ViewCart">
            <button className="btn btn-outline-success" type="submit">
              View Cart <span>{cart}</span>
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <Link to="/Signin">
          <i className="fa-regular fa-user "></i>
        </Link>
      );
    }
  };

  return (
    <>
      <div className="Header container p-0">
        <nav className="navbar navbar-expand-lg d-flex justify-content-center">
          <div className="container-fluid p-0">
            <img src={LogoNav} alt="Logo" />
            <Link to="/" className="navbar-brand ps-2">
              Company
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" aria-current="page" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/AboutUS" className="nav-link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={goProducts}>
                    Products
                  </a>
                </li>
              </ul>

              <div className="nav-item d-flex  align-items-center">
                <Dropdown />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
