import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbParams = await database.query(
    "SELECT version() as version, current_setting('max_connections') as max;",
  );
  const dbParamsActive = await database.query(
    "SELECT p.pid, p.usename, p.state, count(*) as active FROM pg_stat_activity AS p WHERE p.state = 'active' GROUP BY 1,2,3;",
  );
  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: dbParams.rows[0].version,
    max_connections: dbParams.rows[0].max,
    active_connections: dbParamsActive.rows[0].active,
  });
}

export default status;
