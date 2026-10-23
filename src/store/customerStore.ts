// src/store/customerStore.ts
import { create } from 'zustand';
import type { CustomerDto, CustomerFormData, CustomerListResponse, CustomerFilters } from '../types/customer';

interface CustomerState {
  customers: CustomerDto[];
  selectedCustomer: CustomerDto | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  filters: CustomerFilters;
  
  // Actions
  fetchCustomers: (filters?: CustomerFilters) => Promise<void>;
  createCustomer: (customer: CustomerFormData) => Promise<void>;
  updateCustomer: (id: number, customer: CustomerFormData) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
  selectCustomer: (customer: CustomerDto | null) => void;
  setFilters: (filters: CustomerFilters) => void;
  clearError: () => void;
}

// Mock data for demonstration
const mockCustomers: CustomerDto[] = [
  {
    id: 1,
    firstName: 'Ahmad',
    lastName: 'Rezaei',
    fullName: 'Ahmad Rezaei',
    phoneNumber: '021-12345678',
    mobileNumber: '09123456789',
    customerNumber: 1001,
    nationalCode: '0123456789',
    createDate: new Date('2024-01-15'),
    createDateStr: '1402/10/25',
    city: 'Tehran',
    description: 'Regular customer',
  },
  {
    id: 2,
    firstName: 'Sara',
    lastName: 'Ahmadi',
    fullName: 'Sara Ahmadi',
    phoneNumber: '021-87654321',
    mobileNumber: '09187654321',
    customerNumber: 1002,
    nationalCode: '9876543210',
    createDate: new Date('2024-02-20'),
    createDateStr: '1402/12/01',
    city: 'Isfahan',
    description: 'VIP customer',
  },
  {
    id: 3,
    firstName: 'Mohammad',
    lastName: 'Karimi',
    fullName: 'Mohammad Karimi',
    phoneNumber: '021-11111111',
    mobileNumber: '09111111111',
    customerNumber: 1003,
    nationalCode: '1111111111',
    createDate: new Date('2024-03-10'),
    createDateStr: '1403/01/20',
    city: 'Mashhad',
    description: 'New customer',
  },
];

let customerIdCounter = 4;

export const useCustomerStore = create<CustomerState>()((set, get) => ({
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  filters: {},
  
  fetchCustomers: async (filters = {}) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredCustomers = [...mockCustomers];
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(customer => 
          customer.firstName.toLowerCase().includes(searchTerm) ||
          customer.lastName.toLowerCase().includes(searchTerm) ||
          customer.fullName.toLowerCase().includes(searchTerm) ||
          customer.phoneNumber.includes(searchTerm) ||
          customer.mobileNumber.includes(searchTerm) ||
          customer.nationalCode.includes(searchTerm) ||
          customer.city.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply city filter
      if (filters.city) {
        filteredCustomers = filteredCustomers.filter(customer => 
          customer.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }
      
      const totalCount = filteredCustomers.length;
      const currentPage = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      
      // Apply pagination
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
      
      set({ 
        customers: paginatedCustomers,
        totalCount,
        currentPage,
        pageSize,
        filters,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch customers',
        isLoading: false 
      });
    }
  },
  
  createCustomer: async (customerData: CustomerFormData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCustomer: CustomerDto = {
        id: customerIdCounter++,
        ...customerData,
        fullName: `${customerData.firstName} ${customerData.lastName}`,
        customerNumber: 1000 + customerIdCounter,
        createDate: new Date(),
        createDateStr: new Intl.DateTimeFormat('fa-IR').format(new Date()),
      };
      
      mockCustomers.unshift(newCustomer);
      
      // Refresh the list
      await get().fetchCustomers(get().filters);
    } catch (error) {
      set({ 
        error: 'Failed to create customer',
        isLoading: false 
      });
    }
  },
  
  updateCustomer: async (id: number, customerData: CustomerFormData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const customerIndex = mockCustomers.findIndex(c => c.id === id);
      if (customerIndex !== -1) {
        mockCustomers[customerIndex] = {
          ...mockCustomers[customerIndex],
          ...customerData,
          fullName: `${customerData.firstName} ${customerData.lastName}`,
        };
      }
      
      // Refresh the list
      await get().fetchCustomers(get().filters);
    } catch (error) {
      set({ 
        error: 'Failed to update customer',
        isLoading: false 
      });
    }
  },
  
  deleteCustomer: async (id: number) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const customerIndex = mockCustomers.findIndex(c => c.id === id);
      if (customerIndex !== -1) {
        mockCustomers.splice(customerIndex, 1);
      }
      
      // Refresh the list
      await get().fetchCustomers(get().filters);
    } catch (error) {
      set({ 
        error: 'Failed to delete customer',
        isLoading: false 
      });
    }
  },
  
  selectCustomer: (customer: CustomerDto | null) => {
    set({ selectedCustomer: customer });
  },
  
  setFilters: (filters: CustomerFilters) => {
    set({ filters });
  },
  
  clearError: () => {
    set({ error: null });
  },
}));