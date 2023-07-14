import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./helpers/scroll-top";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "./helpers/ProtectedRoute";

// Home page
const HomeIvosCafe = lazy(() => import("./pages/home/HomeIvosCafe"));

// Shop pages
const ShopGrid = lazy(() => import("./pages/shop/ShopGridFilter"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const Login = lazy(() => import("./pages/other/Login"));
const Register = lazy(() => import("./pages/other/Register"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <Router>
            <ScrollToTop />
            <Suspense fallback={<div className="flone-preloader-wrapper">...</div>}>
                <Routes>
                    {/* Homepage */}
                    <Route path="/" element={<HomeIvosCafe />} />

                    {/* Shop pages */}
                    <Route path="/products" element={<ShopGrid />} />

                    {/* Shop product pages */}
                    <Route path="/product/:id" element={<Product />} />

                    {/* Other pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/acerca-de" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contactenos" element={<Contact />} />
                    <Route path="/login-register" element={<LoginRegister />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Private routes */}
                    <Route
                        path="/my-account"
                        element={<ProtectedRoute element={<MyAccount />}
                                                 isAuthenticated={isAuthenticated}
                                                 redirectPath="/login" />}
                    />

                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/checkout" element={<Checkout />} />

                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
