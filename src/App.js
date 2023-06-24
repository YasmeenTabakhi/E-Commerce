import "./App.css";
import {
  Header,
  Footer,
  Landing,
  AboutUS,
  Products,
  Signup,
  Sign,
  ShowCart,
  OrderPlaced,
  PastOrders,
  ProductView,
  ProductsCard,
  Profile,
  CartProvider,
} from "./Component/index";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/AboutUS" element={<AboutUS />} />
          <Route path="/Products" element={<Products />} />

          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Sign />} />

          <Route path="/ViewCart" element={<ShowCart />} />
          <Route path="/OrderPlaced" element={<OrderPlaced />} />
          <Route path="/PastOrders" element={<PastOrders />} />

          <Route path="/productCard/:id" element={<ProductView />} />

          <Route path="/Products" element={<Products />} />
          <Route path="/productCard/:id" element={<ProductView />} />

          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;