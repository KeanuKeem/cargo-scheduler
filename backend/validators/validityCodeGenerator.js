const { passwordValidator } = require("./signupValidator");

let validities = [];

const validityCodeGenerator = (email) => {
    let code = "";
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    
    validities = validities.filter(obj => obj.email !== email);

    const newValidity = validities.push({email, code});

    setTimeout(() => {
        const index = validities.indexOf(newValidity);
        if (index !== -1) {
            validities.splice(index, index+1);
        }
    }, 2*60*1000);
    return code;
};

const validityCodeChecker = (email, code) => {
    let index = 0;
    let found = false;
    for (const obj of validities) {
        if (obj.email === email && obj.code === code) {
            found = true;
            break;
        } else {
            index++;
        }
    }

    if (found) {
        validities.splice(index, index+1);
        return found;
    } else {
        return found;
    }
};

exports.validityCodeGenerator = validityCodeGenerator;
exports.validityCodeChecker = validityCodeChecker;