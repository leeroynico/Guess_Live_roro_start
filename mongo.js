const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  //créer une entrée dans la base de données
  const createGuess = async (client, guess) => {
    const result = await client
      .db("guessTime")
      .collection("guess")
      .insertOne(guess);
    console.log(`nouveau pari entré ${result.insertedId}`);
  };

  //se connecter à la base de données
  try {
    await client.connect();
    await sortByDate(client);
    await sortByDateAgain(client);
    // await createGuess(client, {
    //   name: "John",
    //   time: new Date(guessTimeTimeStamp),
    // });
    //await readGuess(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();

let timeTofind = "14:20:00";
//trier par date
async function sortByDate(client) {
  const result = await client
    .db("guessTime")
    .collection("guess")
    .find({ time: { $gte: new Date(`2021-11-15T${timeTofind}.000+00:00`) } })
    .sort({ time: 1 })
    .limit(2)
    .toArray();
  console.log(`résultat du tri par date 1 : `, result);
}
async function sortByDateAgain(client) {
  const result = await client
    .db("guessTime")
    .collection("guess")
    .find({ time: { $lte: new Date(`2021-11-15T${timeTofind}.000+00:00`) } })
    .sort({ time: -1 })
    .limit(2)
    .toArray();
  console.log(`résultat du tri par date 2 : `, result);
}
let guessTime = `2021-11-15T15:01:00`;
let guessTimeTimeStamp = new Date(guessTime).getTime();

//lire une entrée dans la base de données
const readGuess = async (client) => {
  const result = await client
    .db("guessTime")
    .collection("guess")
    .findOne({ name: "John" });
  if (result) {
    console.log(result);
  } else {
    console.log("pas de resultat");
  }
};
