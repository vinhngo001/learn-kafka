require("dotenv").config();
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: 'test-topic',
    brokers: ['localhost:9092', 
    // 'localhost:9093', 'localhost:9094'
],
    // ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: process.env.CLIENT_USER,
        password: process.env.CLIENT_PASSWORD
    },
});

const consumer = kafka.consumer({ groupId: 'test-group' });
const run = async () => {
    try {
        // Consuming
        await consumer.connect()
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Consumer 1 received message: ${message.value.toString()} from topic ${topic} and partition ${partition}`);
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                })
            },
        })
    } catch (error) {
        console.log(error);
    }
}

run().catch(console.error)