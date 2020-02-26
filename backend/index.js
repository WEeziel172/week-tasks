const http = require("http");
const express = require("express");
const { postgraphile, makePluginHook } = require("postgraphile");
const { default: PgPubsub } = require("@graphile/pg-pubsub");
const MySubscriptionPlugin = require("./plugins/mySubscription"); // our plugin defined in previous step

const user = "postgres";
const pass = "1234";
const port = "5432";
const dbName = "postgres";
const host = "localhost";
const schema = "demo_schema"


// Declare a constant for the Express app instance
const app = express();

const pluginHook = makePluginHook([PgPubsub]);

const dbUrl = `postgres://${user}:${pass}@${host}:${port}/${dbName}`;
console.log("\nPostgres origin URL for connection:\n", dbUrl);

app.use(
    postgraphile(dbUrl, ["app_public"], {
        pluginHook,
        appendPlugins: [MySubscriptionPlugin],
        exportGqlSchemaPath: "schema.graphql",
        legacyRelations: "omit",
        enableQueryBatching: true,
        disableDefaultMutations: false,
        subscriptions: true, // Enable PostGraphile websocket capabilities
        simpleSubscriptions: true, // Add the `listen` subscription field
        ignoreRBAC: false, // Role Based Access Control (RBAC)
        extendedErrors: ["errcode", "detail", "hint"],
        graphiql: true,
        watchPg: true,
        enhanceGraphiql: true,
        dynamicJson: true,
        enableCors: true,
    })
);

// Use Express to listen on a port
var server = app.listen(process.env.PORT || 2000, function () {
    console.log("postgraphile API running on port:", server.address().port);
});