import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetPokemon} from "../actions/PokemonActions";
import _ from "lodash"

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon)

    React.useEffect(()=>{
        dispatch(GetPokemon(pokemonName))
    },[])

    const showData = () =>{
        if(!_.isEmpty(pokemonState.data[pokemonName])){
            const pokeData = pokemonState.data[pokemonName]
            return(
                <div className={"pokemon-wrapper"}>
                    <div className={"item"}>
                        <h1>Sprites</h1>
                        <img src={pokeData.sprites.front_default} alt={""} />
                        <img src={pokeData.sprites.back_default} alt={""} />
                        <img src={pokeData.sprites.front_shiny} alt={""} />
                        <img src={pokeData.sprites.back_shiny} alt={""} />
                    </div>
                    <div className={"item"}>
                        <h1>Stats</h1>
                        {pokeData.stats.map(ele => {
                            return <p>{ele.stat.name} : {ele.base_stat}</p>
                        })}
                    </div>
                    <div className={"item"}>
                        <h1>Abilities</h1>
                        {pokeData.abilities.map(ele => {
                            return <p>{ele.ability.name}</p>
                        })}
                    </div>
                </div>
            )
        }
        if (pokemonState.loading){
            return <p>Loading...</p>
        }
        if(pokemonState.errorMsg !== ""){
            return <p>{pokemonState.errorMsg}</p>
        }
        return <p>error getting pokemon</p>
    }
    console.log("pokemonName",pokemonName)
    return (
        <div className={"poke"}>
            <h1>{pokemonName}</h1>
            <p>{showData()}</p>
        </div>
    )
}

export default Pokemon
