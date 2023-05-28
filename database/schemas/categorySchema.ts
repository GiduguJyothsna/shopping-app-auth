import mongoose from "mongoose";
import {IItem} from "../models/IItem";

const categorySchema = new mongoose.Schema<IItem>({
    name: {type: String, required: true, unique: true},
}, {timestamps: true});

const CategoryTable = mongoose.model('categories', categorySchema);
export default CategoryTable;