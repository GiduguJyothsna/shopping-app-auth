import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import * as itemController from "../../controller/items/itemController";
import {formValidationMiddleware} from "../../middlewares/formValidationMiddleware";
import {authMiddleware} from "../../middlewares/authMiddleware";

const itemRouter: Router = Router();

/**
 @usage : create a item
 @method : POST
 @body : name, imageUrl, mobile, price, brand, description, categoryId
 @access : PRIVATE
 @url : http://localhost:6000/items/
 */
itemRouter.post("/", [
    body('name').not().isEmpty().withMessage("Name is Required"),
    body('imageUrl').not().isEmpty().withMessage("ImageUrl is Required"),
    body('mobile').not().isEmpty().withMessage("Mobile is Required"),
    body('price').not().isEmpty().withMessage("Price is Required"),
    body('brand').not().isEmpty().withMessage("Brand is Required"),
    body('description').not().isEmpty().withMessage("Description is Required"),
    body('categoryId').not().isEmpty().withMessage("CategoryId is Required"),
], formValidationMiddleware, authMiddleware, async (request: Request, response: Response) => {
    return await itemController.createItem(request, response);
})

/**
 @usage : to get all items
 @method : GET
 @body : no-params
 @access : PRIVATE
 @url : http://localhost:6000/items
 */
itemRouter.get("/", authMiddleware, async (request: Request, response: Response) => {
    return await itemController.getAllItems(request, response);
})

/**
 @usage : get a item
 @method : GET
 @body : no-params
 @access : PRIVATE
 @url : http://localhost:6000/items/:itemId
 */
itemRouter.get("/:itemId", authMiddleware, async (request: Request, response: Response) => {
    return await itemController.getItem(request, response);
})

/**
 @usage : update a item
 @method : PUT
 @access : PRIVATE
 @body : name, imageUrl, mobile, price, brand, description, categoryId
 @url : http://localhost:6000/items/:itemId
 */
itemRouter.put("/:itemId", [
    body('name').not().isEmpty().withMessage("Name is Required"),
    body('imageUrl').not().isEmpty().withMessage("ImageUrl is Required"),
    body('mobile').not().isEmpty().withMessage("Mobile is Required"),
    body('price').not().isEmpty().withMessage("Price is Required"),
    body('brand').not().isEmpty().withMessage("Brand is Required"),
    body('description').not().isEmpty().withMessage("Description is Required"),
    body('categoryId').not().isEmpty().withMessage("CategoryId is Required"),
], formValidationMiddleware, authMiddleware, async (request: Request, response: Response) => {
    return await itemController.updateItem(request, response);
})


/**
 @usage : delete a item
 @method : DELETE
 @access : PRIVATE
 @body : no-params
 @url : http://localhost:6000/items/:itemId
 */
itemRouter.delete("/:itemId", authMiddleware, async (request: Request, response: Response) => {
    return await itemController.deleteItem(request, response);
})

export default itemRouter;