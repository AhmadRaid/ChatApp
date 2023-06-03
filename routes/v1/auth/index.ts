import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import * as controller from "../../../app/controller/Auth";

const router: Router = express.Router();


router.post("/Signup", controller.signUp);

router.post("/login", controller.login);

export default router;
