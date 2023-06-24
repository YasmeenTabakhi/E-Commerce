import { useEffect, useState } from "react";
import "./PastOrders.css";
import axios from "axios";
import swal from "sweetalert";

function PastOrders() {
  const userActive = sessionStorage.getItem("id");
  const [PastOrders, setPastOrders] = useState([]);

  //GET ORDERS
  const getPastOrders = () => {
    fetch(`http://localhost:3001/Users/${userActive}`)
      .then((rep) => rep.json())
      .then((data) => {
        setPastOrders(data.Orders.Past_Order);
      });
  };
  useEffect(() => {
    getPastOrders();
  }, []);

  //DELETE TARGET ORDWRS
  const DeleteItem = () => {
    if (PastOrders.length) {
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
              userData.Orders.Past_Order = [];
              return axios.put(
                `http://localhost:3001/Users/${userActive}`,
                userData
              );
            })
            .then((response) => {
              getPastOrders();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          swal("The deletion has been cancelled");
        }
      });
    } else {
      swal("There are no items to delete");
    }
  };

  const allPastOrders = PastOrders.map((order) => {
    return (
      <div className="col-12 col-lg-4 col-md-6 col-md-12">
        <div
          className="border border-secondary-subtle rounded-4 ps-4 pe-4 pt-4 mb-4 d-flex justify-content-between"
          style={{ minHeight: "180px" }}
        >
          <div className="Cart_item Cart_Orders d-flex gap-5">
            <div className="">
              <img
                src={order.image}
                alt="Cart_body"
                style={{ width: "100px" }}
              />
            </div>
            <div className="card-description">
              <p className="title fw-bold">{order.category}</p>
              <p className="title_short text-body-secondary fw-semibold">
                {order.title}
              </p>
              {/* <div className='Size_Qty mb-3'>
                                <span className='p-2 bg-body-secondary me-2 fw-semibold'>Size: S</span>
                                <span className='p-2 bg-light bg-body-secondary fw-semibold'> Qty: 1</span>
                            </div> */}
              <div className="price mb-2">
                <span className="text-decoration-line-through me-0 fw-semibold"></span>
                <span className="fw-semibold">${order.price} JOD</span>
              </div>
              {/* <p className='fw-semibold d-flex align-items-center'><i className="fa-regular fa-circle-check me-2 fs-5" ></i> <span className='text-body-secondary'>Delivery by 9th Jan, 2023 </span></p> */}
            </div>
          </div>
          {/* <div className='close'>
                        <p className='fs-4'><i className="fa-solid fa-xmark"></i></p>
                    </div> */}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container Cart_Hero pt-5 pb-5">
        <div className="Header_Cart mb-4">
          <span className="header_span d-flex align-items-baseline flex-wrap">
            <i className="fa-solid fa-arrow-left me-3"></i>{" "}
            <h5 className="fw-bold me-3"> Past Orders</h5>
          </span>
        </div>
        <div className="text-end mb-4" onClick={() => DeleteItem()}>
          <input className="btn btn-primary me-0" type="reset" value="Reset" />
        </div>
        <div className="row">{allPastOrders}</div>
      </div>
    </>
  );
}

export default PastOrders;
