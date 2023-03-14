const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
});

const consumer = kafka.consumer({ groupId: 'test-group' });
const run = async () => {
    try {
        const topic = 'test-topic';
        // Consuming
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
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