import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import "./card.css";

const FavCards = ({ movie, getData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const removeFromFav = (id) => {
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
        favorite: false,
      }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setShow(true);
        getData();
      })
      .catch((err) => console.error("error:" + err));
  };

  console.log(show);
  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <div className="cards">
          <img
            className="card_img"
            src={`https://image.tmdb.org/t/p/original${
              movie ? movie.poster_path : ""
            }`}
            alt=""
          />
          <div className="card_overlay">
            <div className="card_title">
              {movie ? movie.original_title : ""}
            </div>
            <div className="card_runtime">
              {movie ? movie.release_date : ""}
              <span className="card_rating">
                {movie ? movie.vote_averate : ""}
                <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="card_description">
              {movie ? movie.overview.slice(0, 118) + "...." : ""}
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                removeFromFav(movie.id);
              }}
            >
              Remove from Favourites
            </Button>
          </div>
        </div>
      )}

      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
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
            Movie has been removed from favourites
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default FavCards;
