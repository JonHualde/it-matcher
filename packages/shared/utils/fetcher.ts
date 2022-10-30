export default function fetcher(url: string, data = undefined, getFile: boolean = false) {
    return fetch(`${window.location.origin}/api${url}`, {
      method: data ? "POST" : "GET",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status > 399 || res.status < 200) {
        const response = await res.json();
        throw {
          error: true,
          status: res.status,
          message: response.errorMessage
        }
      }

      return getFile ? res.blob() : res.json();
    });
  }
  