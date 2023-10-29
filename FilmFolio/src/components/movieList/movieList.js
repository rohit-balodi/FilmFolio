import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  useEffect(() => {
    const movies = [...movieList];
    if (props.search !== undefined && props.search.length > 1) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(props.search.toLowerCase())
      );
      console.log(filteredMovies);
      setMovieList(filteredMovies);
    } else {
      getData();
    }
  }, [props.search]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=6172c80a788790b14852d26742f57162&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
      });
  };

  console.log(props);

  return (
    <div className="movie_list">
      <h2 className="list_title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list_cards">
        {movieList.map((movie) => (
          <Cards movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
