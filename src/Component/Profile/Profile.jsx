import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import bages from "../../assets/bages.svg";
import "../Profile/profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navPastorder = useNavigate();
  //  first state to store if user click in about me
  // second state to store data from local server to show this when user click in about me

  const [information, setInformation] = useState([]);
  // this function to change value of state when user click

  //  i will receive data from json server and store this in var
  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${sessionStorage.getItem("id")}`
        );
        setInformation(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInformation();
  }, []);
  //
  //  this state to store data from Weather API
  const [weather, setWeather] = useState([]);
  // this function to receive data from Weather APU
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.meteosource.com/api/v1/free/point?lat=31.9539%20&lon=35.9106&sections=current%2Chourly&language=en&units=auto&key=e7v45tlw6tml87gfta0vhrxr0sw2jq7fbmumj2yd"
        );

        setWeather(response.data.current);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className=" container d-flex p-2 justify-content-around mt-5 flex-wrapp ">
        <div className=" container d-flex flex-column mb-3 ">
          <img
            className="img-fluid  mx-auto d-block"
            src={`${weather.icon}.png`}
            alt="weather"
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          <p className="text-center mt-1 ">
            {weather.summary}
            <span>
              <i className="fa-solid fa-location-arrow px-2"></i>
            </span>
          </p>
          <p className="text-center">{weather.temperature}C</p>
          <div className="accordion " id="accordionPanelsStayOpenExample">
            <div className="accordion-item d-2flex align-center ">
              <h2 className="accordion-header ">
                <button
                  className="accordion-button con-color collaps collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <i className="fa-regular fa-user"></i>
                  <span className="ms-2">About me</span>
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse "
              >
                <div className="accordion-body">
                  <p>UserName: {information.username}</p>
                  <p>Email: {information.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex p-2 justify-content-between align-items-center  con-color ">
            <i className="fa-solid fa-book-open"></i>
            <p
              on
              onClick={() => {
                navPastorder("/PastOrders");
              }}
            >
              Past orders
            </p>
            <i></i>
          </div>
        </div>
        <div className=" container rounded con-color con-rel con-con-con ">
          <div className=" con-rell">
            <div className="d-flex gap-3 ">
              <i className="fa-solid fa-location-dot p-2"></i>
              <p>14 GreenRoad St.</p>
            </div>
            <div className="d-flex gap-3 ">
              <i className="fa-solid fa-phone p-2"></i>
              <p> 00962777777777</p>
            </div>
            <div className="d-flex gap-3 ">
              <i className="fa-solid fa-envelope p-2"></i>
              <p> company@company.com</p>
            </div>
            <div className="d-flex gap-3 ">
              <i className="fa-regular fa-clock p-2"></i>
              <p> Mon-Fri: 9:00 AM - 8:00 PM Sat: 9:30 AM - 6:30 PM</p>
            </div>
          </div>
          <img className="img-abs img-fluid rounded" src={bages} alt="bag" />
        </div>
      </div>
    </>
  );
}

export default Profile;
