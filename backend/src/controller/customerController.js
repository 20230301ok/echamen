import customerModel from "../models/customerModel.js";
const customerController = {};

customerController.getCustomer = async (req, res)=> {
    try {
        const admins = await customerModel.find();
        return res.status(200).json(admins)
    } catch (error) {
        console.log("error" +error);
        return res.status(500).json({message: "Internal server error"})
    }
}

customerController.deleteCustomer = async (req, res) => {
    try {
        const deleteCustomer = customerModel.findByIdAndDelete(req.params.id);
        if(!deleteCustomer){
            return res.status(404).json({message: "Customer no encontrado"})
        }
        return res.status(200).json({message: "Customer eliminado"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internsal server error"})
    }
}

customerController.updateCustomer = async (req, res) => {
    try {
    let {
name,
            email,
            password: passwordHashed,
            isVerified,
            loginAttemps,
            timeOut,
    } = req.body;

        const customerUpdated = await customerModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password: passwordHashed,
            isVerified,
            loginAttemps,
            timeOut,
        }
        ,{new: true}
    );
    if (!customerUpdated) {
        return res.status(404).json({message: "Customer no encontrado"})
    } return res.status(200).json({ message: "Customer no actualizado"})
} catch (error) {
    console.log("error" + error);
    return res.status(500).json({message: "Internl server error"})
}
}
export default customerController;