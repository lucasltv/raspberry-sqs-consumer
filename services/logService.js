const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const transportsArr = [];

const fileTransport = new transports.DailyRotateFile({
  filename: "logs/raspberry-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "info",
});
transportsArr.push(fileTransport);

const consoleTransport = new transports.Console({
  level: "info",
  format: format.simple(),
});
transportsArr.push(consoleTransport);

exports.logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.timestamp(),
    format.json()
  ),
  transports: transportsArr,
});
