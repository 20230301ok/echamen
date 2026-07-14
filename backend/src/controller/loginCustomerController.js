import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config.js";
import customerModel from "../models/customerModel.js";

const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
    try {
        const { email, password} = req.body;

        const customerFound = await customerModel.findOne({email});

        if(!customerFound){
            return res.status(400).json({message: "Customer not found"});
        }
        if (customerFound.timeOut&&customerFound.timeOut > Date.now()){
            return res.status(403).json({message: "Blocked account"});
        }

        const isMatch = await bcrypt.compare(password, customerFound.password);

        if(!isMatch){
            customerFound.loginAttemps=(customerFound.loginAttemps || 0 ) + 1;

            if (customerFound.loginAttemps >= 5) {
                customerFound.timeOut = Date.now() + 5 * 60 * 1000;
                customerFound.loginAttemps = 0;

                await customerFound.save();
                return res
                .status (403)
                .json({ message: "Blocked account for too many attempts"});
            }
            await customerFound.save();
            return res.status(401).json({message: "Wrong password"});
        }

        customerFound.loginAttemps = 0;
        customerFound.timeOut = null;

        const token = jsonwebtoken.sign(
            {id: customerFound._id, userType: "Customer"},
            config.JWT.secret,
            {expiresIn: "30d"},
        );
        res.cookie("authCookie", token, {maxAge: 30 * 24 *60 *60 *1000});

        return res.status(200).json({message: "Login succesfully"});
    } catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default loginCustomerController;