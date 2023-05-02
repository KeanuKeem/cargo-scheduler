const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  favourites: {
    type: [{ ref: String }],
    default: [],
  },
  preferences: {
    fontBase: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backBase: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontOne: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backOne: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontTwo: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backTwo: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontThree: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backThree: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontFour: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backFour: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontFive: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backFive: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontSix: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backSix: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontSevenStart: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backSevenStart: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontSevenEnd: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backSevenEnd: {
        type: String,
        required: true,
        default: "#000000",
    },
    fontComplete: {
        type: String,
        required: true,
        default: "#ffffff",
    },
    backComplete: {
        type: String,
        required: true,
        default: "#000000",
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
