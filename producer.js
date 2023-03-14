const { Kafka } = require("kafkajs");
const Chance = require("chance");


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
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