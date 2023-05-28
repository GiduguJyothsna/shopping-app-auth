import mongoose from "mongoose";

export interface IItem {
    name: string;
    user: mongoose.Types.ObjectId;
    imageUrl: string;
    mobile: string;
    price: Number;
    brand: String;
    description: String;
    categoryId: String;
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
