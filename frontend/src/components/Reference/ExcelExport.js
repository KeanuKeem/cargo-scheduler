import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const ExcelExport = async (excelData, fileName) => {
  const sheet = XLSX.utils.json_to_sheet(excelData);
  const book = { Sheets: { data: sheet }, SheetNames: ["data"] };
  const boldStyle = {
    font: {
      bold: true,
    },
  };
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  for (let i = range.s.c; i <= range.e.c; i++) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
    const cell = sheet[cellRef] || {};
    sheet[cellRef] = Object.assign(cell, { s: boldStyle });
  }
  const excelBuffer = XLSX.write(book, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export default ExcelExport;
