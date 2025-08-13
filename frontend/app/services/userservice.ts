type userdata = {
  name: string;
  email: string;
};

const BASE_URL = "/api";

export const userservice = {
  tokenExists() {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  },

  async getUserData() {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${BASE_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return { name: data.name, email: data.email };
    } catch (err) {
      console.log("Get User Request Failed", err);
    }
  },

  async signUpUser(name: string, email: string, password: string) {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
      }
      return data;
    } catch (err) {
      console.log("Signup Request Failed", err);
      return { success: false, message: "Server internal error" };
    }
  },

  async logInUser(email: string, password: string) {
    try {
      alert("um in loginuser");
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
      }
      return data;
    } catch (err) {
      console.log("Login Request Failed", err);
      return { success: false, message: "Server internal error" };
    }
  },

  loadUserFromStorage() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
    }
  },

  /** Phrases **/
  async getPhrases() {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${BASE_URL}/phrases`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data.phrases;
    } catch (err) {
      console.log("Get phrases Request Failed", err);
      return { success: false, message: "Server internal error" };
    }
  },

  async addPhrase(text: string, meaning: string) {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/phrases`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, meaning }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updatePhrases(phrases: { text: string; meaning: string }[]) {
    try {
      const token = localStorage.getItem("token") || "";
      await fetch(`${BASE_URL}/phrases`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phrases }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  /** Phrasal Verbs **/
  async getPhrasals() {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${BASE_URL}/phrasals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  async addPhrasal(text: string, meaning: string) {
    try {
      const token = localStorage.getItem("token") || "";
      await fetch(`${BASE_URL}/phrasals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, meaning }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updatePhrasals(phrasals: { text: string; meaning: string }[]) {
    try {
      const token = localStorage.getItem("token") || "";
      await fetch(`${BASE_URL}/phrasals`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phrasals }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  /** Idioms **/
  async getIdioms() {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${BASE_URL}/idioms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  async addIdiom(text: string, meaning: string) {
    try {
      const token = localStorage.getItem("token") || "";
      await fetch(`${BASE_URL}/idioms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, meaning }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updateIdioms(idioms: { text: string; meaning: string }[]) {
    try {
      const token = localStorage.getItem("token") || "";
      await fetch(`${BASE_URL}/idioms`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idioms }),
      });
    } catch (err) {
      console.log(err);
    }
  },
};
