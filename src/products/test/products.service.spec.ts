import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../service/products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category',
    };
    const product = service.create(createProductDto);
    expect(product).toEqual(expect.objectContaining(createProductDto));
  });

  it('should find a product by id', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category',
    };
    const product = service.create(createProductDto);
    expect(service.findOne(product.id)).toEqual(product);
  });

  it('should return all products', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category',
    };
    service.create(createProductDto);
    const products = service.findAll();
    expect(products.length).toBeGreaterThan(0);
  });

  it('should update a product', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category',
    };
    const product = service.create(createProductDto);
    const updateProductDto = { name: 'Updated Product' };
    const updatedProduct = service.update(product.id, updateProductDto);
    expect(updatedProduct.name).toEqual('Updated Product');
  });

  it('should delete a product', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category',
    };
    const product = service.create(createProductDto);
    service.remove(product.id);
    expect(() => service.findOne(product.id)).toThrow();
  });
});
