import { ProductModel } from "../models/product.model.js";

class ProductManagerMongo {
  async getProductsPaginated({ limit = 9, page = 1, sort, query }) {
    const filter = {};

    if (query) {
      if (query === 'true' || query === 'false') {
        filter.status = query === 'true';
      } else {
        filter.category = query;
      }
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    };

    const result = await ProductModel.paginate(filter, options);

    return {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/products?limit=${limit}&page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/products?limit=${limit}&page=${result.nextPage}`
        : null,
    };
  }

  //GET
  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  //POST
  async createProduct(productData) {
    return await ProductModel.create(productData);
  }

  //PUT
  async updateProduct(id, updatedData) {
    return await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  //DELETE 
  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default ProductManagerMongo;
