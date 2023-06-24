import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SortByPrice from "./SortProducts";
import Products from "./Products";
import Pagination from "./Pagination";
import axios from "axios";
import swal from "sweetalert";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
const ProductCard = () => {
  const { cart, setCart } = useContext(CartContext);
  //Variable declaration
  // to hold fetched data
  const [data, setData] = useState([]);
  //sorting based on price
  const [sorting, setSorting] = useState("low-price");
  //current page number
  const [currentPage, setCurrentPage] = useState(1);
  //number of products in each page, which is 9 in our case
  const [itemsPerPage] = useState(9);

  //fetch data from json server
  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/Products");
        if (isMounted) {
          const jsonData = await response.clone().json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  //display products according to the selected option
  const sortProducts = (products, sorting) => {
    if (sorting === "low-price") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sorting === "high-price") {
      return [...products].sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };

  const sortedData = sortProducts(data, sorting);

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  //move from the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //INSERT PRODUCT IN USER AND DECREMENT QUANTITY PRODUCT
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
            // DECREMENT THE QUANTITY BY ONE, ENSURING IT DOESN'T GO BELOW ZERO
            // this to update number in cart
            setCart(userData.Orders.New_Cart.length);
            axios
              .get(`http://localhost:3001/Products/${ID.id}`)
              .then(function (response) {
                const productData = response.data;
                productData.quantity -= 1;
                // UPDATE THE DATA ARRAY WITH THE NEW QUANTITY VALUE
                const updatedData = data.map((product) => {
                  if (product.id === ID.id) {
                    return {
                      ...product,
                      quantity: productData.quantity,
                    };
                  }
                  return product;
                });
                setData(updatedData);
                return axios.put(
                  `http://localhost:3001/Products/${ID.id}`,
                  productData
                );
              })
              .then((response) => {})
              .catch((error) => {});
            return axios.put(
              `http://localhost:3001/Users/${sessionStorage.getItem("id")}`,
              userData
            );
          }
        })
        .then((response) => {})
        .catch((error) => {});
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
      <div className="container">
        <SortByPrice sorting={sorting} setSorting={setSorting} />
        <div className="row">
          {currentItems.map((product) => (
            <div
              className="col-12 col-lg-4 col-md-4 col-sm-6 "
              key={product.id}
            >
              <div className="mb-5 box-Shaddow">
                <div className="card border border-0">
                  <div className="card-body p-0 position-relative">
                    <p
                      className="position-absolute fw-bold fs-5 text-white p-2 text-center"
                      style={{ backgroundColor: "#25B0B5", width: "60px" }}
                    >
                      Q{product.quantity}
                    </p>
                    <NavLink
                      to={`/productCard/${product.id}`}
                      className="card-link"
                    >
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                        height="250px"
                      />
                    </NavLink>
                    <div className="ps-4 mb-3">
                      <h5 className="card-title mb-0 pb-3">{product.title}</h5>
                      <div className="d-flex gap-4 align-items-baseline">
                        <p className="card-text">${product.price} JOD</p>
                        <p
                          className="card-text text-secondary text-decoration-line-through"
                          style={{ fontSize: "14px" }}
                        >
                          ${product.price * 2} JOD
                        </p>
                      </div>
                      <a
                        href="#"
                        className="text-decoration-none ps-3 pe-3 pt-2 pb-2 text-white rounded-2"
                        style={{ backgroundColor: "#25B0B5" }}
                        onClick={(e) => {
                          InsertCart(e, {
                            id: product.id,
                            title: product.title,
                            category: product.category,
                            price: product.price,
                            image: product.image,
                            quantity: product.quantity,
                          });
                        }}
                      >
                        Add to Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={sortedData.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
    //
  );
};

export default ProductCard;