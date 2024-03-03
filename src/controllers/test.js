require("dotenv").config();

async function httpTest(req, res) {
    console.log("istek geldi")
    res.send("Hello World");
}

module.exports = {
    httpTest
};
