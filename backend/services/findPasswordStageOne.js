const User = require("../models/User");

const findPasswordStageOne = async (username, email, organisation) => {
    const user = await User.findOne({
        username,
        email,
        organisation,
    });
    if (user !== null) {
        return true;
    } else {
        return false;
    }
};

exports.findPasswordStageOne = findPasswordStageOne;