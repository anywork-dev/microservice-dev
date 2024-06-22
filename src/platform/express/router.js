import AuthRoutes from "auth-routes"
import { Router } from "express"

const router = Router();

router.use(AuthRoutes.register(router))

export default router;