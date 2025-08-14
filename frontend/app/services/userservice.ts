interface UserSuccess {
  success: true;
  email: string;
  name: string;
}

interface UserError {
  success: false;
  message: string;
}

export type UserResponse = UserSuccess | UserError;

export const userservice = {
  async isUserExisted() {
    const data = await this.getUserData();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  },
  async loggingOut() {
    try {
      const res = await fetch(`/api/logout/function`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Error in Fetching",
      };
    }
  },
  async getUserData(): Promise<UserResponse> {
    try {
      const res = await fetch(`/api`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        return {
          success: true,
          name: data.name,
          email: data.email,
        };
      }

      return {
        success: false,
        message: data.message || "Unable to fetch user data",
      };
    } catch (err) {
      console.error("Get User Request Failed", err);
      return {
        success: false,
        message: "Network or server error",
      };
    }
  },

  async signUpUser(name: string, email: string, password: string) {
    try {
      const res = await fetch(`api/signup/function`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      // if (data.success) {
      //   localStorage.setItem("token", data.token);
      //   localStorage.setItem("userId", data.userId);
      // }
      return data;
    } catch (err) {
      console.log("Signup Request Failed", err);
      return { success: false, message: "Server internal error" };
    }
  },

  async logInUser(email: string, password: string) {
    try {
      const res = await fetch(`/api/login/function`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      // if (data.success) {
      //   localStorage.setItem("token", data.token);
      //   localStorage.setItem("userId", data.userId);
      // }
      return data;
    } catch (err) {
      console.log("Login Request Failed", err);
      return { success: false, message: "Server internal error" };
    }
  },

  /** Phrases **/
  async getPhrases() {
    try {
      const res = await fetch(`/api/phrases/function`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
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
      await fetch(`/api/phrases/function`, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ text, meaning }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updatePhrases(phrases: { text: string; meaning: string }[]) {
    try {
      await fetch(`/api/phrases/function`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
      const res = await fetch(`/api/phrasalverbs/function`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  async addPhrasal(text: string, meaning: string) {
    try {
      await fetch(`/api/phrasalverbs/function`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, meaning }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updatePhrasals(phrasals: { text: string; meaning: string }[]) {
    try {
      await fetch(`/api/phrasalverbs/function`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
      const res = await fetch(`/api/idioms/function`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },

  async addIdiom(text: string, meaning: string) {
    try {
      await fetch(`/api/idioms/function`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, meaning }),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async updateIdioms(idioms: { text: string; meaning: string }[]) {
    try {
      await fetch(`/api/idioms/function`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idioms }),
      });
    } catch (err) {
      console.log(err);
    }
  },
};
