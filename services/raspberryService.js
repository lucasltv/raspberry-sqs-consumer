const Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO
const LED = new Gpio(4, "out"); //use GPIO pin 4, and specify that it is output

exports.handleSqsCommand = async function (message) {
  switch (message) {
    case "START":
      LED.writeSync(1);
      break;
    case "STOP":
      LED.writeSync(0);
      break;
    default:
      throw new Error(
        `Parameter invalid. Must be START or STOP. Message received: ${JSON.stringify(
          message
        )}`
      );
  }
};
