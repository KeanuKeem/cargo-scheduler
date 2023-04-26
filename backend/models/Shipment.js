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
    required: true,
  },
  vessel: {
    type: String,
    required: true,
  },
  voyage: {
    type: String,
    required: true,
  },
  container: {
    type: String,
    required: true,
  },
  depot: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  fakShipments: {
    type: [{ ref: String }],
    default: [],
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
  stepOne: {
    isHandle: {
      type: Boolean,
      default: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  stepTwo: {
    isHandle: {
      type: Boolean,
      default: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  stepThree: {
    isHandle: {
      type: Boolean,
      default: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  stepFour: {
    isHandle: {
      type: Boolean,
      default: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  stepFive: {
    isHandle: {
      type: Boolean,
      default: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  stepSix: {
    isHandle: {
      type: Boolean,
      default: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
    },
  },
  stepSeven: {
    isHandle: {
      type: Boolean,
      default: false,
    },
    isStart: {
      type: Boolean,
      default: false,
    },
    isEnd: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
