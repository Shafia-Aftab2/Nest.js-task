import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../controller/products.controller';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

// Mocking the ProductsService
const mockProductsService = {
  create: jest.fn().mockImplementation((dto: CreateProductDto) => ({
    id: '123',
    ...dto,
  })),
  findAll: jest.fn().mockReturnValue([]),
  findOne: jest.fn().mockImplementation((id: string) => ({
    id,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'Test Category',
  })),
  update: jest.fn().mockImplementation((id: string, dto: UpdateProductDto) => ({
    id,
    ...dto,
  })),
  remove: jest.fn().mockImplementation((id: string) => ({
    id,
  })),
  search: jest.fn().mockReturnValue([]),
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService, // Providing the mock service
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        description: 'New Description',
        price: 200,
        category: 'New Category',
      };

      expect(await controller.create(createProductDto)).toEqual({
        id: expect.any(String),
        ...createProductDto,
      });

      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      expect(await controller.findAll(1, 10)).toEqual([]);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const id = '123';
      expect(await controller.findOne(id)).toEqual({
        id,
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Test Category',
      });
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = '123';
      const updateProductDto: UpdateProductDto = { name: 'Updated Product' };

      expect(await controller.update(id, updateProductDto)).toEqual({
        id,
        ...updateProductDto,
      });

      expect(service.update).toHaveBeenCalledWith(id, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const id = '123';
      expect(await controller.remove(id)).toEqual({ id });
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('search', () => {
    it('should return search results', async () => {
      const query = 'Test';
      expect(await controller.search(query)).toEqual([]);
      expect(service.search).toHaveBeenCalledWith(query);
    });
  });
});
