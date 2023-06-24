import "./ShowCart.css";
import DrawKitVector from "../../../assets/DrawKit-Vector.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

function ShowCart() {
  const { cart, setCart } = useContext(CartContext);
  const userActive = sessionStorage.getItem("id");

  const [orders, setorder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //GET ORDERS
  const getAllOrders = () => {
    fetch(`http://localhost:3001/Users/${userActive}`)
      .then((rep) => rep.json())
      .then((data) => {
        setorder(data.Orders.New_Cart);
        setCart(data.Orders.New_Cart.length);
      });
  };

  //RENDER ON CHANGE ORDERS
  useEffect(() => {
    getAllOrders();
  }, []);

  //DELETE TARGET ORDWRS
  const DeleteItem = (ID) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to go hungry!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("The product has been successfully deleted!", {
          icon: "success",
        });
        axios
          .get(`http://localhost:3001/Users/${userActive}`)
          .then(function (response) {
            const userData = response.data;
            userData.Orders.New_Cart = userData.Orders.New_Cart.filter(
              (item) => item.id !== ID
            );

            // INCREMENT the quantity by one, ensuring it doesn't go below zero
            axios
              .get(`http://localhost:3001/Products/${ID}`)
              .then(function (response) {
                const productData = response.data;
                productData.quantity += 1;
                return axios.put(
                  `http://localhost:3001/Products/${ID}`,
                  productData
                );
              })
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });

            return axios.put(
              `http://localhost:3001/Users/${userActive}`,
              userData
            );
          })
          .then((response) => {
            getAllOrders();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("The deletion has been cancelled");
      }
    });
  };

  //ISHOW ALL ORDERS IN CARTS
  const allOrder = orders.map((order) => {
    return (
      <div
        className="border border-secondary-subtle rounded-4 ps-4 pe-4 pt-4 mb-4 d-flex justify-content-between"
        key={order.id}
      >
        <div className="Cart_item d-flex gap-5 flex-wrap">
          <div className="mb-3">
            <img src={order.image} alt="Cart_body" width="100" />
          </div>
          <div className="card-description" style={{ width: "270px" }}>
            <p className="title fw-bold">{order.category}</p>
            <p className="title_short text-body-secondary fw-semibold">
              {order.title}
            </p>
            {/* <div className='Size_Qty mb-3'>
                        <span className='p-2 bg-body-secondary me-2 fw-semibold'>Size: S</span>
                        <span className='p-2 bg-light bg-body-secondary fw-semibold'> Qty: 1</span>
                    </div> */}
            <div className="price mb-2">
              <span className="text-decoration-line-through me-3 fw-semibold">
                JOD. 500{" "}
              </span>
              <span className="fw-semibold">${order.price} JOD</span>
            </div>
            <p className="fw-semibold d-flex align-items-center">
              <i className="fa-regular fa-circle-check me-2 fs-5"></i>{" "}
              <span className="text-body-secondary">
                Delivery by 9th Jan, 2023{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="close" onClick={() => DeleteItem(order.id)}>
          <p className="fs-4">
            <i className="fa-solid fa-xmark"></i>
          </p>
        </div>
      </div>
    );
  });

  //TOTOAL PRICE IN CART
  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = orders.reduce((acc, order) => acc + order.price, 0);
      setTotalPrice(totalPrice);
    };
    calculateTotalPrice();
  }, [orders]);

  //INSERT ORDERS PAST ARRAY
  let navigate = useNavigate();
  function pastOrder(userID) {
    if (orders.length) {
      axios
        .get(`http://localhost:3001/Users/${userID}`)
        .then(function (response) {
          const userData = response.data;
          const PastOrder = userData.Orders.New_Cart;

          PastOrder.forEach((element) => {
            userData.Orders.Past_Order.push(element);
          });

          userData.Orders.New_Cart = [];
          setCart(userData.Orders.New_Cart.length);

          return axios.put(`http://localhost:3001/Users/${userID}`, userData);
        })
        .then((response) => {
          navigate("/OrderPlaced");
          
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      swal("Your cart is empty, no products have been added!");
    }
  }

  return (
    <>
      <div className="container Cart_Hero pt-5 pb-5">
        <div className="row">
          <div className="col-12 col-lg-6 vol-md-6 col-sm-12">
            <div className="Header_Cart mb-4">
              <span className="header_span d-flex align-items-baseline flex-wrap">
                <Link to="/Products">
                  <a className="text-dark back-page">
                    <i className="fa-solid fa-arrow-left me-3"></i>
                  </a>
                </Link>{" "}
                <h5 className="fw-bold me-3"> ORDER SUMMARY</h5>{" "}
                <li className="fw-bold fs-6 p-0 m-0"> {orders.length} Items</li>
              </span>
            </div>
            <div className="ms-4" style={{ width: "85%" }}>
              {allOrder}
            </div>
          </div>
          <div className="col-1">
            <div className="Line-vertical"></div>
          </div>
          <div className="col">
            <div className="d-flex flex-column" style={{ gap: "40px" }}>
              <div className="title justify-content-center bg-vector d-flex ps-5 pe-5 pt-3 pb-2 gap-5 rounded-2 align-items-baseline">
                <div>
                  <img src={DrawKitVector} alt="DrawKit-Vector" />
                </div>
                <p className="fs-6">
                  Yay! <span className="fw-bold">No Delivery Charge</span> on
                  this order.
                </p>
              </div>
              <div className="Applay">
                <p className="fw-bold">Have a Coupon?</p>
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="bg-vector w-100 pt-3 pb-3 ps-3 pe-3 border border-secondary-subtle rounded-2 "
                />
              </div>
              <div className="price_Details">
                <p className="fw-bold">PRICE DETAILS (2 ITEMS)</p>
                <ul className="p-0 m-0">
                  <li className="list-item">
                    <span>Total MRP</span> <span>JOD. {totalPrice}</span>
                  </li>
                  <li className="list-item">
                    <span>Discount on MRP</span>{" "}
                    <span className="free">JOD. 0</span>
                  </li>
                  <li className="list-item">
                    <span>Coupon Discount</span> <span>JOD. 0</span>
                  </li>
                  <li className="list-item">
                    <span>Delivery Charge</span>{" "}
                    <span className="free">Free</span>
                  </li>
                </ul>
                <div className="Line_horizontal"></div>
              </div>
              <div className="Place_Order">
                <li className="list-item">
                  <span>Delivery Charge</span>{" "}
                  <span className="free">JOD. {totalPrice}</span>
                </li>
                <button
                  onClick={() => pastOrder(userActive)}
                  className="button_Place mt-3 border border-secondary-subtle fw-semibold text-white rounded-2"
                >
                  Place Order <i className="fa-solid fa-arrow-right"></i>
                </button>
                {/* <Link to='/OrderPlaced'></Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowCart;
