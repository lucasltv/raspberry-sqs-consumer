const Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO
const LED = new Gpio(4, "out"); //use GPIO pin 4, and specify that it is output

exports.handleSqsCommand = async function (message) {
  if (!Object.prototype.hasOwnProperty.call(message, "enabled")) {
    throw new Error(
      `Parameter 'outputEnabled' not found! \n Message received: ${JSON.stringify(
        message
      )}`
    );
  }
  const { outputEnabled } = message;
  if (outputEnabled) {
    LED.writeSync(1);
  } else {
    LED.writeSync(0);
  }
};
