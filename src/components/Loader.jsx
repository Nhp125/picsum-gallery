import React from "react";

export default function Loader({ small = false }) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center my-3 ${
        small ? "py-2" : "py-4"
      }`}
    >
      <div className="spinner-border" role="status" aria-hidden="true"></div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
