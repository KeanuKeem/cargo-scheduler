// React
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import CalendarPage from "./pages/CalendarPage";
import NavbarRoot from "./pages/NavbarRoot";
import Login from "./pages/Login";

// Context
import SelectContext from "./store/select-context";

// Refence Functions
import { getMonth } from "./components/Reference/Calendar";

// CSS
import "./App.css";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/calendar",
    element: <NavbarRoot />,
    children: [
      { path: "/calendar", element: <CalendarPage /> },
    ],
  },
]);

const date = new Date();
const dateMonth = date.getMonth();
const thisMonth = getMonth(dateMonth);
const thisYear = date.getFullYear();
const thisDay = date.getDate();

// -----App----- //
function App() {
  const [month, setMonth] = useState(thisMonth);
  const [year, setYear] = useState(thisYear);

  const monthSelectHandler = (event) => {
    setMonth(event.target.value);
  };

  const yearSelectHandler = (event) => {
    setYear(Number(event.target.value));
  };

  return (
    <SelectContext.Provider
      value={{
        month: month,
        thisMonth: thisMonth,
        year: year,
        thisYear: thisYear,
        today: thisDay,
        onMonthChange: monthSelectHandler,
        setMonth: setMonth,
        onYearChange: yearSelectHandler,
        setYear: setYear,
      }}
    >
      <RouterProvider router={router} />
    </SelectContext.Provider>
  );
}

export default App;
