// src/pages/CustomersPage.tsx
import React, { useEffect, useState } from 'react';
import { useCustomerStore } from '../store/customerStore';
import { useAppStore } from '../store/appStore';
import { useTranslations } from '../utils/translations';
import { CustomerForm } from '../components/customers/CustomerForm';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Phone,
  Smartphone,
  MapPin,
  Calendar,
  User,
  Filter
} from 'lucide-react';
import { cn } from '../utils/cn';
import type { CustomerDto } from '../types/customer';
import { Label } from '../components/ui/label';

export const CustomersPage: React.FC = () => {
  const { language } = useAppStore();
  const { t } = useTranslations(language);
  const isRTL = language === 'fa';

  const {
    customers,
    selectedCustomer,
    isLoading,
    error,
    totalCount,
    currentPage,
    filters,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    selectCustomer,
    setFilters,
  } = useCustomerStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<CustomerDto | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<CustomerDto | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, search: searchTerm, page: 1 };
    setFilters(newFilters);
    fetchCustomers(newFilters);
  };

  const handleAddCustomer = () => {
    setCustomerToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditCustomer = (customer: CustomerDto) => {
    setCustomerToEdit(customer);
    setIsFormOpen(true);
  };

  const handleViewCustomer = (customer: CustomerDto) => {
    selectCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleDeleteCustomer = (customer: CustomerDto) => {
    setCustomerToDelete(customer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (customerToDelete) {
      await deleteCustomer(customerToDelete.id);
      setIsDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  const handleFormSubmit = async (data: any) => {
    if (customerToEdit) {
      await updateCustomer(customerToEdit.id, data);
    } else {
      await createCustomer(data);
    }
    setIsFormOpen(false);
    setCustomerToEdit(null);
  };

  return (
    <div className={cn(
      "p-6 space-y-6",
      isRTL ? 'font-persian rtl' : 'font-english ltr'
    )}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('customers.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Manage your customers and their information
          </p>
        </div>
        <Button onClick={handleAddCustomer} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('customers.addCustomer')}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`} />
              <Input
                type="text"
                placeholder={`${t('common.search')}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={isRTL ? 'pr-10' : 'pl-10'}
              />
            </div>
            <Button type="submit" variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              {t('common.search')}
            </Button>
            <Button type="button" variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Customers ({totalCount})</span>
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('customers.customerNumber')}</TableHead>
                  <TableHead>{t('customers.fullName')}</TableHead>
                  <TableHead>{t('customers.mobileNumber')}</TableHead>
                  <TableHead>{t('customers.city')}</TableHead>
                  <TableHead>{t('customers.createDate')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {customer.customerNumber}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{customer.fullName}</div>
                          <div className="text-xs text-muted-foreground">{customer.nationalCode}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3 text-muted-foreground" />
                        {customer.mobileNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {customer.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {customer.createDateStr}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewCustomer(customer)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCustomer(customer)}
                          className="h-8 w-8 text-green-600 hover:text-green-800 hover:bg-green-50"
                          title="Edit Customer"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCustomer(customer)}
                          className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                          title="Delete Customer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {customers.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('customers.noCustomers')}</p>
                <Button
                  onClick={handleAddCustomer}
                  variant="outline"
                  className="mt-4 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {t('customers.addCustomer')}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Customer Form Modal */}
      <CustomerForm
        customer={customerToEdit}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCustomerToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className={cn("max-w-2xl", isRTL ? 'font-persian' : 'font-english')}>
            <DialogHeader>
              <DialogTitle>{t('customers.customerDetails')}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedCustomer.fullName}</h3>
                  <p className="text-muted-foreground">Customer #{selectedCustomer.customerNumber}</p>
                </div>
              </div>

              {/* Customer Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.firstName')}
                  </Label>
                  <p className="font-medium">{selectedCustomer.firstName}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.lastName')}
                  </Label>
                  <p className="font-medium">{selectedCustomer.lastName}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.phoneNumber')}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{selectedCustomer.phoneNumber}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.mobileNumber')}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{selectedCustomer.mobileNumber}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.nationalCode')}
                  </Label>
                  <p className="font-medium">{selectedCustomer.nationalCode}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.city')}
                  </Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{selectedCustomer.city}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.createDate')}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{selectedCustomer.createDateStr}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedCustomer.description && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('customers.description')}
                  </Label>
                  <div className="p-3 bg-muted/50 rounded-md">
                    <p>{selectedCustomer.description}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  {t('common.close')}
                </Button>
                <Button
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleEditCustomer(selectedCustomer);
                  }}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  {t('common.edit')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className={cn("max-w-md", isRTL ? 'font-persian' : 'font-english')}>
          <DialogHeader>
            <DialogTitle>{t('common.confirm')}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>Are you sure you want to delete customer "{customerToDelete?.fullName}"?</p>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={isLoading}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {isLoading ? t('common.loading') : t('common.delete')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};