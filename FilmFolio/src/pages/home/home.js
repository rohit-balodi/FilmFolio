import React from "react";
import "./home.css";
import MovieList from "../../components/movieList/movieList";

const Home = (props) => {
  return (
    <>
      <div className="poster">
        <MovieList search={props.search} />
      </div>
    </>
  );
};

export default Home;
