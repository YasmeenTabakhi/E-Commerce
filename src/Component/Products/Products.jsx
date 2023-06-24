import React from "react";
import "./Product.css";
import SortProduct from "./SortProducts";
import ProductsCard from "./ProductsCard";
import Pagination from "./Pagination";

//Create the component
function Products() {
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12  mb-5 ">
            <h1 className="title  display-6 fw-bolder text-center">Products</h1>
            <div className="title_Products_line mt-3 mb-3"></div>
            <p className=" text-center" style={{ marginTop: "35px" }}>
              Pick your favorite items from our wide collection!
            </p>
          </div>
        </div>
        <ProductsCard />
        <Pagination />
        <hr
          style={{
            border: "1px solid #374151",
          }}
        />
      </div>
    </div>
  );
}

export default Products;