import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import { Button, Toast, ToastContainer } from "react-bootstrap";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6172c80a788790b14852d26742f57162&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  const addToFavourites = () => {
    const url = "https://api.themoviedb.org/3/account/19810206/favorite";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTcyYzgwYTc4ODc5MGIxNDg1MmQyNjc0MmY1NzE2MiIsInN1YiI6IjY0N2IyZDY3ZTMyM2YzMDBhN2Q1OTQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UdPXKstl1dXNmoSzSrZjxq3zO8GX4kOiwMmXU0nvBrA",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        favorite: true,
      }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setShow(true);
      })
      .catch((err) => console.error("error:" + err));
  };

  console.log(show);
  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
        <Button variant="danger" onClick={addToFavourites}>
          Add to Favourites
        </Button>
      </div>
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          autohide
          className="d-inline-block m-1"
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Movie has been added to favourite
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Movie;
