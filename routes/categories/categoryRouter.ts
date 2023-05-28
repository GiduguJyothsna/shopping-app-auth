import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import * as categoryController from "../../controller/categories/categoryController";
import {formValidationMiddleware} from "../../middlewares/formValidationMiddleware";

const categoryRouter:Router = Router();

/**
 @usage : create a category
 @method : POST
 @body : name
 @url : http://localhost:6000/categories/
 */
categoryRouter.post("/", [
    body('name').not().isEmpty().withMessage("Name is Required")
], formValidationMiddleware, async (request:Request, response:Response) => {
    return await categoryController.createCategory(request,response);
})

/**
 @usage : to get all categories
 @method : GET
 @body : no-params
 @url : http://localhost:6000/categories
 */
categoryRouter.get("/", async (request:Request, response:Response) => {
    return await categoryController.getAllCategories(request,response);
})

/**
 @usage : to get a category
 @method : GET
 @body : no-params
 @url : http://localhost:9999/categories/:categoryId
 */
categoryRouter.get("/:categoryId", async (request:Request, response:Response) => {
    return await categoryController.getCategory(request,response);
})

export default categoryRouter;