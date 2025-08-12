export const userservice = {
  userId: "",
  userName: "",
  isLogged: false,
  token: "",
  phrases: [],
  phrasal_verbs: [],
  idioms: [],

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
        // Save token + userId to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        // Update service state
        this.isLogged = true;
        this.userId = data.userId;
        this.token = data.token;
        this.userName = data.userName;
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
        this.token = data.token;
        this.userId = data.userId;
        this.userName = data.userName;
        (this.isLogged = true), localStorage.setItem("token", data.token);
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
      this.isLogged = true;
      this.userId = userId;
      this.token = token;
    }
  },
};
