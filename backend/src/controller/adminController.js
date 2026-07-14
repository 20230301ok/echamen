import adminModel from "../models/adminModel.js";
const adminController = {};

adminController.getAdmin = async (req, res)=> {
    try {
        const admins = await adminModel.find();
        return res.status(200).json(admins)
    } catch (error) {
        console.log("error" +error);
        return res.status(500).json({message: "Internal server error"})
    }
}

adminController.deleteAdmin = async (req, res) => {
    try {
        const deleteAdmin = adminModel.findByIdAndDelete(req.params.id);
        if(!deleteAdmin){
            return res.status(404).json({message: "admin no encontrado"})
        }
        return res.status(200).json({message: "Admin eliminado"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internsal server error"})
    }
}

adminController.updateAdmin = async (req, res) => {
    try {
    let {
name,
            email,
            password: passwordHashed,
            isVerified,
            loginAttemps,
            timeOut,
    } = req.body;

        const adminUpdated = await adminModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password: passwordHashed,
            isVerified,
            loginAttemps,
            timeOut,
        }
        ,{new: true}
    );
    if (!adminUpdated) {
        return res.status(404).json({message: "Admin no encontrado"})
    } return res.status(200).json({ message: "Admin no actualizado"})
} catch (error) {
    console.log("error" + error);
    return res.status(500).json({message: "Internl server error"})
}
}
export default adminController;