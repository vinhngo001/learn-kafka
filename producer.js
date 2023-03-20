require("dotenv").config();
const { Kafka } = require("kafkajs");
const Chance = require("chance");

const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: ['localhost:9092'],
    // ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: process.env.CLIENT_USER,
        password: process.env.CLIENT_PASSWORD
    },
});
const chance = new Chance();

const producer = kafka.producer();

const createMessage = async () => {
    const topic = 'test-topic';
    try {
        await producer.send({
            topic,
            messages: [
                { value: chance.animal() }
            ]
        });
    } catch (error) {
        console.log(error);
        return error;
    }
}

const run = async () => {
    // Producing
    await producer.connect();
    setInterval(createMessage, 1000)
}

run().catch(console.error)