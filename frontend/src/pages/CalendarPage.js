// React
import React, {
  Fragment,
  useState,
  useReducer,
  useContext,
  useEffect,
} from "react";
import axios from "axios";

// Components
import Calendar from "../components/Calendar/Calendar/Calendar";
import Selectors from "../components/Calendar/Select/Selectors";
import ShipmentModal from "../components/Shipment/ShipmentModal";
import ShipmentAddModal from "../components/Shipment/ShipmentAddModal";
import Sidebar from "../components/Sidebar/Sidebar";
import Loading from "./Loading";

// Context
import SelectContext from "../store/select-context";

// Refence Functions
import {
  getPrevMonth,
  getNextMonth,
  generateDateArray,
} from "../components/Reference/Calendar";

// CSS
import "./CalendarPage.css";

const modalReducer = (state, action) => {
  if (action.type === "ADD") {
    return { value: action.val, show: true };
  }
  if (action.type === "SHIPMENT") {
    return {
      value: action.val,
      show: true,
      id: action.id,
      date: action.date,
    };
  }
  if (action.type === "CLOSE") {
    return { value: "", show: false, id: "" };
  }
};

// -----Contents-Components----- //
const CalendarPage = () => {
  const ctx = useContext(SelectContext);
  const [filteredData, setFilteredData] = useState([]);
  const [dataAdded, setDataAdded] = useState(false);
  const [dataEdited, setDataEdited] = useState(false);
  const [shipmentAdded, setShipmentAdded] = useState(false);
  const [sortBy, setSortBy] = useState("All");
  const [shipType, setShipType] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `/shipment/day?month=${ctx.month}&year=${ctx.year}&type=${sortBy}&shipType=${shipType}`,
          { headers: { Authorization: "Bearer " + ctx.token } }
        );
        setIsLoading(false);
        setFilteredData(response.data);
      } catch (err) {}
    };
    fetchData();
    setDataAdded(false);
    setDataEdited(false);
    setShipmentAdded(false);
  }, [
    ctx.month,
    ctx.year,
    dataAdded,
    dataEdited,
    shipmentAdded,
    sortBy,
    shipType,
    ctx.token,
  ]);

  const [modalState, dispatchModal] = useReducer(modalReducer, {
    value: "",
    show: false,
    id: "",
  });

  const monthPrevHandler = () => {
    if (ctx.month === "January" && ctx.year > 2023) {
      ctx.setMonth(getPrevMonth(ctx.month));
      ctx.setYear(ctx.year - 1);
    } else if (ctx.month === "January" && ctx.year === 2023) {
      return;
    } else {
      ctx.setMonth(getPrevMonth(ctx.month));
    }
  };

  const monthNextHandler = () => {
    ctx.setMonth(getNextMonth(ctx.month));
    if (ctx.month === "December") {
      ctx.setYear(ctx.year + 1);
    }
  };

  const modalAddOpenHandler = () => {
    dispatchModal({ type: "ADD", val: "add" });
  };

  const modalShipmentOpenHandler = (event) => {
    dispatchModal({
      type: "SHIPMENT",
      val: "shipment",
      id: event.target.id,
    });
  };

  const searchShipmentOpenHandler = () => {
    dispatchModal({
      type: "SHIPMENT",
      val: "shipment",
      id: "0+" + ctx.searchValue,
    });
  };

  const modalCloseHandler = () => {
    dispatchModal({ type: "CLOSE" });
    ctx.setIsSearch(false);
    ctx.setSearchValue();
  };

  useEffect(() => {
    if (ctx.searchValue !== null && ctx.searchValue !== undefined) {
      searchShipmentOpenHandler();
    }
  }, [ctx.searchValue]);

  const monthArray = generateDateArray(filteredData, ctx.month, ctx.year);

  return (
    <Fragment>
      {isLoading && <Loading />}
      <Sidebar dataEdited={dataEdited} setDataEdited={setDataEdited} />
      {modalState.show && modalState.value === "shipment" && (
        <ShipmentModal
          modalValue={modalState}
          onClose={modalCloseHandler}
          onDataEdit={setDataEdited}
          dataEdited={dataEdited}
          shipmentAdded={shipmentAdded}
          onShipmentAdd={setShipmentAdded}
        />
      )}
      {modalState.show && modalState.value === "add" && (
        <ShipmentAddModal
          onClose={modalCloseHandler}
          onDataAdd={setDataAdded}
        />
      )}
      <div className="contents">
        <Selectors
          data={filteredData}
          onSort={setSortBy}
          onType={setShipType}
          onDataEdit={setDataEdited}
          onAddBtnClicked={modalAddOpenHandler}
        />
        <Calendar
          onShipmentClicked={modalShipmentOpenHandler}
          prevMonth={monthPrevHandler}
          nextMonth={monthNextHandler}
          monthArray={monthArray}
        />
      </div>
    </Fragment>
  );
};

export default CalendarPage;
