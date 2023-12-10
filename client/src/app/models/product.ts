export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  pictureURL: string;
  type?: string;
  brand?: string;
  quantityInStock?: number;
}

export interface ProductParams {
  orderBy?: string;
  searchTerm?: string;
  types: string[];
  brands: string[];
  pageNumber: number;
  pageSize: number;
}
