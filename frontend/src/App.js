// React
import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

// Components
import Login from "./pages/Login";
import Loading from "./pages/Loading";

// Context
import SelectContext from "./store/select-context";

// Refence Functions
import { getMonth } from "./components/Reference/Calendar";

// CSS
import "./App.css";

const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));
const NavbarRoot = lazy(() => import("./pages/NavbarRoot"));

const date = new Date();
const dateMonth = date.getMonth();
const thisMonth = getMonth(dateMonth);
const thisYear = date.getFullYear();
const thisDay = date.getDate();

let logoutTimer;

// -----App----- //
function App() {
  const [month, setMonth] = useState(thisMonth);
  const [year, setYear] = useState(thisYear);
  const [loginError, setLoginError] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [isLogIn, setIsLogIn] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      setToken(storedData.token);
      setUserId(storedData.userId);
      return true;
    }
    return false;
  });

  const monthSelectHandler = (event) => {
    setMonth(event.target.value);
  };

  const yearSelectHandler = (event) => {
    setYear(Number(event.target.value));
  };

  const loginHandler = async (event) => {
    const userDetail = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      setIsLoggingIn(true);
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/user/login",
        userDetail
      );
      setIsLoggingIn(false);
      if (result.status === 200) {
        setToken(result.data.token);
        const tokenExpirationDate = new Date(
          new Date().getTime() + 1000 * 60 * 60
        );
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: result.data.userId,
            token: result.data.token,
            expiration: tokenExpirationDate.toISOString(),
          })
        );
        setUserId(result.data.userId);
        setIsLogIn(true);
        return true;
      }
    } catch (err) {
      if (err.response.status === 404) {
        setLoginError("Service is currently unavailable!");
      } else if (err.response.status === "CORS error") {
        setLoginError("Your access point is not valid!");
      } else {
        setLoginError(err.response.data);
      }
    }
    return false;
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    setIsLogIn(false);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate]);

  useEffect(() => {
    setIsLoggingIn(false);
  
  }, [loginError]);

  return (
    <SelectContext.Provider
      value={{
        month,
        thisMonth,
        year,
        thisYear,
        today: thisDay,
        token,
        userId,
        isLogIn,
        loginError,
        isSearch,
        searchValue,
        isSidebar,
        setIsSidebar,
        setIsSearch,
        setSearchValue,
        onMonthChange: monthSelectHandler,
        setMonth: setMonth,
        onYearChange: yearSelectHandler,
        setYear: setYear,
      }}
    >
      <BrowserRouter basename="/">
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <Login isLoggingIn={isLoggingIn} onLogIn={loginHandler} />
              }
            />

            <Route
              path="/calendar"
              element={
                isLogIn ? (
                  <>
                    <NavbarRoot onLogOut={logoutHandler} />
                    <CalendarPage />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/todo"
              element={
                isLogIn ? (
                  <>
                    <NavbarRoot onLogOut={logoutHandler} />
                    <TodoPage />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/todo/:dayp/:monthp/:yearp"
              element={
                isLogIn ? (
                  <>
                    <NavbarRoot onLogOut={logoutHandler} />
                    <TodoPage />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SelectContext.Provider>
  );
}

export default App;
