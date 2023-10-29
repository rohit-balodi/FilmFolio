import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import FavCards from "../card/FavCard";

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
    const url =
      "https://api.themoviedb.org/3/account/19810206/favorite/movies?language=en-US&page=1&sort_by=created_at.asc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTcyYzgwYTc4ODc5MGIxNDg1MmQyNjc0MmY1NzE2MiIsInN1YiI6IjY0N2IyZDY3ZTMyM2YzMDBhN2Q1OTQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UdPXKstl1dXNmoSzSrZjxq3zO8GX4kOiwMmXU0nvBrA",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };
  return (
    <div className="movie_list">
      <h2 className="list_title">
        {(type ? type : "Favourites").toUpperCase()}
      </h2>
      <div className="list_cards">
        {movieList.map((movie) => (
          <FavCards movie={movie} getData={getData} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
