import boletoModel from "../models/boletosModel.js"

const boletoController = {};

boletoController.getBoleto = async (req, res) => {
    try {
        const boleto = await boletoModel.find();
        return res.status(200).json(boleto)
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({messsage: "Internal server error"})
    }
}

boletoController.deleteBoleto = async (req, res) => {
    try {
        const deleteBoleto = boletoModel.findByIdAndDelete(req.params.id);
        if(!deletedBoleto){
            return res.status(404).json({message: "Boleto no encontrado"})
        }
        return res.status(200).json({message: "Boleto eliminado"})
    } catch (error){
        console.log("error" + error);
        return res.status(400).json({message: "Internal server error"})
    }
}

boletoController.updateBoleto =async (req, res) => {
    try {
        let {
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        } = req.body;
        const boletoUpdated = await boletoModel.findByIdAndUpdate(req.params.id, {
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        }, {new: true}
    );
    if (!boletoUpdated){
        return res.status(200).json({message: "Bpoleto no encontrado"}) };
} catch (error){
    console.log("error" + error);
    return res.status(500).json({message: "Internal server error"})
}

}

boletoController.insertBoleto = async (req, res) => {
    const {
          customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
    } = req.body;

    const newBoleto = boletoModel({
             customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
    })
    await newBoleto.save();
    return res.status(200).json({message: "Boleto insertado"})
}

export default boletoController;