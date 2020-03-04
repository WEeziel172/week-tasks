
CREATE OR REPLACE function get_user_weekly_tasks_fixit(id INTEGER, week DATE )
  -- This function will return a set of posts from the `post` table. The
  -- `setof` part is important to PostGraphile, check out our Functions article
  -- to learn why.
  returns setof tasks as $$
    -- Write our advanced query as a SQL query!
    SELECT * FROM app_public.tasks
    WHERE date_trunc('week', date) = date_trunc('week', $2)
    AND tasks."userId" = $1;

  $$ language sql stable;

CREATE TRIGGER notify_of_tasks 
    AFTER INSERT ON app_public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION notify_user();


CREATE OR REPLACE function notify_user() 
  RETURNS TRIGGER AS
    $BODY$
      BEGIN
        PERFORM pg_notify(
          'graphql:hello:userId:'||NEW."userId",
          json_build_object(
              '__node__', json_build_array('tasks', NEW.id),
              'subject', NEW.id
            )::text
        );
      RETURN NEW;
      END;
    $BODY$ LANGUAGE plpgsql volatile;

  
  CREATE OR REPLACE type Subscription {
    listen(topic: String!, user: Int!): ListenPayload!
}

CREATE TYPE 