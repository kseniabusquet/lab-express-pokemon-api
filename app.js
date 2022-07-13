const express = require("express");
const fs = require("fs")

const PORT = 4000;

const app = express();
app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Importing all the pokemon for our data file
const allPokemon = require("./data");


// -- Define your helper functions & objects here! --

const filterByTypes  = (pokemonList) => {
    const pokemonTypes = []
    pokemonList.filter( (pkmn) => {
        const types = pkmn.types
        if(types.length !== 0){
            types.forEach(element => {
                if(!pokemonTypes.includes(element)){
                    pokemonTypes.push(element)
                }
            });
        }
    } )
    return pokemonTypes
}
const pokemonTypes = filterByTypes(allPokemon)

const getPokemonById = (id) => {
    const pokemonArray = allPokemon.filter( (pkmn) => {
        return id === pkmn.id })
    return pokemonArray[0]
}
const getPokemonByTypes = (type) => {
    let pokemonsByType = []
    pokemonsByType = allPokemon.filter( (pkmn) => {
        return pkmn.types.includes(type)
    } )
    return pokemonsByType
}
const getPokemonByName = (name) => {
    const pokemonArray = allPokemon.filter( (pkmn) => {
        return name === pkmn.name 
    })
    return pokemonArray[0]
}
const getPokemonIndexById = (id) => {
    let index = -1
    allPokemon.forEach( (pokemon, i) => {
        if(pokemon.id === id){
            index = i
            return index
        }
    })
    return index
}


// -- Define your route listeners here! --

// GET /pokemon 
app.get('/pokemon',(req,res,next)=>{
    console.log('in get /')
    res.json(allPokemon)
})

// GET /pokemon/:id 
app.get('/pokemon/:id',(req,res,next)=>{
    const id = parseInt(req.params.id)
    res.json(getPokemonById(id))
})

// GET /search 
app.get('/search/:searchTerm', (req,res,next) => {
    const searchTerm = req.params.searchTerm
    if(searchTerm !== ''){
        if(pokemonTypes.includes(searchTerm)){ // search by type
            res.json(getPokemonByTypes(searchTerm))
        }else{ // search by name
            res.json(getPokemonByName(searchTerm))
        }
    }else{
        console.log('Search term is empty!')
    }
})

// POST /pokemon
app.post('/pokemon',(req, res, next)=>{
    const name = req.body.name
    if(getPokemonByName(name) === undefined){
        const id = allPokemon.length
        const pokemon = req.body
        pokemon.id = id
        allPokemon.push(pokemon)
        res.json({
            suceess: "New pokemon added",
            id: allPokemon.length
        })
    }else{
        res.json({
            Error: "Pokemon already exists"
        })
    }
})

// PUT /pokemon/:id
app.put('/pokemon/:id',(req,res,next)=>{
    const id = parseInt(req.params.id)
    const index = getPokemonIndexById(id)
    if(index !== -1){
        const updatedPokemon = req.body
        updatedPokemon.id = id
        allPokemon[index] = updatedPokemon
        res.json({
            Success: "Pokemon details updated",
        })
    }else{
        res.json({
            Error: "Pokemon does not exist"
        })
    }
    
})

// DELETE /pokemon/:id
app.delete('/pokemon/:id',(req,res,next)=>{
    const id = parseInt(req.params.id)
    const index = getPokemonIndexById(id)
    if(index !== -1){
        allPokemon.splice(index,1)
        res.json({
            Success: "Pokemon deleted"
        })
    }else{
        res.json({
            Error: "Pokemon does not exist"
        })
    }
    
})

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));