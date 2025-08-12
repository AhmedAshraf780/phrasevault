type userdata = {
  name: string;
  email: string;
};
export const userservice = {
  // userId: "",
  // userName: "",
  // isLogged: false,
  // token: "",
  // phrases: [] as { phrase: string; description: string }[],
  // phrasal_verbs: [] as { phrase: string; description: string }[],
  // idioms: [] as { phrase: string; description: string }[],

  tokenExists() {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  },

  async getUserData() {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch("http://localhost:3002/", {
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
      const res = await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        // this.isLogged = true;
        // this.userId = data.userId;
        // this.token = data.token;
        // this.userName = data.userName;
      }

      return data;
    } catch (err) {
      console.log("Signup Request Failed", err);
      return { success: false, message: "Server internal error" };
    }
  },

  async logInUser(email: string, password: string) {
    try {
      const res = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        // this.token = data.token;
        // this.userId = data.userId;
        // this.userName = data.userName;
        // this.isLogged = true;

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
      // this.isLogged = true;
      // this.userId = userId;
      // this.token = token;
    }
  },

  /** ====== Local State Methods ====== **/

  /**
   *
   *  Phrases Methods
   */
  async getPhrases() {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch("http://localhost:3002/phrases", {
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
      const res = await fetch("http://localhost:3002/phrases", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          meaning,
        }),
      });
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  async updatePhrases(phrases: { text: string; meaning: string }[]) {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch("http://localhost:3002/phrases", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phrases,
        }),
      });

      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  /**
   *    Phrasal Verbs Methods
   */
  async getPhrasals() {
    try {
      const token = localStorage.getItem("token") || "";

      const res = await fetch("http://localhost:3002/phrasals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  async addPhrasal(text: string, meaning: string) {
    try {
      const token = localStorage.getItem("token") || "";

      const res = await fetch("http://localhost:3002/phrasals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          meaning,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updatePhrasals(phrasals: { text: string; meaning: string }[]) {
    try {
      const token = localStorage.getItem("token") || "";

      const res = await fetch("http://localhost:3002/phrasals", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phrasals,
        }),
      });
      const data = await res.json(); // we do nothing with data so far
    } catch (err) {
      console.log(err);
    }
  },

  /**
   *    Idioms Methods
   */
  async getIdioms() {
    try {
      const token = localStorage.getItem("token") || "";

      const res = await fetch("http://localhost:3002/idioms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  async addIdiom(text: string, meaning: string) {
    try {
      const token = localStorage.getItem("token") || "";

      const res = await fetch("http://localhost:3002/idioms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          meaning,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updateIdioms(idioms: { text: string; meaning: string }[]) {
    try {
      const token = localStorage.getItem("token") || "";

      const res = await fetch("http://localhost:3002/idioms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idioms,
        }),
      });
      const data = await res.json(); // we do nothing with data so far
    } catch (err) {
      console.log(err);
    }
  },
};
