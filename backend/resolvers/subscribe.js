const createSubscriber = require("pg-listen")
const databaseURL = require("../config/default.json")
const webpush = require('web-push')


const publicVapidKey = 'BDQpiHJQZMB3bA2dM1ojPqUe9sNMM6sfu7Ka-ctmfrxwIFrTCIZbZLWxTJ_qLFP0Q8MfZJclaWX45oS_feMu2ag';
const privateVapidKey = 'Zd9WeTUseigz-61sxo5bk6KizM_MZGqIWMOpvYNNsck';

webpush.setVapidDetails('mailto:val@karpov.io', publicVapidKey, privateVapidKey);

const config = {
    host: 'localhost',
    user: "postgres", // default process.env.PGUSER || process.env.USER
    password: "1234", //default process.env.PGPASSWORD
    database: "postgres", // default process.env.PGDATABASE || process.env.USER
    port: "5432", // default process.env.PGPORT
}

const subscriber = createSubscriber(config)

function subscribe(data) {
    const subscription = data.subscription
    const id = data.id
    console.log(data)
    subscriber.notifications.on(`graphql:hello:userId:${id}`, (payload) => {
        // Payload as passed to subscriber.notify() (see below)
        console.log("Received notification in 'my-channel':", payload)
        const testPayload = JSON.stringify({ title: 'Sinulle on lisätty tekemistä!' });

        console.log(subscription);

        webpush.sendNotification(subscription, testPayload).catch(error => {
            console.error(error.stack);
        });
    })

    subscriber.events.on("error", (error) => {
        console.error("Fatal database connection error:", error)
        process.exit(1)
    })

    process.on("exit", () => {
        subscriber.close()
    })

    subscriber.connect()
    subscriber.listenTo(`graphql:hello:userId:${id}`)


}

module.exports = { subscribe: subscribe }