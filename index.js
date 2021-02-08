require("dotenv").config();
const { Consumer } = require("sqs-consumer");
const { SQS } = require("aws-sdk");
const { handleSqsCommand } = require("./services/raspberryService");
const { logger } = require("./services/logService");

const { NODE_ENV, AWS_QUEUE_URL, AWS_SECRET_KEY, AWS_ACCESS_KEY } = process.env;

const queueConsumer = Consumer.create({
  queueUrl: AWS_QUEUE_URL,
  handleMessage,
  sqs: new SQS({
    region: "us-east-1",
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  }),
});
queueConsumer.on("error", (err) => logger.error(err));
queueConsumer.on("processing_error", (err) => logger.error(err));
queueConsumer.on("timeout_error", (err) => logger.error(err));
queueConsumer.start();

async function handleMessage(sqsMessage) {
  try {
    const message = JSON.parse(sqsMessage.Body);
    handleSqsCommand(message);
  } catch (err) {
    logger.error(err);
  }
}

logger.info(`Worker started at ${new Date()}`);
logger.info(`Stage: ${NODE_ENV}`);
