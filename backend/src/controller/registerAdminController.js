import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import adminModel from "../models/adminModel.js";

import { config } from "../../config.js";
import { register } from "module";
import { trusted } from "mongoose";

const registerAdminController = {};


registerAdminController.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut,
        } = req.body;

        const existstAdmin = await adminModel.findOne({email});
        if(existstAdmin){
            return res.status(400).json({message: "Admin already exists"});
        }
        const passwordHashed = await bcryptjs.hash(password, 10);
        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {
                randomCode,
                name,
            email,
            password: passwordHashed,
            isVerified,
            loginAttemps,
            timeOut,
            },
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("registrationCookie", token, {maxAage: 15*60*1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificacion de cuenta", 
            text: "Parav erificr tu cuenta utiliza este codigo" + randomCode + "expira en 15 minutos"
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error){
                console.log ("error"+error);
                return res.status(500).json({message: "Error sending email"});
            }
            return res.status(200).json({message: "Email sent"});
        });
    } catch (error){
        console.log ("error"+error);
        return res.status(500).json({message: "internal server error"});
    }
};
registerAdminController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;
        const token = req.cookies.registrationCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomCode: storedCode,
            name,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut,
        } = decoded;

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({message: "invalid code"});
        }
        const newCustomer = adminModel({
            name,
            email,
            password,
            isVerified: true,
        });
        await newCustomer.save();
        res.clearCookie("registrationCookie");

        return res.status(300).json({message: "Admin registered"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};
export default registerAdminController;
