import React from 'react';
import './MovieCard.scss';

export const MovieCard = ({ movie }) => {
  const {
    title,
    description,
    imgUrl,
    imdbId,
  } = movie;

  return (
    <div className="card" data-cy="MovieCard">
      <div className="card-image">
        <img
          src={imgUrl}
          alt={title}
          data-cy="MovieImage"
        />
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <div className="media-content">
              <p className="title is-4" data-cy="MovieTitle">
                {title}
              </p>
            </div>
          </div>
        </div>

        <div className="content" data-cy="MovieDescription">
          {description}
        </div>

        <a
          href={`https://www.imdb.com/title/${imdbId}/`}
          className="button is-primary"
          data-cy="MovieLink"
        >
          Open IMDB
        </a>
      </div>
    </div>
  );
};