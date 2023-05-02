import { faMarsDouble } from "@fortawesome/free-solid-svg-icons";

function generateBrokerArray(data, day) {
  let result = [];
  if (data.length > 0) {
    const dateArray = data[0].shipments.filter((dateObj) => {
      return dateObj.date === day;
    });
    if (dateArray.length > 0) {
      dateArray[0].values.map((shipment) => {
        if (shipment.contType === "BKR") {
          result.push(shipment);
        }
      });
    }
  }
  return result;
}

function generateFAKArray(data, day) {
  let result = [];
  if (data.length > 0) {
    const dateArray = data[0].shipments.filter((dateObj) => {
      return dateObj.date === day;
    });
    if (dateArray.length > 0) {
      dateArray[0].values.map((shipment) => {
        if (shipment.contType === "FAK") {
          result.push(shipment);
        }
      });
    }
  }
  return result;
}

function generateFCLArray(data, day) {
  let result = [];
  if (data.length > 0) {
    const dateArray = data[0].shipments.filter((dateObj) => {
      return dateObj.date === day;
    });
    if (dateArray.length > 0) {
      dateArray[0].values.map((shipment) => {
        if (shipment.contType === "FCL") {
          result.push(shipment);
        }
      });
    }
  }
  return result;
}

function generateLCLArray(data, day) {
  let result = [];
  if (data.length > 0) {
    const dateArray = data[0].shipments.filter((dateObj) => {
      return dateObj.date === day;
    });
    if (dateArray.length > 0) {
      dateArray[0].values.map((shipment) => {
        if (shipment.contType === "LCL") {
          result.push(shipment);
        }
      });
    }
  }
  return result;
}

function generateAIRArray(data, day) {
  let result = [];
  if (data.length > 0) {
    const dateArray = data[0].shipments.filter((dateObj) => {
      return dateObj.date === day;
    });
    if (dateArray.length > 0) {
      dateArray[0].values.map((shipment) => {
        if (shipment.contType === "AIR") {
          result.push(shipment);
        }
      });
    }
  }
  return result;
}

export default {
  generateBrokerArray,
  generateFAKArray,
  generateFCLArray,
  generateLCLArray,
  generateAIRArray,
};
