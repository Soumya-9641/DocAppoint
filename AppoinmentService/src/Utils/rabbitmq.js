const amqp = require('amqplib');

let connection;
let channel;

async function connectRabbitMQ() {
  if (connection) return;
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('RabbitMQ connected');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
    throw error;
  }
}

async function consumeQueue(queue, callback) {
  if (!channel) {
    await connectRabbitMQ();
  }
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (message) => {
    if (message !== null) {
      console.log("call here")
      callback(message.content.toString());
      channel.ack(message);

    }
  });
  console.log(`Consuming messages from queue ${queue}`);
}

  
async function publishToQueue(queue, message) {
  if (!channel) {
    await connectRabbitMQ();
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  console.log("data send successfully")
}

module.exports = { connectRabbitMQ, consumeQueue,publishToQueue };