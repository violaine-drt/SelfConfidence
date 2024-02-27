const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())


app.listen(port, () => {
        console.log("You are on PORT", port);
}
)

async function citation() {
    let response = await fetch('https://www.affirmations.dev/');
    let citation = await response.json();
    let result = (citation.affirmation);
    return result;
}


//Définir la doc et les endpoints de son API (comment on va utiliser les verbes get, post, put...)
app.get("/", async (req, res) => {
    let result = await citation()
    res.send(result)
})


app.post ("/", async (req, res) => {
    let request = await req.body
    console.log(request)
    res.send(request)
})
