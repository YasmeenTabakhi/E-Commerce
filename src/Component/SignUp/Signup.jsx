import "bootstrap/dist/css/bootstrap.css";

import login from "../../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Orders: {
      New_Cart: [],
      Past_Order: [],
    },
  });
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  // const [redirectToLanding, setRedirectToLanding] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!formData.repeatPassword) {
      newErrors.repeatPassword = "Repeat password is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password =
        "Password should contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Password should contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password should contain at least one digit";
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password =
        "Password should contain at least one special character";
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Check if email already exists
      fetch(`http://localhost:3001/users?email=${formData.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setEmailExists(true);
          } else {
            // Email doesn't exist, proceed with sign-up
            fetch("http://localhost:3001/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("User created:", data);
                // Perform any necessary actions after successful sign-up

                // Redirect to landing page
                sessionStorage.setItem("id", data.id);
                navigate("/");
              })
              .catch((error) => {
                console.error("Error:", error);
                // Handle error scenarios
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error scenarios
        });
    }
  };
  // if (redirectToLanding) {
  //   return <Link to="/" />;
  // }
  return (
    <div className="container-signup">
      <img src={login} alt="" className="img" />

      <form onSubmit={handleSubmit}>
        <div className="info-signup">
          <p>Create an Account</p>
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            // value={formData.username}
            onChange={handleInputChange}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            // value={formData.email}
            onChange={handleInputChange}
            className={`form-control ${
              errors.email || emailExists ? "is-invalid" : ""
            }`}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
          {emailExists && (
            <div className="invalid-feedback">Email already exists</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="repeatPassword"
            placeholder="Confirm password"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            className={`form-control ${
              errors.repeatPassword ? "is-invalid" : ""
            }`}
          />
          {errors.repeatPassword && (
            <div className="invalid-feedback">{errors.repeatPassword}</div>
          )}
        </div>
        <div className="Accept-terms">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineFormCheck"
          />
          <label className="form-check-label" htmlFor="inlineFormCheck">
            I accept the<span className="green-span">Terms of Service</span> and{" "}
            <span className="green-span">Privacy Policy</span>
          </label>
        </div>
        <div className="line-signup"></div>
        <div className="haveaccount">
          <p>
            Already have an account?
            <Link to="/Signin" className="have-account-signUp">
              Sign in
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
