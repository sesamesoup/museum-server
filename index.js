const http = require("http");
const { parse } = require("url");
const mysql = require("mysql");

// "proxy": "http://localhost:4000",

// const pool = mysql.createPool({
//   host: "cosc3380-museum.mysql.database.azure.com",
//   user: "cosc3380",
//   password: "museumDB3380",
//   database: "museum",
// });

const pool = mysql.createPool({
    host: "mysql-museum.mysql.database.azure.com",
    user: "admin01",
    password: "bananafish1!",
    database: "museum",
    port: "3306"
  });

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.USER,
//     password: process.env.DB,
//     database: "museum",
//     dateStrings: true,
//   });

const server = http.createServer((req, res) => {
    // Handle Cors Function To Allow Axios
    handleCors(req, res);

    if (req.url == "/about"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>about page</title></head><body><h1>test!</h1></body></html>');
        res.end();
    }
    else if (req.method === "GET") {
        if (req.url === "/") {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html><head><title>Hello, World!</title></head><body><h1>Hello, World!</h1></body></html>');
            res.end();
        }

        else if (req.url === "/gift-items") {
            pool.query(
                "SELECT * FROM gift-items",
                (error, result) => {
                    if (error) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: error }));
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(result));
                    }
                }
            );
        
        // Get All Items From Available
        } 

        else if (req.url === "/users") {
            pool.query(
                "SELECT * FROM users",
                (error, result) => {
                    if (error) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: error }));
                    } else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(result));
                    }
                }
            );
        
        } 

    } 
});

// Handle Cors Function To Allow Axios
const handleCors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
};

// Set Up Server To Listen For Requests From Port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});