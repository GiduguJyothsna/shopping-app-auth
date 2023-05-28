import {Request, Response} from "express";
import CategoryTable from "../../database/schemas/categorySchema";
import {ICategory} from "../../database/models/ICategory";
import mongoose from "mongoose";

/**
 @usage : create a category
 @method : POST
 @body : name
 @url : http://localhost:6000/categories/
 */
export const createCategory = async (request: Request, response: Response) => {
    try {
        const {name} = request.body;
        // check if the name exists
        const category = await CategoryTable.findOne({name: name}); // select * from categories where name = "asdfsf";
        if (category) {
            return response.status(401).json({msg: "Category is already exists!"});
        }
        const newCategory: ICategory = {
            name: name
        };
        const createdObject = await new CategoryTable(newCategory).save(); // INSERT
        if (createdObject) {
            return response.status(201).json(createdObject)
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : to get all categories
 @method : GET
 @body : no-params
 @url : http://localhost:6000/categories
 */
export const getAllCategories = async (request: Request, response: Response) => {
    try {
        const categories: ICategory[] = await CategoryTable.find(); // select * from categories
        return response.status(200).json(categories);
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : to get a category
 @method : GET
 @body : no-params
 @url : http://localhost:6000/categories/:categoryId
 */
export const getCategory = async (request: Request, response: Response) => {
    try {
        const {categoryId} = request.params;
        if (categoryId) {
            const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
            console.log(mongoCategoryId);
            const category = await CategoryTable.findById(mongoCategoryId); // select * from groups where category_id = "";
            if (!category) {
                return response.status(404).json({msg: 'Category is not found'});
            }
            return response.status(200).json(category);
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};