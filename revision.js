 const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Hello Page");
    }

    else if (req.url === "/about") {
        res.end("Hello About Page");
    }

    else if (req.url === "/students") {
        res.end("Hello Students Page");
    }

});

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});