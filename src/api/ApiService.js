import axios from "axios";

async function getUrlOnBackend(url, params = {}, token) {
  const req = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    url,
    params,
  };

  try {
    const response = await axios(req);
    return response.data;
  } catch (err) {}
}
async function postDataToBackend(url, data, token) {
  const req = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    url,
    data,
  };
  console.log(url, data);
  try {
    const response = await axios(req);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function deleteDataToBackend(url, token) {
  const req = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    url,
  };
  // console.log(url, token);
  try {
    const response = await axios(req);
  } catch (err) {
    console.log(err);
  }
}

async function putUrlOnBackend(url, data, token) {
  const req = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    url,
    data,
  };

  console.log(url, data);
  try {
    const response = await axios(req);
    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export {
  getUrlOnBackend,
  postDataToBackend,
  putUrlOnBackend,
  deleteDataToBackend,
};
