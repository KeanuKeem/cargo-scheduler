const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  validityCodeChecker,
  validityCodeRemover,
} = require("../services/validityCodeGenerator");
const { passwordValidator } = require("./signupValidator");

const findPasswordStageTwo = async (
  username,
  email,
  organisation,
  verification,
  password
) => {
  const user = await User.findOne({
    username,
    email,
    organisation,
  });
  if (user !== null) {
    const condition = validityCodeChecker(email, verification);
    if (condition) {
      const passwordCondition = passwordValidator(password);
      if (passwordCondition !== "") {
        return passwordCondition;
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ username }, { password: hashedPassword });
        validityCodeRemover(email, verification);
        return "Password Saved";
      }
    } else {
      return "Verification Code is not correct!";
    }
  } else {
    return "Details do not match, please try again!";
  }
};

exports.findPasswordStageTwo = findPasswordStageTwo;
