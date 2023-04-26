import { useReducer, useContext, useState, useEffect, useRef } from "react";

import axios from "axios";

import SelectContext from "../store/select-context";

import Sidebar from "../components/Sidebar/Sidebar";
import TypeSelector from "../components/Calendar/Select/TypeSelector";
import SelectBtn from "../components/Calendar/Select/SelectBtn";
import ShipmentAddModal from "../components/Shipment/ShipmentAddModal";
import ShipmentModal from "../components/Shipment/ShipmentModal";

import { getMonth } from "../components/Reference/Calendar";
import toDoHandler from "../components/Reference/toDoHandler";

import "./TodoPage.css";

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

const TodoPage = () => {
  const ctx = useContext(SelectContext);
  const [filteredData, setFilteredData] = useState([]);
  const [dataAdded, setDataAdded] = useState(false);
  const [dataEdited, setDataEdited] = useState(false);
  const [shipmentAdded, setShipmentAdded] = useState(false);
  const [sortBy, setSortBy] = useState("All");
  const [day, setDay] = useState(ctx.today);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [strMonth, setStrMonth] = useState(ctx.month);
  const [year, setYear] = useState(ctx.year);
  const [isShipmentClicked, setIsShipmentClicked] = useState(false);

  const dateRef = useRef();

  const [modalState, dispatchModal] = useReducer(modalReducer, {
    value: "",
    show: false,
    id: "",
  });

  const modalAddOpenHandler = () => {
    dispatchModal({ type: "ADD", val: "add" });
  };

  const modalShipmentOpenHandler = (event) => {
    dispatchModal({
      type: "SHIPMENT",
      val: "shipment",
      id: event.target.id,
    });
    setIsShipmentClicked(true);
  };

  const searchShipmentOpenHandler = () => {
    dispatchModal({
      type: "SHIPMENT",
      val: "shipment",
      id: "0+" + ctx.searchValue,
    });
    setIsShipmentClicked(true);
  };

  const modalCloseHandler = () => {
    dispatchModal({ type: "CLOSE" });
    setIsShipmentClicked(false);
    ctx.setIsSearch(false);
    ctx.setSearchValue();
  };

  const dateHandler = () => {
    setDay(Number(dateRef.current.value.slice(8, 10)));
    setMonth(Number(dateRef.current.value.slice(5, 7)));
    setStrMonth(getMonth(Number(dateRef.current.value.slice(5, 7)) - 1));
    setYear(Number(dateRef.current.value.slice(0, 4)));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/shipment/day?month=${strMonth}&year=${year}&type=${sortBy}`,
          { headers: { Authorization: "Bearer " + ctx.token } }
        );
        setFilteredData(response.data);
      } catch (err) {}
    };
    fetchData();
    setDataAdded(false);
    setDataEdited(false);
    setShipmentAdded(false);
  }, [day, month, year, dataAdded, dataEdited, shipmentAdded, sortBy]);

  useEffect(() => {
    if (ctx.searchValue !== null && ctx.searchValue !== undefined) {
      searchShipmentOpenHandler();
    }
  }, [ctx.searchValue]);

  const brokerageArray = toDoHandler.generateBrokerArray(filteredData, day);
  const fakArray = toDoHandler.generateFAKArray(filteredData, day);
  const fclArray = toDoHandler.generateFCLArray(filteredData, day);
  const lclArray = toDoHandler.generateLCLArray(filteredData, day);

  return (
    <>
      {modalState.show && modalState.value === "shipment" && (
        <ShipmentModal
          filteredData={filteredData}
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
      <Sidebar />
      <div className="todo">
        <div className="todo__top">
          <TypeSelector type="get" className="todo__dropdown" />
          <input
            type="date"
            ref={dateRef}
            onChange={dateHandler}
            defaultValue={
              String(month).length > 1
                ? String(year) + "-" + String(month) + "-" + String(day)
                : String(year) + "-0" + String(month) + "-" + String(day)
            }
          />
          <SelectBtn onClick={modalAddOpenHandler}>ADD</SelectBtn>
        </div>
        <div className="todo__contents">
          <div className="todo__contents__items">
            <h2>Brokerage</h2>
            <hr />
            {brokerageArray.map((shipment) => {
              return (
                <p key={shipment.id}>
                  {"(" + shipment.contType + ") " + shipment.id}
                </p>
              );
            })}
          </div>
          <div className="todo__contents__items">
            <h2>FAK</h2>
            <hr />
            {fakArray.map((shipment) => {
              return (
                <p key={shipment.id}>
                  {"(" + shipment.contType + ") " + shipment.id}
                </p>
              );
            })}
          </div>
          <div className="todo__contents__items">
            <h2>FCL</h2>
            <hr />
            {fclArray.map((shipment) => {
              return (
                <p key={shipment.id}>
                  {"(" + shipment.contType + ") " + shipment.id}
                </p>
              );
            })}
          </div>
          <div className="todo__contents__items">
            <h2>LCL</h2>
            <hr />
            {lclArray.map((shipment) => {
              return (
                <p key={shipment.id}>
                  {"(" + shipment.contType + ") " + shipment.id}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
