const express = require("express");
const port = process.env.PORT || 5000;
const cors = require('cors');
const app = express();
const fs = require('fs');
const database = require('./bdd/bdd.json')
const jsonDb = {'database':database}

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded;
app.use(cors());

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

//Définitions des méthodes get post pour avoir résultat API extérieure
app.get("/", async (req, res) => {
    let result = await  citation()
    console.log(result)
    res.send(result)

})

app.post ("/", async (req, res) => {
    let request = await req.body
    console.log(request)
    res.send(`Votre requête est bien reçue ${JSON.stringify(request)} `)
})

//Définition des méthodes get post pour avoir résultat dans notre BDD

app.get("/bdd/bdd",  (req, res) => {
  console.log(jsonDb)
  res.status(200).json(jsonDb)})

app.get("/bdd/bdd/:id",  (req, res) => {
    const id = parseInt(req.params.id)
    const blagueDev = database.find(blagueDev => blagueDev.id === id)
    console.log("avant : ceci est blagueDev,",blagueDev)
    console.log("avant id:" ,id)
    res.status(200).json(blagueDev)
    console.log("apres: ceci est blagueDev,",blagueDev)
    console.log("apres id:",id)
    res.send(blagueDev)
  })
 
    
app.post('/bdd/bdd', (req, res) =>{
    const newCitation = req.body.newJoke
    console.log(req)
    console.log(req.body)
    console.log(newCitation)
    database.push({"id" : (database.length + 1), "affirmation" : newCitation})
// Écrire les données mises à jour dans le fichier JSON
fs.writeFile('./bdd/bdd.json', JSON.stringify(database), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l\'écriture dans le fichier JSON');
    } else {
      res.status(200).json(database);
    }
  });
})
    // res.send(`Votre requête est bien reçue ${JSON.stringify(request)})
