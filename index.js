const express = require("express");
const axios = require("axios");
const cors = require("cors");

const CLIENT_ID = "9efb5d7f9d310930b6e5";
const CLIENT_SECRET = "2aa72547ee7b074809c383ddf1ba8fb06c46b45e";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
    axios({
        method: "POST",
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        res.redirect(
            `http://localhost:3000?access_token=${response.data.access_token}`
        );
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
