
import mongoose, {Schema, model} from "mongoose";

const boletosSchema = new Schema({
               customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "customer"
            },
            quantity: {type:Number},
            purchaseDate: {type:Date},
            total: {type: String},
            paymentStatus: {type:Boolean},
            transactionId: {type:String},
},{
    timestamps: true,
    strict: false
})

export default model ("Boleto", boletosSchema)