const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  ref: {
    type: String,
    required: true,
  },
  cargoType: {
    type: String,
    required: true,
  },
  contType: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  port: {
    type: String,
  },
  vessel: {
    type: String,
  },
  voyage: {
    type: String,
  },
  container: {
    type: String,
  },
  depot: {
    type: String,
  },
  dtr: {
    isDtr: { type: Boolean, default: false },
    date: { type: String, default: "" },
  },
  notes: {
    type: String,
  },
  consoleId: {
    type: String,
    required: function () {
      return this.contType === "LCLFAK";
    },
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  fakShipments: {
    type: [
      {
        ref: String,
        font: String,
        back: String,
        isHold: { type: Boolean, default: false },
      },
    ],
    required: function () {
      return this.contType === "FAK";
    },
  },
  day: {
    date: {
      type: Number,
    },
    month: {
      type: String,
    },
    year: {
      type: Number,
    },
  },
  mbl: {
    number: {
      type: String,
    },
    isSurr: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  hbl: {
    number: {
      type: String,
    },
    isSurr: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  isHold: {
    type: Boolean,
    default: false,
  },
  colours: {
    font: {
      type: String,
      default: "#ffffff"
    },
    back: {
      type: String,
      default: "#000000"
    }
  },
  stepOne: {
    isHandle: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
    },
    date: {
      type: String,
    },
  },
  stepTwo: {
    isHandle: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
    },
    date: {
      type: String,
    },
  },
  stepThree: {
    isHandle: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
    },
    date: {
      type: String,
    },
  },
  stepFour: {
    isHandle: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
    },
    date: {
      type: String,
    },
  },
  stepFive: {
    isHandle: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
    },
    date: {
      type: String,
    },
  },
  stepSix: {
    isHandle: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
    },
    date: {
      type: String,
    },
  },
  stepSeven: {
    isHandle: {
      type: Boolean,
    },
    isStart: {
      type: Boolean,
    },
    isEnd: {
      type: Boolean,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  fontColour: String,
  backColour: String,
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
