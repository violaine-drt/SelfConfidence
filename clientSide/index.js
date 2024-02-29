async function getJoke(){
    let response1 = await fetch('http://localhost:5000/bdd/bdd');
    let databaseJSON = await response1.json();
    // console.log("database:",databaseJSON);
    let databaseArray = databaseJSON.database;
    // console.log(databaseArray);
    let randomId = Math.floor(Math.random()*databaseArray.length);
    // console.log("id de récupération",randomId);

    let response2 = await fetch(`http://localhost:5000/bdd/bdd/${randomId}`);
    let joke = await response2.json();
    // console.log("joke:",joke);
    let result = (joke.affirmation);
    // console.log("le résultat:",result);
    let displayJoke = document.getElementById("displayJoke");
    displayJoke.textContent = result.toString();
}

async function getCitation(){
    let response = await fetch('http://localhost:5000/citation');
    let result = await response.json();
    let affirmation = result.affirmation;
    // console.log(affirmation)
    let displayCitation = document.getElementById("displayCitation");
    displayCitation.textContent = affirmation.toString();

}