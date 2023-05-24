import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "./Loading";
import Sidebar from "../components/Sidebar/Sidebar";
import TypeSelector from "../components/Calendar/Select/TypeSelector";
import MonthSelector from "../components/Calendar/Select/MonthSelector";
import YearSelector from "../components/Calendar/Select/YearSelector";
import SelectBtn from "../components/Calendar/Select/SelectBtn";
import ShipmentPopup from "../components/Shipment/ShipmentPopup";

import SelectContext from "../store/select-context";

import ExcelExport from "../components/Reference/ExcelExport";

import "./File.css";

const File = () => {
  const ctx = useContext(SelectContext);

  const navigate = useNavigate();

  const [dataEdited, setDataEdited] = useState(false);
  const [sortBy, setSortBy] = useState("All");
  const [month, setMonth] = useState(ctx.month);
  const [year, setYear] = useState(ctx.year);
  const [isLoading, setIsLoading] = useState(false);
  const [addFile, setAddFile] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const downloadHandler = async () => {
    setIsLoading(true);
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        `/shipment/file?month=${month}&year=${year}&type=${sortBy}`,
      { headers: { Authorization: "Bearer " + ctx.token } }
    );
    setIsLoading(false);
    await ExcelExport(response.data, "Shipments-Excel");
  };

  const uploadHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", addFile);

    try {
      setIsLoading(true);
      const response = await axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/shipment/upload",
          formData,
          { headers: { Authorization: "Bearer " + ctx.token } }
        )
        .then((result) => {
          setPopupMessage(result.data);
          setIsPopup(true);
          setIsLoading(false);
        });
    } catch (err) {
      setPopupMessage(err.response.data);
      setIsPopup(true);
      setIsLoading(false);
    }
  };

  const popupCloseHandler = () => {
    setIsPopup(false);
    navigate("/calendar");
  };

  return (
    <>
      {isPopup && (
        <ShipmentPopup
          type="notification"
          text={popupMessage}
          button="Okay!"
          onClick={popupCloseHandler}
        />
      )}
      {isLoading && <Loading />}
      <Sidebar dataEdited={dataEdited} setDataEdited={setDataEdited} />
      <div className="file">
        <div className="file__top">
          <h3>- Export Shipments in .xlsx</h3>
          <TypeSelector
            type="get"
            defaultText={sortBy}
            onChange={setSortBy}
            className="file__top__month-drop"
          />
          <MonthSelector
            className="file__top__month-drop"
            setMonth={setMonth}
            sendFrom="file"
          />
          <div className="file__top__year">
            <YearSelector
              className="file__top__year-drop"
              setYear={setYear}
              sendFrom="file"
            />
          </div>
          <SelectBtn onClick={downloadHandler}>Download</SelectBtn>
        </div>
        <form className="file__upload" onSubmit={uploadHandler}>
          <h3>- Add Shipment with .xlsx</h3>
          <input
            type="file"
            onChange={(event) => {
              setAddFile(event.target.files[0]);
            }}
          />
          <SelectBtn type="submit">Upload</SelectBtn>
        </form>
      </div>
    </>
  );
};

export default File;
