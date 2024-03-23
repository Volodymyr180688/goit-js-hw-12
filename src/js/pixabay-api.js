import {searchImgs } from '../main';

export function fetchImg() {
  const searchParams = new URLSearchParams({
    key: '43032026-51d5efc66afaddf8a06e125fe',
    q: searchImgs,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

    const BASE_URL = "https://pixabay.com";
    const ENDPOINT = "/api/";
  const url = `${BASE_URL}${ENDPOINT}?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}