const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");

const getTopic = (args, context, _resolveInfo) => {
    console.log(args)
    if (args) {
        const con = `graphql:${args.topic}:userId:${args.userId}`
        console.log(con)
        return con

    }
    else {
        return `graphql:hello:userId:2`
    }
};
module.exports = makeExtendSchemaPlugin(({ pgSql: sql }) => ({
    typeDefs: gql`
    type UserSubscriptionPayload {
      # This is populated by our resolver below

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      event: Task
    }

    extend type Subscription {
      """
      Triggered when the current user's data changes:

      - direct modifications to the user
      - when their organization membership changes
      """
      currentUserUpdated(topic: String!, userId: Int!): UserSubscriptionPayload @pgSubscription(topic: ${embed(
        getTopic
    )})
    }
  `,

    resolvers: {
        UserSubscriptionPayload: {
            // This method finds the user from the database based on the event
            // published by PostgreSQL.
            //
            // In a future release, we hope to enable you to replace this entire
            // method with a small schema directive above, should you so desire. It's
            // mostly boilerplate.

        },
    },
}));