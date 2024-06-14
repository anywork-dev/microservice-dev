export default  {
    $base: "/api/auth",
    login: {
      handler(req, res) {
        // Implement login logic here
        res.send("Login successful");
      },
    },
    register: {
      handler(req, res) {
        // Implement register logic here
        res.send("Registration successful");
      },
    },
    recovery: {
      handler(req, res) {
        // Implement recovery logic here
        res.send("Recovery email sent");
      },
    },
    session: {
      handler(req, res) {
        // Implement session logic here
        res.send("Session valid");
      },
    },
    google: {
      handler(req, res) {
        // Implement Google login logic here
        res.send("Google login successful");
      },
    },
  };
  