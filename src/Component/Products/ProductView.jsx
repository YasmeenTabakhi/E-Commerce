import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Product.css";
import axios from "axios";
import swal from "sweetalert";

export default function ProductView() {
  const { id } = useParams();
  const [Products, setProduct] = useState([]);

  //fetch the products data using id of this product
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`http://localhost:3001/Products/${id}`);
      setProduct(await response.json());
    };

    getProducts();
  }, []);

  const sleeves = () => {
    if (Products.sleeves === null) {
      return "";
    } else if (Products.sleeves) {
      return (
        <div>
          <p className="fw-bolder fs-5">Sleeves</p>
          <p>{Products.sleeves}</p>
        </div>
      );
    } else {
      return "";
    }
  };

  function InsertCart(e, ID) {
    e.preventDefault();
    if (ID.quantity) {
      axios
        .get(`http://localhost:3001/Users/${sessionStorage.getItem("id")}`)
        .then(function (response) {
          const userData = response.data;
          const isElementExists = userData.Orders.New_Cart.filter(
            (ele) => ele.id == ID.id
          );

          if (isElementExists.length) {
            swal("It was added at a previous time.", "", "error");
          } else {
            swal("Successfully, it has been added.", "", "success");
            userData.Orders.New_Cart.push(ID);

            // Decrement the quantity by one, ensuring it doesn't go below zero
            axios
              .get(`http://localhost:3001/Products/${ID.id}`)
              .then(function (response) {
                const productData = response.data;
                productData.quantity -= 1;
                return axios.put(
                  `http://localhost:3001/Products/${ID.id}`,
                  productData
                );
              })
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });

            return axios.put(
              `http://localhost:3001/Users/${sessionStorage.getItem("id")}`,
              userData
            );
          }
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      swal(
        "Out of stock, this product will be available on 1/10/2023 date..",
        "",
        "error"
      );
    }
  }

  return (
    <>
      {/* display products details */}
      <div className="container mt-3 mb-5">
        <div className="mb-3">
          <NavLink to={`/Products/`} className="card-link mb">
            <i
              className="fa-solid fa-arrow-left fa-xl"
              style={{ color: "#374151" }}
            ></i>
            {/* navigate from the img to product view component */}
          </NavLink>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <img
              src={Products.image}
              alt={Products.title}
              height="100%"
              width="100%"
            />
          </div>
          <div className="col-lg-6">
            {/* <p className="text-bold p-2 me-3">{Products.category}</p> */}
            <h4 className="display-5 fw-bolder">{Products.title}</h4>
            <p className="text lead fs-6">{Products.description}</p>
            <div className="d-flex w-100  justify-content-between">
              <div>
                <p className="fw-bolder fs-5">Color</p>
                <p>{Products.color}</p>
              </div>
              <div>
                <p className="fw-bolder fs-5">Size</p>
                <p>{Products.size}</p>
              </div>
              <div>
                <p className="fw-bolder fs-5">Material</p>
                <p>{Products.material}</p>
              </div>
              {sleeves()}
            </div>
            <hr />
            <div className="mb-5 mt-5 text-center">
              <h5
                className="fw-bolder m-0 text-decoration-line-through"
                style={{ color: "#9CA3AF" }}
              >
                ${Products.price * 2} JOD
              </h5>
              <h3 className="fw-bolder m-0" id="price">
                ${Products.price} JOD
              </h3>
              <p className="m-0" style={{ color: "#9CA3AF" }}>
                +12% VAT Added
              </p>
            </div>

            <button className=" btnView display-6 mb-5 ms-3 w-100 border border-0">
              <a
                href="#"
                className="fw-semibold"
                onClick={(e) =>
                  InsertCart(e, {
                    id: Products.id,
                    title: Products.title,
                    category: Products.category,
                    price: Products.price,
                    image: Products.image,
                    quantity: Products.quantity,
                  })
                }
                style = {{color :"white"}}

              >
                Add to Cart
              </a>
            </button>
            <br />

            {/* I used tab "bootstrap" for this style */}

            <nav className="ps-2">
              <div className="nav nav-tabs ps-2 " id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Description
                </button>
                <button
                  className="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Specification
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                {Products.description}
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                {Products.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}