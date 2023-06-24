import React from "react";
import "./AboutUs.css";
function AboutUS() {
  return (
    <>
      <div className="container-lg mt-4 mb-4 about-uu">
        <h1 className="text-center mt-2 mb-2">About US </h1>
        <div className="container-md mt-5 mb-3 " style={{ width: "60%" }}>
          <h3>About Our Store</h3>
          <p>
            Welcome to our online store, where fashion meets technology! We are
            passionate about providing the latest trends in clothing, footwear,
            watches, and electronics to our valued customers.
          </p>

          <h3>Our Mission</h3>
          <p>
            At COMPANY, our mission is to offer a seamless and enjoyable
            shopping experience for fashion enthusiasts and tech-savvy
            individuals alike. We strive to bring you high-quality products that
            combine style, comfort, and functionality.
          </p>

          <h3>Wide Selection of Products</h3>
          <p>
            With a diverse range of clothing, shoes, watches, and electronics,
            we cater to all your fashion and tech needs. From trendy apparel to
            stylish footwear, from elegant timepieces to cutting-edge gadgets,
            we have something for everyone.
          </p>

          <h3>Quality and Durability</h3>
          <p>
            We understand the importance of quality and durability when it comes
            to your purchases. That's why we source our products from trusted
            brands and manufacturers known for their craftsmanship and
            reliability. We prioritize your satisfaction and aim to deliver
            products that exceed your expectations.
          </p>

          <h3>Secure and Convenient Shopping</h3>
          <p>
            Your security and convenience are our top priorities. Our online
            store is designed with robust security measures to ensure a safe
            shopping environment. We also offer various payment options and fast
            shipping services, so you can shop with confidence and receive your
            orders promptly.
          </p>

          <h3>Customer Satisfaction</h3>
          <p>
            We value our customers and strive to provide exceptional customer
            service. Our dedicated support team is here to assist you with any
            inquiries, concerns, or feedback you may have. Your satisfaction is
            our ultimate goal, and we are committed to making your shopping
            experience memorable.
          </p>

          <img
            className=" about-img rounded mx-auto d-block img-fluid mb-3"
            src="https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg"
            alt="Shop"
          />
          <h3>Stay Connected</h3>
          <p>
            Follow us on social media and subscribe to our newsletter to stay
            updated on the latest fashion trends, product launches, exclusive
            offers, and more. Join our community of fashion-forward individuals
            and tech enthusiasts!
          </p>

          <p>
            Thank you for choosing COMPANY. We look forward to serving you and
            helping you express your style with our premium selection of
            clothing, shoes, watches, and electronics.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutUS;
