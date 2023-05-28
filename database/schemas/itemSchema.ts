import mongoose from "mongoose";
import {IItem} from "../models/IItem";

const itemSchema = new mongoose.Schema<IItem>({
    name: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    imageUrl: {type: String, required: true},
    mobile: {type: String, required: true, unique: true},
    price: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    categoryId: {type: String, required: true},
}, {timestamps: true});

const ItemTable = mongoose.model('items', itemSchema);
export default ItemTable;