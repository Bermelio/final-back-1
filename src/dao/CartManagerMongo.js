import CartModel from "../models/cart.model.js";

export default class CartManagerMongo {
  constructor() {
    this.cartModel = CartModel;
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const cleanProductId = productId.trim();
    const initialLength = cart.products.length;

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== cleanProductId
    );

    if (cart.products.length === initialLength)
      throw new Error("Producto no encontrado en el carrito");

    return await cart.save();
  }

  async updateCart(cartId, newProducts) {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = newProducts;
    return await cart.save();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productInCart = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (productInCart) {
      productInCart.quantity = quantity;
      return await cart.save();
    }

    throw new Error("Producto no encontrado en el carrito");
  }

  //CART METHODS
  async getAllCarts() {
    return await this.cartModel.find({});
  }

  async createCart() {
    return await this.cartModel.create({ products: [] });
  }

  async getCartById(cartId) {
    return await this.cartModel.findById(cartId).populate("products.product");
  }

  async addProductToCart(cartId, productId) {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async clearCart(cartId) {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = [];
    return await cart.save();
  }
}