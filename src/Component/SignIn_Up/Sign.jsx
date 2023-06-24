import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./sign.css";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.svg";
import { useEffect, useState } from "react";
import swal from "sweetalert";

function Sign() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/Users")
      .then((rep) => rep.json())
      .then((data) => setUsers(data));
  }, []);

  let navigate = useNavigate();

  // console.log(users[1].email)

  function checkUser() {
    const findUser = users.find(
      (user) => user.email === email && user.password === password
    );
  

    if (findUser) {
      console.log("yes");
      sessionStorage.setItem("id", findUser.id);
      swal("Successfully logged in.", "", "success");
      navigate("/Products");
    } else {
      swal("Email or password is incorrect.", "", "error");
      console.log("no");
    }
  }

  return (
    <div className="container-SignIn ">
      <div className="container-flex">
        <div className="image-sigin">
          <img src={login} alt="login" className="img" />
        </div>
        <div className="form-SignIn">
          <div className="info">
            <p>Nice to see you again!</p>
          </div>
          <div>
            <Form.Control
              type="email"
              placeholder="Email or phone number"
              className="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Form.Control
              type="password"
              id="inputPassword5"
              placeholder="Enter password"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setpassword(e.target.value)}
              className="password"
            />
          </div>
          <div className="cheak">
            <div className="remberme">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineFormCheck"
              />
              <label className="form-check-label" htmlFor="inlineFormCheck">
                Remember me
              </label>
            </div>
            <div>
              <p>Forgot Password?</p>
            </div>
          </div>
          <div>
            <Button onClick={checkUser} variant="success" className="btn-sign">
              Sign in
            </Button>{" "}
          </div>
          <div className="line"></div>
          <div className="donthaveaccount">
            <p>
              Don’t have an account?
              <Link to="/Signup" className="have-account">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
