
CREATE function get_user_weekly_tasks_fix(id INTEGER)
  -- This function will return a set of posts from the `post` table. The
  -- `setof` part is important to PostGraphile, check out our Functions article
  -- to learn why.
  returns setof tasks as $$
    -- Write our advanced query as a SQL query!
    SELECT * FROM app_public.tasks
    WHERE date_trunc('week',date) = date_trunc('week',CURRENT_TIMESTAMP)
    AND tasks."userId" = $1;

  $$ language sql stable;