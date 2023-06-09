import { useReducer, useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import SelectContext from "../store/select-context";

import Sidebar from "../components/Sidebar/Sidebar";
import TypeSelector from "../components/Calendar/Select/TypeSelector";
import SelectBtn from "../components/Calendar/Select/SelectBtn";
import ShipmentAddModal from "../components/Shipment/ShipmentAddModal";
import ShipmentModal from "../components/Shipment/ShipmentModal";
import Loading from "./Loading";

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
  const { dayp, monthp } = useParams();

  const [filteredData, setFilteredData] = useState([]);
  const [dataAdded, setDataAdded] = useState(false);
  const [dataEdited, setDataEdited] = useState(false);
  const [shipmentAdded, setShipmentAdded] = useState(false);
  const [sortBy, setSortBy] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [day, setDay] = useState(
    !dayp
      ? String(ctx.today).length > 1
        ? String(ctx.today)
        : "0" + String(ctx.today)
      : dayp
  );
  const [month, setMonth] = useState(
    !monthp
      ? String(new Date().getMonth() + 1).length > 1
        ? String(new Date().getMonth() + 1)
        : "0" + String(new Date().getMonth() + 1)
      : monthp
  );
  const [strMonth, setStrMonth] = useState(ctx.month);
  const [year, setYear] = useState(ctx.year);
  const [isShipmentClicked, setIsShipmentClicked] = useState(false);
  const [showType, setShowType] = useState("");
  const [typeArray, setTypeArray] = useState([]);
  const [dateEdited, setDateEdited] = useState(false);
  const [showFakShipment, setShowFakShipment] = useState(false);
  const [toggleClass, setToggleClass] = useState("");

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
      id: "0+" + event.target.id,
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
    setDateEdited(true);
    setDay(dateRef.current.value.slice(8, 10));
    setMonth(dateRef.current.value.slice(5, 7));
    setStrMonth(getMonth(Number(dateRef.current.value.slice(5, 7)) - 1));
    setYear(dateRef.current.value.slice(0, 4));
    dateRef.current.blur();
  };

  const toggleHandler = () => {
    if (toggleClass === "" || toggleClass === "toggle-off") {
      setToggleClass("toggle-on");
      setShowFakShipment(true);
    } else {
      setToggleClass("toggle-off");
      setShowFakShipment(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL +
            `/shipment/todo/day?date=${day}&month=${strMonth}&year=${year}&type=${sortBy}&shipType=All`,
          { headers: { Authorization: "Bearer " + ctx.token } }
        );
        setIsLoading(false);
        setFilteredData(response.data);
        setShowType("BKR");
      } catch (err) {}
    };
    fetchData();
    setDataAdded(false);
    setDataEdited(false);
    setShipmentAdded(false);
    setDateEdited(false);
  }, [
    day,
    month,
    year,
    dataAdded,
    dataEdited,
    shipmentAdded,
    sortBy,
    ctx.token,
  ]);

  useEffect(() => {
    if (ctx.searchValue !== null && ctx.searchValue !== undefined) {
      searchShipmentOpenHandler();
    }
  }, [ctx.searchValue]);

  useEffect(() => {
    if (showType === "BKR") {
      setTypeArray(brokerageArray);
    } else if (showType === "FCL") {
      setTypeArray(fclArray);
    } else if (showType === "FAK") {
      setTypeArray(fakArray);
    } else if (showType === "LCL") {
      setTypeArray(lclArray);
    } else {
      setTypeArray(airArray);
    }
  }, [showType, dateEdited]);

  const brokerageArray = toDoHandler.generateBrokerArray(
    filteredData,
    Number(day)
  );
  const fakArray = toDoHandler.generateFAKArray(filteredData, Number(day));
  const fclArray = toDoHandler.generateFCLArray(filteredData, Number(day));
  const lclArray = toDoHandler.generateLCLArray(filteredData, Number(day));
  const airArray = toDoHandler.generateAIRArray(filteredData, Number(day));

  return (
    <>
      {isLoading && <Loading />}
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
      <Sidebar dataEdited={dataEdited} setDataEdited={setDataEdited} />
      <div className="todo">
        <div className="todo__top">
          <TypeSelector
            type="get"
            defaultText={sortBy}
            onChange={setSortBy}
            className="todo__dropdown"
          />
          <div className="todo__input">
            <input
              type="date"
              ref={dateRef}
              onChange={dateHandler}
              defaultValue={
                String(year) + "-" + String(month) + "-" + String(day)
              }
            />
          </div>
          <div className="todo__type">
            <SelectBtn onClick={modalAddOpenHandler}>ADD</SelectBtn>
            <TypeSelector
              type="getType"
              defaultText="BKR"
              onChange={setShowType}
              className="todo__typeDropdown"
            />
          </div>
        </div>
        <div className="todo__contents">
          <div className="todo__contents__sm__items">
            <h2>{showType === "BKR" ? "Brokerage" : showType}</h2>
            <hr />
            {typeArray.map((shipment) => {
              return (
                <p
                  key={shipment.id}
                  id={shipment.id}
                  style={{
                    backgroundColor: shipment.back,
                    color: shipment.font,
                  }}
                  onClick={modalShipmentOpenHandler}
                >
                  {shipment.isHold ? (
                    <>
                      <span>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                      </span>{" "}
                      {" (" + shipment.contType + ") " + shipment.id}
                    </>
                  ) : (
                    "(" + shipment.contType + ") " + shipment.id
                  )}
                </p>
              );
            })}
          </div>
          <div className="todo__contents__items">
            <h2>Brokerage</h2>
            <hr />
            {brokerageArray.map((shipment) => {
              return (
                <p
                  key={shipment.id}
                  id={shipment.id}
                  style={{
                    backgroundColor: shipment.back,
                    color: shipment.font,
                  }}
                  onClick={modalShipmentOpenHandler}
                >
                  {shipment.isHold ? (
                    <>
                      <span>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                      </span>{" "}
                      {" (" + shipment.contType + ") " + shipment.id}
                    </>
                  ) : (
                    "(" + shipment.contType + ") " + shipment.id
                  )}
                </p>
              );
            })}
          </div>
          <div className="todo__contents__items">
            <div className="todo__contents__items__head">
              <h2>FAK</h2>
              <div className="toggle" onClick={toggleHandler}>
                <FontAwesomeIcon className={toggleClass} icon={faCircle} />
              </div>
            </div>
            <hr />
            {fakArray.map((shipment) => {
              if (shipment.contType === "FAK") {
                return (
                  <p
                    key={shipment.id}
                    id={shipment.id}
                    style={{
                      backgroundColor: shipment.back,
                      color: shipment.font,
                    }}
                    onClick={modalShipmentOpenHandler}
                  >
                    {shipment.isHold ? (
                      <>
                        <span>
                          <FontAwesomeIcon icon={faCircleExclamation} />
                        </span>{" "}
                        {" (" + shipment.contType + ") " + shipment.id}
                      </>
                    ) : (
                      "(" + shipment.contType + ") " + shipment.id
                    )}
                  </p>
                );
              } else {
                if (showFakShipment) {
                  return (
                    <p
                      key={shipment.id}
                      id={shipment.id}
                      style={{
                        backgroundColor: shipment.back,
                        color: shipment.font,
                      }}
                      onClick={modalShipmentOpenHandler}
                    >
                      {shipment.isHold ? (
                        <>
                          <span>
                            <FontAwesomeIcon icon={faCircleExclamation} />
                          </span>{" "}
                          {" (" + shipment.consoleId + ") " + shipment.id}
                        </>
                      ) : (
                        "(" + shipment.consoleId + ") " + shipment.id
                      )}
                    </p>
                  );
                }
              }
            })}
          </div>
          <div className="todo__contents__items">
            <h2>FCL</h2>
            <hr />
            {fclArray.map((shipment) => {
              return (
                <p
                  key={shipment.id}
                  id={shipment.id}
                  style={{
                    backgroundColor: shipment.back,
                    color: shipment.font,
                  }}
                  onClick={modalShipmentOpenHandler}
                >
                  {shipment.isHold ? (
                    <>
                      <span>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                      </span>{" "}
                      {" (" + shipment.contType + ") " + shipment.id}
                    </>
                  ) : (
                    "(" + shipment.contType + ") " + shipment.id
                  )}
                </p>
              );
            })}
          </div>
          <div className="todo__contents__items">
            <h2>LCL</h2>
            <hr />
            {lclArray.map((shipment) => {
              return (
                <p
                  key={shipment.id}
                  id={shipment.id}
                  style={{
                    backgroundColor: shipment.back,
                    color: shipment.font,
                  }}
                  onClick={modalShipmentOpenHandler}
                >
                  {shipment.isHold ? (
                    <>
                      <span>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                      </span>{" "}
                      {" (" + shipment.contType + ") " + shipment.id}
                    </>
                  ) : (
                    "(" + shipment.contType + ") " + shipment.id
                  )}
                </p>
              );
            })}
          </div>
          <div className="todo__contents__items">
            <h2>AIR</h2>
            <hr />
            {airArray.map((shipment) => {
              return (
                <p
                  key={shipment.id}
                  id={shipment.id}
                  style={{
                    backgroundColor: shipment.back,
                    color: shipment.font,
                  }}
                  onClick={modalShipmentOpenHandler}
                >
                  {shipment.isHold ? (
                    <>
                      <span>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                      </span>{" "}
                      {" (" + shipment.contType + ") " + shipment.id}
                    </>
                  ) : (
                    "(" + shipment.contType + ") " + shipment.id
                  )}
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
