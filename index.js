require("dotenv").config();
const { Consumer } = require("sqs-consumer");
const { SQS } = require("aws-sdk");

const { AWS_QUEUE_URL, AWS_SECRET_KEY, AWS_ACCESS_KEY } = process.env;

const queueConsumer = Consumer.create({
  queueUrl: AWS_QUEUE_URL,
  handleMessage,
  sqs: new SQS({
    region: "us-east-1",
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  }),
});
queueConsumer.on("error", console.error);
queueConsumer.on("processing_error", console.error);
queueConsumer.on("timeout_error", console.error);
queueConsumer.start();

async function handleMessage(sqsMessage) {
  try {
    // const message = JSON.parse(sqsMessage.Body)
    console.log("LOG ~ handleMessage ~ sqsMessage.Body", sqsMessage.Body);
  } catch (err) {
    console.log("LOG ~ handleMessage ~ err", err);
  }
}

console.log(`Worker started at ${new Date()}`);
