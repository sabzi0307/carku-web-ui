// src/types/customer.ts
export interface CustomerDto {
  id: number;
  firstName: string;
  fullName: string;
  lastName: string;
  phoneNumber: string;
  mobileNumber: string;
  customerNumber: number;
  nationalCode: string;
  createDate: Date;
  createDateStr: string;
  city: string;
  description: string;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  mobileNumber: string;
  nationalCode: string;
  city: string;
  description: string;
}

export interface CustomerListResponse {
  customers: CustomerDto[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface CustomerFilters {
  search?: string;
  city?: string;
  page?: number;
  pageSize?: number;
}