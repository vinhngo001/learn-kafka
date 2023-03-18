const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: 'con-cac',
    brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
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