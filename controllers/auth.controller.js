import authService from "../services/auth.service"

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}


export async function register(req, res, next) {
    try {
      const { email, password } = req.body;
      await authService.register(email, password);
      res.json({ message: 'Registration successful' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }