import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPhotoById } from "../api/picsum";
import Loader from "../components/Loader";

export default function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPhotoById(id);
        if (mounted) setPhoto(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!photo)
    return <div className="alert alert-warning">Photo not found.</div>;

  const fullUrl =
    photo.download_url || `https://picsum.photos/id/${id}/800/600`;
  const title = photo.author ? `Photo by ${photo.author}` : `Photo #${id}`;
  const description = photo.description || "No description available.";

  return (
    <div>
      <Link to="/photos" className="btn btn-link mb-3">
        ← Back to photos
      </Link>

      <div className="card">
        {/* ẢNH ĐÃ SỬA: luôn fit màn hình, không bị cắt */}
        <img
          src={fullUrl}
          className="card-img-top max-w-full h-auto object-contain"
          alt={title}
          style={{ maxHeight: "90vh" }}
        />

        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p>
            <strong>Author:</strong> {photo.author}
          </p>
          <p className="text-muted">{description}</p>

          <dl className="row">
            <dt className="col-sm-3">ID</dt>
            <dd className="col-sm-9">{photo.id}</dd>

            <dt className="col-sm-3">Size</dt>
            <dd className="col-sm-9">
              {photo.width} × {photo.height}
            </dd>

            <dt className="col-sm-3">URL</dt>
            <dd className="col-sm-9">
              <a href={photo.url} target="_blank" rel="noreferrer">
                Original
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
