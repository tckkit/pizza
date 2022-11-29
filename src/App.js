import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Components/Layout/Navbar";
import { LoginFormFamily } from "./Components/LoginFormFamily";
import { SignupFormFamily } from "./Components/SignupFormFamily";
import Listing from "./Components/Listing/Listing";
import NotFound from "./Components/Layout/NotFound";
import MyAccount from "./Components/MyAccount/MyAccount";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PizzaHut from "./Components/PizzaHut";
import EditPromoCode from "./Components/EditPromoCode";

const RequireAdmin = ({ children, redirectTo }) => {
  let authRole = useSelector((state) => state.authStore.authRole);
  return authRole == "campus" ? children : <Navigate to={redirectTo} />;
};

const RequireUser = ({ children, redirectTo }) => {
  let authRole = useSelector((state) => state.authStore.authRole);
  return authRole == "family" ? children : <Navigate to={redirectTo} />;
};

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Nunito", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    <>
      <ShoppingCartProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <div className="app-container">
              <div>
                <Navbar />
                <Routes>
                  <Route path="" element={<Navigate to="/menu" />} />
                  <Route path="/signup" element={<SignupFormFamily />} />
                  <Route path="/login" element={<LoginFormFamily />} />
                  <Route
                    path="edit-pizza"
                    element={
                      <RequireAdmin redirectTo="/login">
                        <PizzaHut />
                      </RequireAdmin>
                    }
                  ></Route>
                  <Route
                    path="edit-promo"
                    element={
                      <RequireAdmin redirectTo="/login">
                        <EditPromoCode />
                      </RequireAdmin>
                    }
                  ></Route>
                  <Route path="menu" element={<Listing />} />
                  <Route
                    path="myaccount"
                    element={
                      <RequireUser redirectTo="/login">
                        <MyAccount />
                      </RequireUser>
                    }
                  ></Route>
                  <Route path="error" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ThemeProvider>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
