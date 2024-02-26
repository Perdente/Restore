import { ThemeProvider } from "@emotion/react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../../errors/NotFound";
import ServerError from "../../errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accoutSlice";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "../../features/account/ForgetPassword";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserStatus = useAppSelector(
    (state) => state.account.fetchCurrentUserStatus
  );

  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error: any) {
      console.log(error);
    }
  }, [dispatch]);

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  useEffect(() => {
    if (currentUserStatus == "rejected") {
      navigate("/");
    }
  }, [currentUserStatus]);

  if (loading) return <LoadingComponent message="Initialising app... " />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path={"/*"}
          element={
            <Container sx={{ mt: 4 }}>
              <Routes>
                {/* https://stackoverflow.com/a/69849271 */}
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:id" element={<ProductDetails />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/server-error" element={<ServerError />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutWrapper />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <Orders />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/inventory"
                  element={
                    <PrivateRoute roles={["Admin"]}>
                      <Inventory />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="*" element={<NotFound />} />
                {/* https://stackoverflow.com/a/69880162 */}
              </Routes>
            </Container>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
