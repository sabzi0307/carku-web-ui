// src/components/customers/CustomerForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store/appStore';
import { useTranslations } from '../../utils/translations';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import type { CustomerFormData, CustomerDto } from '../../types/customer';
import { cn } from '../../utils/cn';

interface CustomerFormProps {
  customer?: CustomerDto | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => Promise<void>;
  isLoading?: boolean;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const { language } = useAppStore();
  const { t } = useTranslations(language);
  const isRTL = language === 'fa';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    defaultValues: customer ? {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      mobileNumber: customer.mobileNumber,
      nationalCode: customer.nationalCode,
      city: customer.city,
      description: customer.description,
    } : {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      mobileNumber: '',
      nationalCode: '',
      city: '',
      description: '',
    },
  });

  React.useEffect(() => {
    if (customer) {
      reset({
        firstName: customer.firstName,
        lastName: customer.lastName,
        phoneNumber: customer.phoneNumber,
        mobileNumber: customer.mobileNumber,
        nationalCode: customer.nationalCode,
        city: customer.city,
        description: customer.description,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        mobileNumber: '',
        nationalCode: '',
        city: '',
        description: '',
      });
    }
  }, [customer, reset]);

  const handleFormSubmit = async (data: CustomerFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn("max-w-2xl", isRTL ? 'font-persian' : 'font-english')}>
        <DialogHeader>
          <DialogTitle>
            {customer ? t('customers.editCustomer') : t('customers.addCustomer')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('customers.firstName')}</Label>
              <Input
                id="firstName"
                {...register('firstName', { 
                  required: 'First name is required',
                  minLength: { value: 2, message: 'First name must be at least 2 characters' }
                })}
                className={errors.firstName ? 'border-red-500' : ''}
                placeholder={t('customers.firstName')}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('customers.lastName')}</Label>
              <Input
                id="lastName"
                {...register('lastName', { 
                  required: 'Last name is required',
                  minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                })}
                className={errors.lastName ? 'border-red-500' : ''}
                placeholder={t('customers.lastName')}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t('customers.phoneNumber')}</Label>
              <Input
                id="phoneNumber"
                {...register('phoneNumber', {
                  pattern: {
                    value: /^[0-9+-\s()]*$/,
                    message: 'Invalid phone number format'
                  }
                })}
                className={errors.phoneNumber ? 'border-red-500' : ''}
                placeholder="021-12345678"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">{t('customers.mobileNumber')}</Label>
              <Input
                id="mobileNumber"
                {...register('mobileNumber', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^09[0-9]{9}$/,
                    message: 'Mobile number must start with 09 and be 11 digits'
                  }
                })}
                className={errors.mobileNumber ? 'border-red-500' : ''}
                placeholder="09123456789"
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>
              )}
            </div>

            {/* National Code */}
            <div className="space-y-2">
              <Label htmlFor="nationalCode">{t('customers.nationalCode')}</Label>
              <Input
                id="nationalCode"
                {...register('nationalCode', {
                  required: 'National code is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'National code must be 10 digits'
                  }
                })}
                className={errors.nationalCode ? 'border-red-500' : ''}
                placeholder="0123456789"
              />
              {errors.nationalCode && (
                <p className="text-red-500 text-xs">{errors.nationalCode.message}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">{t('customers.city')}</Label>
              <Input
                id="city"
                {...register('city', { 
                  required: 'City is required',
                  minLength: { value: 2, message: 'City must be at least 2 characters' }
                })}
                className={errors.city ? 'border-red-500' : ''}
                placeholder={t('customers.city')}
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t('customers.description')}</Label>
            <textarea
              id="description"
              {...register('description')}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t('customers.description')}
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting || isLoading}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="min-w-[100px]"
            >
              {isSubmitting || isLoading ? t('common.loading') : t('common.save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};