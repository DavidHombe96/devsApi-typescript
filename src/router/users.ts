import express from "express";

import { getAllUsers }  from "../controllers/user";
import { isAuthenticated } from "../middlewares";

const router = express.Router();

router.get('/users',isAuthenticated , getAllUsers);



export default router;