const Shipment = require("../models/Shipment");

const excelExport = async (req) => {
  try {
    let excelData = [];
    let shipments;
    if (req.query.type !== "All") {
      if (req.query.month === "All") {
        if (req.query.year === "All") {
          shipments = await Shipment.find({
            creator: req.userData.userId,
            cargoType: req.query.type,
          });
        } else {
          shipments = await Shipment.find({
            creator: req.userData.userId,
            cargoType: req.query.type,
            "day.year": req.query.year,
          });
        }
      } else {
        if (req.query.year === "All") {
          shipments = await Shipment.find({
            creator: req.userData.userId,
            cargoType: req.query.type,
            "day.month": req.query.month,
          });
        } else {
          shipments = await Shipment.find({
            creator: req.userData.userId,
            cargoType: req.query.type,
            "day.month": req.query.month,
            "day.year": req.query.year,
          });
        }
      }
    } else {
      if (req.query.month === "All") {
        if (req.query.year === "All") {
          shipments = await Shipment.find({
            creator: req.userData.userId,
          });
        } else {
          shipments = await Shipment.find({
            creator: req.userData.userId,
            "day.year": req.query.year,
          });
        }
      } else {
        if (req.query.year === "All") {
          shipments = await Shipment.find({
            creator: req.userData.userId,
            "day.month": req.query.month,
          });
        } else {
          shipments = await Shipment.find({
            creator: req.userData.userId,
            "day.month": req.query.month,
            "day.year": req.query.year,
          });
        }
      }
    }

    shipments.map((shipment) => {
      if (shipment.cargoType === "Import") {
        if (shipment.contType === "AIR") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETA: shipment.schedule,
            POA: shipment.port,
            Vessel: "",
            Voyage: "",
            Flight: shipment.vessel,
            "Container Number": "",
            "Unpacking Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        } else if (shipment.contType === "BKR") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETA: shipment.schedule,
            POA: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Unpacking Depot": shipment.depot,
            "MBL Number": "",
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        } else if (shipment.contType === "FAK") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETA: shipment.schedule,
            POA: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Unpacking Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": "",
            Remarks: shipment.notes,
          });
        } else if (shipment.contType === "LCLFAK") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": shipment.consoleId,
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETA: shipment.schedule,
            POA: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Unpacking Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        } else {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETA: shipment.schedule,
            POA: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Unpacking Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        }
      } else {
        if (shipment.contType === "AIR") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETD: shipment.schedule,
            POD: shipment.port,
            Vessel: "",
            Voyage: "",
            Flight: shipment.vessel,
            "Container Number": "",
            "Packing Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        } else if (shipment.contType === "BKR") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETD: shipment.schedule,
            POD: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Packing Depot": shipment.depot,
            "MBL Number": "",
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        } else if (shipment.contType === "FAK") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETD: shipment.schedule,
            POD: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Packing Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": "",
            Remarks: shipment.notes,
          });
        } else if (shipment.contType === "LCLFAK") {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": shipment.consoleId,
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETD: shipment.schedule,
            POD: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Packing Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        } else {
          excelData.push({
            "Shipment ID": shipment.ref,
            "Console ID": "",
            "Cargo Type": shipment.cargoType,
            "Shipment Type": shipment.contType,
            ETD: shipment.schedule,
            POD: shipment.port,
            Vessel: shipment.vessel,
            Voyage: shipment.voyage,
            Flight: "",
            "Container Number": shipment.container,
            "Packing Depot": shipment.depot,
            "MBL Number": shipment.mbl.number,
            "HBL Number": shipment.hbl.number,
            Remarks: shipment.notes,
          });
        }
      }
    });
    return {result: true, data: excelData};
  } catch {
    return {result: false, message: "Please log in and try again!"};
  }
};

exports.excelExport = excelExport;
