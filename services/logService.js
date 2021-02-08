const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";
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

const formatsToApply = isDev
  ? format.combine(
      format.colorize(), //Only for dev
      format.errors({ stack: true }),
      format.metadata(),
      format.timestamp(),
      format.json()
    )
  : format.combine(
      format.errors({ stack: true }),
      format.metadata(),
      format.timestamp(),
      format.json()
    );

exports.logger = createLogger({
  format: formatsToApply,
  transports: transportsArr,
});
