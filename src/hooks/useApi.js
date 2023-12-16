const useAPI = () => {
  const headers = {
    "Content-Type": "application/json",
  }
  const baseUrl = import.meta.env.VITE_API_URL;

  const postAPI = async (url, data) => {
    return await fetch(baseUrl + url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
  }

  const putAPI = async (url, data, id) => {
    return await fetch(`${baseUrl}${url}/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
  }

  const deleteAPI = async (url, id) => {
    return await fetch(`${baseUrl}${url}/${id}`, {
      method: "DELETE",
    })
  }

  const getAPI = async (url) => {
    return await fetch(baseUrl + url)
      .then((response) => response.json())
  }

  return { postAPI, getAPI, putAPI, deleteAPI };
};

export default useAPI;