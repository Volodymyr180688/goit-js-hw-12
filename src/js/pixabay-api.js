import axios from "axios";

export async function fetchImg(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: '43032026-51d5efc66afaddf8a06e125fe',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page,
  });

  const BASE_URL = "https://pixabay.com";
  const ENDPOINT = "/api/";
  const url = `${BASE_URL}${ENDPOINT}?${searchParams}`;

  const {data} = await axios(url);
  return data;
}