const BASE = "https://picsum.photos";

export async function fetchPhotos(page = 1, limit = 20) {
  const url = `${BASE}/v2/list?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch photos: ${res.status}`);
  return res.json();
}

export async function fetchPhotoById(id) {
  const url = `${BASE}/id/${id}/info`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch photo ${id}: ${res.status}`);
  return res.json();
}
