const Shipment = require("../models/Shipment");
const { findShipmentsByDay } = require("../services/findShipment");
const { makeShipment } = require("../services/makeShipment");
const { saveHandling } = require("../services/saveShipmentHandling");
const { updateShipmentHandler } = require("../services/updateShipment");
const { removeShipmentHandler } = require("../services/removeShipmentHandler");
const { removeFakShipment } = require("../services/removeFakShipment");
const {
  updateVesselSchedulesHandler,
} = require("../services/updateVesselSchedule");
const { getSearchResult } = require("../services/getSearchResult");
const { excelExport } = require("../services/excelExport");
const { findShipmentForTodo } = require("../services/findShipmentForTodo");
const {addShipmentByUpdate} = require("../services/addShipmentByUpdate");

const getScheduleByDay = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const schedule = await findShipmentsByDay(
      req.query.month,
      req.query.year,
      req.query.type,
      req.query.shipType,
      req.userData.userId
    );
    res.status(200).send(schedule);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createShipment = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const message = await makeShipment(req);
    if (message === "successful") {
      res.status(200).send();
    } else {
      res.status(500).send(message);
    }
  } catch (err) {
    res.status(500).send("Server Error, Try again!");
  }
};

const getShipment = async (req, res) => {
  const ref = req.query.id;
  const _id = req.userData.userId;

  try {
    const shipment = await Shipment.findOne({ ref: ref, creator: _id });
    res.status(200).send(shipment);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const saveShipment = async (req, res) => {
  try {
    const condition = await saveHandling(req);

    if (condition) {
      res.status(200).send("Saved!");
    } else {
      res.status(500).send("Could not save, please try again!");
    }
  } catch {
    res.status(500).send("Server Error, please try again!");
  }
};

const updateShipment = async (req, res) => {
  const output = await updateShipmentHandler(req);
  if (output.result) {
    res.status(200).send("Successfully Updated!");
  } else {
    res.status(500).send(output.message);
  }
};

const createShipmentInFak = async (req, res) => {
  const message = await makeShipment(req);

  if (message === "successful") {
    res.status(200).send(message);
  } else {
    res.status(500).send(message);
  }
};

const deleteShipment = async (req, res) => {
  const output = await removeShipmentHandler(req);
  if (output.result) {
    res.status(200).send("Succesfully Deleted!");
  } else {
    res.status(500).send(output.message);
  }
};

const deleteShipments = async (req, res) => {
  const output = await removeFakShipment(req);
  if (output.result) {
    res.status(200).send("Successfully Deleted!");
  } else {
    res.status(500).send(output.message);
  }
};

const updateVesselSchedules = async (req, res) => {
  const output = await updateVesselSchedulesHandler(req);
  if (output.result) {
    res.status(200).send(output.message);
  } else {
    res.status(500).send(output.message);
  }
};

const getSearch = async (req, res) => {
  const output = await getSearchResult(req);
  if (output.result) {
    res.status(200).send(output.data);
  } else {
    res.status(500).send(output.message);
  }
};

const getFileData = async (req, res) => {
  const output = await excelExport(req);
  if (output.result) {
    res.status(200).json(output.data);
  } else {
    res.status(500).send(output.message);
  }
};

const getScheduleByDayFromTodo = async (req, res) => {
  try {
    const schedule = await findShipmentForTodo(
      req.query.date,
      req.query.month,
      req.query.year,
      req.query.type,
      req.query.shipType,
      req.userData.userId
    );
    res.status(200).send(schedule);
  } catch {
    res.status(500).send("Please log in and try again!");
  }
};

const addByUpload = async (req, res) => {
  const output = await addShipmentByUpdate(req);
  if (output.result) {
    res.status(200).send(output.message);
  } else {
    res.status(500).send(output.message);
  }
};

exports.createShipment = createShipment;
exports.getShipment = getShipment;
exports.saveShipment = saveShipment;
exports.updateShipment = updateShipment;
exports.createShipmentInFak = createShipmentInFak;
exports.deleteShipment = deleteShipment;
exports.deleteShipments = deleteShipments;
exports.updateVesselSchedules = updateVesselSchedules;
exports.getScheduleByDay = getScheduleByDay;
exports.getSearch = getSearch;
exports.getFileData = getFileData;
exports.getScheduleByDayFromTodo = getScheduleByDayFromTodo;
exports.addByUpload = addByUpload;