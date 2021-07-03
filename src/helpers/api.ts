class API {
  private url: string;

  constructor() {
    this.url = "https://topspotify.herokuapp.com";
  }

  fetchJSON = async (path: string, options: object) => {
    try {
      const res = await fetch(`${this.url}${path}`, options);
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  };

  getPath = (path: string, options?: object) => {
    const GEToptions = {
      method: "GET",
      ...options,
    };
    return this.fetchJSON(path, GEToptions);
  };

  postPath = (path: string, payload: object, options?: object) => {
    const POSToptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      ...options,
    };
    return this.fetchJSON(path, POSToptions);
  };
}

export default new API();
