import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchPhotos } from "../api/picsum";
import PhotoCard from "../components/PhotoCard";
import Loader from "../components/Loader";

export default function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const limit = 20;

  useEffect(() => {
    loadPage(page);
  }, []);

  const loadPage = async (p) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPhotos(p, limit);

      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          // Gộp + lọc trùng ID
          const merged = [...prev, ...data];

          const unique = merged.filter(
            (photo, index, self) =>
              index === self.findIndex((p) => p.id === photo.id)
          );

          // ⚡ SẮP XẾP THEO ID TĂNG DẦN
          unique.sort((a, b) => Number(a.id) - Number(b.id));

          return unique;
        });

        if (data.length < limit) setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const observer = useRef();
  const sentinelRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => {
              const next = prev + 1;
              loadPage(next);
              return next;
            });
          }
        },
        { rootMargin: "200px" }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <h2 className="mb-3">Photos</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {photos.map((photo) => (
          <div key={photo.id} className="col">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {loading && <Loader />}

      {!hasMore && (
        <div className="text-center text-muted my-3">
          No more photos to load.
        </div>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
