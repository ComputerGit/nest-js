// This mirrors the standard response shape often used in NestJS
export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
  timestamp: string;
}

// For paginated lists (common in 'list' features)
export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
