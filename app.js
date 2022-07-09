const express = require("express");

const PORT = 4000;

const allPokemon = require("./data");

const app = express();
app.use(express.json())


// -- Define your route listeners here! --

app.get('/pokemon', (req, res) => {
    console.log(req)
    res.send(allPokemon)
})

app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params
    res.send(allPokemon[id])
})


app.get('/search', (req, res) => {
    const pokemonName = req.query["name"]
    const pokemonType = req.query["type"]

    const foundPokemon = allPokemon.find(pokemon => pokemon.name === pokemonName)
    let pokemonArray = []

    allPokemon.map(pokemon => {
        if (pokemon.types.includes(pokemonType)) {
            pokemonArray.push(poke)
            return pokemonArray
        }
    })

    if (pokemonName === undefined) {
        res.send(pokemonArray)
    } else if (pokemonType === undefined) {
        res.send(foundPokemon)
    }
})

app.post('/pokemon', (req, res) => {
    let body = req.body
    allPokemon.push(body)
    res.send(body)
})

app.put('/pokemon/:id', (req, res) => {
    const { id } = req.params
    let body = req.body
    res.send(allPokemon[id] = body)
})

app.delete('/pokemon/:id', (req, res) => {
    const { id } = req.params
    res.send(allPokemon[id])
})

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));