import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:2000/graphql',
});

const publicVapidKey = "BDQpiHJQZMB3bA2dM1ojPqUe9sNMM6sfu7Ka-ctmfrxwIFrTCIZbZLWxTJ_qLFP0Q8MfZJclaWX45oS_feMu2ag"

if ('serviceWorker' in navigator) {
    console.log('Registering service worker');

    run().catch(error => console.error(error));
}


ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function run() {
    Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
            register()
        }
    });

    async function register() {
        console.log('Registering service worker');
        const registration = await navigator.serviceWorker.
            register(`${process.env.PUBLIC_URL}/notificationsWorker.js`, { scope: '/localhost' }).then((result) => {
                return result
            });

        console.log('Registered service worker');

        console.log('Registering push');

        const subscription = await registration.pushManager.
            subscribe({
                userVisibleOnly: true,
                // The `urlBase64ToUint8Array()` function is the same as in
                // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
        console.log('Registered push');

        console.log('Sending push');
        await fetch('http://localhost:2000/subscribe', {
            method: 'POST',
            body: JSON.stringify({ subscription: subscription, id: 1 }),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log('Sent push');
    }

}