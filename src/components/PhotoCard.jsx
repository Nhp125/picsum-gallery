import React from "react";
import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
  const thumbUrl = `https://picsum.photos/id/${photo.id}/300/200`;

  return (
    <div className="card h-100">
      <Link
        to={`/photos/${photo.id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={thumbUrl}
          className="card-img-top"
          alt={`Photo by ${photo.author}`}
          loading="lazy"
        />
        <div className="card-body">
          <h6 className="card-title mb-1">{photo.author}</h6>
          <p className="card-text small text-muted mb-0">ID: {photo.id}</p>
        </div>
      </Link>
    </div>
  );
}
