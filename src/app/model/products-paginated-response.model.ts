import {Product} from "./product.model";

/**
 * @author Mack_TB
 * @Since 27/05/2024
 * @version 1.0.0
 */

export interface ProductsPaginatedResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Product[];
}
