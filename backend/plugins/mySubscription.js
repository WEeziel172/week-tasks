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
        query: Query
        relatedNode: Node
        relatedNodeId: ID
        task: Task
        event: String
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
            async user(
                event,
                _args,
                _context,
                { graphile: { selectGraphQLResultFromTable } }
            ) {
                const rows = await selectGraphQLResultFromTable(
                    sql.fragment`app_public.tasks`,
                    (tableAlias, sqlBuilder) => {
                        console.log(event, _args)
                        sqlBuilder.where(
                            sql.fragment`${tableAlias}.id = ${sql.value(event.subject)}`
                        );
                    }
                );
                return rows[0];
            },
        },
    },
}));