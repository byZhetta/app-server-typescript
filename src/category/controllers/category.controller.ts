import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()    
    ) {}
    async getCategories(req: Request, res: Response) {
        try {
            const data = await this.categoryService.findAllCategories();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No exist data");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async getCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.categoryService.findCategoryById(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No exist data");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async findCategoryWithProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.categoryService.findCategoryWithProduct(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No exist data");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const data = await this.categoryService.createCategory(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.categoryService.updateCategory(id, req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "There is an error in updating");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.categoryService.deleteCategory(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "There is an error deleting");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
}