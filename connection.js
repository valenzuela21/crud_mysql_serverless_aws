const mysql = require('mysql');
const configDB = {
    host: 'database-curso-db.cdy3ggwtst1p.us-east-1.rds.amazonaws.com',
    user: 'curso_db',
    password: 'secret12',
    port: '3306',
    database: 'curso_db',
    debug: true
}

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    const connection = mysql.createConnection(config);
    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}

const connection = initializeConnection(configDB);

module.exports = connection;