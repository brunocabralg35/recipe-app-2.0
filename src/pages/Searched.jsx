import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Searched() {
  let url = "https://api.spoonacular.com/recipes/complexSearch";

  let params = useParams();

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const [search, setSearch] = useState([]);

  const getSearched= async (name) => {
    const data = await fetch(
      `${url}?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearch(recipes.results);
  };

  return <Grid>
      {search.map((item) => {
          return(
              <Card key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
              </Card>
          )
      })}
  </Grid>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
