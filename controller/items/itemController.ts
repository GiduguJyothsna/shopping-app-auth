import {Request, Response} from "express";
import ItemTable from "../../database/schemas/itemSchema";
import {IItem as IItem} from "../../database/models/IItem";
import mongoose from "mongoose";
import {getAuthUserInfoFromRequestHeader} from "../../util/UserUtil";

/**
 @usage : create a item
 @method : POST
 @access : PRIVATE
 @body : name, imageUrl, mobile, price, brand, description, categoryId
 @url : http://localhost:9000/items/
 */
export async function createItem(request: Request, response: Response) {
    try {
        const user = await getAuthUserInfoFromRequestHeader(request, response);
        if (user) {
            const mongoUserId = new mongoose.Types.ObjectId(user._id);
            const { name, imageUrl, mobile, price, brand, description, categoryId } = request.body;
            // check if the mobile number is exists
            const item = await ItemTable.findOne({ mobile: mobile });
            if (item) {
                return response.status(401).json({ msg: "Contact is exist with the mobile number" });
            }
            const newItem: IItem = {
                name: name,
                user: mongoUserId,
                imageUrl: imageUrl,
                mobile: mobile,
                price: price,
                brand: brand,
                description: description,
                categoryId: categoryId
            };
            const createdItem = await new ItemTable(newItem).save(); // INSERT
            if (createdItem) {
                return response.status(201).json(createdItem);
            }
        }
    }catch (error: any) {
        return response.status(500).json({ errors: [error.message] });
    }
}

/**
 @usage : to get all items
 @method : GET
 @body : no-params
 @access : PRIVATE
 @url : http://localhost:6000/items
 */
export const getAllItems = async (request: Request, response: Response) => {
    try {
        const user = await getAuthUserInfoFromRequestHeader(request, response);
        if (user) {
            const mongoUserId = new mongoose.Types.ObjectId(user._id);
            const items: IItem[] = await ItemTable.find({user: mongoUserId}).sort({createdAt: "desc"});
            return response.status(200).json(items);
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : get a item
 @method : GET
 @body : no-params
 @access : PRIVATE
 @url : http://localhost:6000/items/:itemId
 */
export const getItem = async (request: Request, response: Response) => {
    try {
        const user = await getAuthUserInfoFromRequestHeader(request, response);
        if (user) {
            const {itemId: itemId} = request.params;
            if (itemId) {
                const mongoItemId = new mongoose.Types.ObjectId(itemId);
                const mongoUserId = new mongoose.Types.ObjectId(user._id);
                const item = await ItemTable.findOne({_id: mongoItemId, user: mongoUserId});
                if (!item) {
                    return response.status(404).json({msg: "The Item is not found!"});
                }
                return response.status(200).json(item);
            }
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : update a item
 @method : PUT
 @access : PRIVATE
 @body : name, imageUrl, mobile, price, brand, description, categoryId
 @url : http://localhost:6000/items/:itemId
 */
export const updateItem = async (request: Request, response: Response) => {
    try {
        const user = await getAuthUserInfoFromRequestHeader(request, response);
        if (user) {
            const { name, imageUrl, mobile, price, brand, description, categoryId } = request.body;
            const {itemId: itemId} = request.params;
            if (itemId) {
                const mongoItemId = new mongoose.Types.ObjectId(itemId);
                const mongoUserId = new mongoose.Types.ObjectId(user._id);
                // check if the contact is exists
                const item = await ItemTable.findOne({_id: mongoItemId, user: mongoUserId});
                if (!item) {
                    return response.status(404).json({msg: "Item is not found to update"});
                }
                const newItem: IItem = {
                    name: name,
                    user: mongoUserId,
                    imageUrl: imageUrl,
                    mobile: mobile,
                    price: price,
                    brand: brand,
                    description: description,
                    categoryId: categoryId
                };
                const updatedItem = await ItemTable.findByIdAndUpdate(mongoItemId, {
                    $set: newItem
                }, {new: true});
                if (updatedItem) {
                    return response.status(200).json(updatedItem);
                }
            }
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};

/**
 @usage : delete a item
 @method : DELETE
 @body : no-params
 @access : PRIVATE
 @url : http://localhost:6000/items/:itemId
 */
export const deleteItem = async (request: Request, response: Response) => {
    try {
        const user = await getAuthUserInfoFromRequestHeader(request, response);
        if (user) {
            const {itemId: itemId} = request.params;
            if (itemId) {
                const mongoItemId = new mongoose.Types.ObjectId(itemId);
                const mongoUserId = new mongoose.Types.ObjectId(user._id);
                const item = await ItemTable.findOne({_id: mongoItemId, user: mongoUserId});
                if (!item) {
                    return response.status(404).json({msg: "The Contact is not found!"});
                }
                // delete the item
                const deletedItem = await ItemTable.findByIdAndDelete(mongoItemId);
                if (deletedItem) {
                    return response.status(200).json({});
                }
            }
        }
    } catch (error: any) {
        return response.status(500).json({errors: [error.message]});
    }
};