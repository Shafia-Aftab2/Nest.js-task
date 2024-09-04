import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

@Injectable()
export class ProductsService {
  // Using a Map to store products with the product ID as the key
  private products = new Map<string, Product>();

  create(createProductDto: CreateProductDto): Product {
    const id = (Math.random() * 1000000).toString(); // Generate a random ID
    const product: Product = {
      id,
      ...createProductDto,
    };
    this.products.set(id, product); // Add the product to the Map
    return product;
  }

  findAll(page: number = 1, limit: number = 10): Product[] {
    const allProducts = Array.from(this.products.values()); // Convert Map values to an array
    const startIndex = (page - 1) * limit;
    return allProducts.slice(startIndex, startIndex + limit); // Return paginated results
  }

  findOne(id: string): Product {
    const product = this.products.get(id); // Retrieve product by ID from the Map
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id); // Find existing product
    const updatedProduct = { ...product, ...updateProductDto }; // Merge updates into the product
    this.products.set(id, updatedProduct); // Update the product in the Map
    return updatedProduct;
  }

  remove(id: string): void {
    if (!this.products.delete(id)) {
      // Remove the product by ID from the Map
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  search(query: string): Product[] {
    // Search through the products in the Map by converting it to an array
    return Array.from(this.products.values()).filter(
      (product) =>
        product.name.includes(query) || product.description.includes(query),
    );
  }
}
