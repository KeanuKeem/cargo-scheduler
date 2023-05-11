import { useState, useContext } from "react";
import axios from "axios";

import Loading from "./Loading";
import Sidebar from "../components/Sidebar/Sidebar";
import TypeSelector from "../components/Calendar/Select/TypeSelector";
import MonthSelector from "../components/Calendar/Select/MonthSelector";
import YearSelector from "../components/Calendar/Select/YearSelector";
import SelectBtn from "../components/Calendar/Select/SelectBtn";

import SelectContext from "../store/select-context";

import ExcelExport from "../components/Reference/ExcelExport";

import "./File.css";

const File = () => {
  const ctx = useContext(SelectContext);

  const [dataEdited, setDataEdited] = useState(false);
  const [sortBy, setSortBy] = useState("All");
  const [month, setMonth] = useState(ctx.month);
  const [year, setYear] = useState(ctx.year);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      {isLoading && <Loading />}
      <Sidebar dataEdited={dataEdited} setDataEdited={setDataEdited} />
      <div className="file">
        <div className="file__top">
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
          <SelectBtn onClick={downloadHandler}>Excel</SelectBtn>
        </div>
      </div>
    </>
  );
};

export default File;
