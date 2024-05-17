import express from "express"
import { login, register } from "../controllers/auth.controller";
const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/check', function (params) {})

module.exports = router;
