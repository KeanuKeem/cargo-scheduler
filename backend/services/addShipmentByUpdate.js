const xlsx = require("xlsx");
const Shipment = require("../models/Shipment");
const {
  monthDigitsInString,
  monthDigitsInNumber,
} = require("../services/schedule-references");

const addShipmentByUpdate = async (req) => {
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  let consoleData = [];
  let fakData = [];
  let fakDataMade = [];
  let addedShipment = [];

  try {
    for (let i = 1; i < data.length; i++) {
      let [
        contType,
        cargoType,
        dayTime,
        dayNow,
        date,
        month,
        year,
        vessel,
        voyage,
        depot,
      ] = ["", "", "", "", "", "", "", "", "", ""];
      const baseDay = new Date("1900-01-01");

      if (data[i][5].slice(0, 2) === "NZ") {
        cargoType = "Import";
      } else {
        cargoType = "Export";
      }

      if (cargoType === "Import") {
        dayTime = data[i][11];
        dayNow = new Date(
          baseDay.getTime() + (dayTime - 2) * 24 * 60 * 60 * 1000
        );
      } else {
        dayTime = data[i][10];
      }

      date = dayNow.toString().split(" ")[2];
      month = monthDigitsInNumber(dayNow.toString().split(" ")[1]);
      year = dayNow.toString().split(" ")[3];
      const monthString = monthDigitsInString(dayNow.toString().split(" ")[1]);

      if (data[i][2] === "AIR") {
        vessel = data[i][13];
        contType = data[i][2];
      } else {
        contType = data[i][3];
        vessel = data[i][12];
        voyage = data[i][13];
      }

      if (data[i][48] === undefined) {
        depot = "Depot";
      } else {
        depot = data[i][48];
      }

      if (data[i][3] === "LCL" && consoleData.includes(data[i][1])) {
        fakData.push(data[i][1]);
        if (!fakDataMade.includes(data[i][1])) {
          await Shipment({
            ref: data[i][1],
            cargoType,
            contType: "FAK",
            schedule: year + "-" + month + "-" + date,
            port: data[i][5],
            vessel,
            voyage,
            container: "CONT0000000",
            depot,
            notes: "",
            favourite: false,
            day: {
              date,
              month: monthString,
              year,
            },
            mbl: {
              number: data[i][9],
              isSurr: false,
              date: "",
            },
            creator: req.userData.userId,
            fakShipments: [],
            isHold: false,
            dtr: {
              date: "",
              isDtr: false,
            },
            colours: {
              font: "#ffffff",
              back: "#000000",
            },
          }).save();

          fakDataMade.push(data[i][1]);
        }
      } else {
        consoleData.push(data[i][1]);
      }

      const shipment = await Shipment({
        ref: data[i][0],
        consoleId: data[i][1],
        cargoType,
        contType,
        schedule: year + "-" + month + "-" + date,
        port: data[i][5],
        vessel,
        voyage,
        container: "CONT0000000",
        depot,
        notes: "",
        favourite: false,
        day: {
          date,
          month: monthString,
          year,
        },
        mbl: {
          number: data[i][9],
          isSurr: false,
          date: "",
        },
        hbl: {
          number: data[i][8],
          isSurr: false,
          date: "",
        },
        stepOne: {
          isHandle: false,
          isDone: false,
          date: "",
        },
        stepTwo: {
          isHandle: false,
          isDone: false,
          date: "",
        },
        stepThree: {
          isHandle: false,
          isDone: false,
          date: "",
        },
        stepFour: {
          isHandle: false,
          isDone: false,
          date: "",
        },
        stepFive: {
          isHandle: false,
          isDone: false,
          date: "",
        },
        stepSix: {
          isHandle: false,
          isDone: false,
          date: "",
        },
        stepSeven: {
          isHandle: false,
          isStart: false,
          isEnd: false,
          startDate: "",
          endDate: "",
        },
        creator: req.userData.userId,
        fakShipments: [],
        isHold: false,
        dtr: {
          date: "",
          isDtr: false,
        },
        colours: {
          font: "#ffffff",
          back: "#000000",
        },
      });
      shipment.save();
    }
    fakData.map(async (shipment) => {
      await Shipment.updateMany(
        { consoleId: shipment },
        { contType: "LCLFAK" }
      );

      const masterShipment = await Shipment.findOne({ ref: shipment });

      const relatedShipments = await Shipment.find({ consoleId: shipment });
      relatedShipments.map((lclShipment) => {
        if (!addedShipment.includes(lclShipment.ref)) {
          masterShipment.fakShipments.push({
            ref: lclShipment.ref,
            font: lclShipment.colours.font,
            back: lclShipment.colours.back,
          });
          addedShipment.push(lclShipment.ref);
        }
      });
      masterShipment.save();
    });
    return { result: true, message: "Successfully Added!" };
  } catch {
    return {
      result: false,
      message: "Adding Unsuccessful, please log in and try again!",
    };
  }
};

exports.addShipmentByUpdate = addShipmentByUpdate;
