import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );

  const databaseOpenedConnectionsResult = await database.query(
    "SELECT p.pid, p.usename, p.state, count(*) as active FROM pg_stat_activity AS p WHERE p.state = 'active' AND datname = 'local_db' GROUP BY 1,2,3;",
  );
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const maxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].active;
  // *Abordagem do Felipe Deschamps
  // const databaseOpenedConnectionsResult = await database.query(
  //   "SELECT * FROM pg_stat_activity",
  // );
  // const databaseOpenedConnectionsValue =
  //   databaseCurrentConnectionsResult.rows.length;
  console.log(databaseOpenedConnectionsResult.rows);
  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: databaseVersionValue,
    max_connections: parseInt(maxConnectionsValue),
    opened_connections: parseInt(databaseOpenedConnectionsValue),
  });
}

export default status;
