import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/PokemonActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate"

const PokemonList = (props) => {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  const [search,setSearch] = useState("")
  React.useEffect(() => {
    FetchData(1);
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };
  const ShowData = () => {
    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className={"list-wrapper"}>
          {pokemonList.data.map((el) => (
            <div className={"pokemon-item"}>
              <p>{el.name}</p>
              <Link to={`/pokemon/${el.name}`}>View</Link>
            </div>
          ))}
        </div>
      );
    }

    if (pokemonList.errorMsg !== "") <p>{pokemonList.errorMsg}</p>;

    return <p>Unable TO get Data</p>;
  };
  return(
      <div>
        <div className={"search-wrapper"}>
          <p>Search:</p>
          <input type={"text"} onChange={(e) => setSearch(e.target.value)}/>
          <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
        </div>
        {ShowData()}
        {!_.isEmpty(pokemonList.data) && (
            <ReactPaginate
              pageCount={Math.ceil(pokemonList.count / 15)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange = {(data) => FetchData(data.selected + 1)}
              containerClassName={"pagination"}
            />
        )}
      </div>
  )
};

export default PokemonList;
