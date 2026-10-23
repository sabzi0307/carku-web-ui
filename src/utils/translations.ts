// src/utils/translations.ts
export const translations = {
  en: {
    // Common
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      loading: 'Loading...',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      close: 'Close',
      actions: 'Actions',
      details: 'Details',
    },
    
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      customers: 'Customers',
      invoices: 'Invoices',
      checks: 'Checks',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
    },
    
    // Auth
    auth: {
      login: 'Login',
      username: 'Username',
      password: 'Password',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot Password?',
      welcomeBack: 'Welcome Back',
      loginToAccount: 'Login to your account',
    },
    
    // Dashboard
    dashboard: {
      welcome: 'Welcome to Dashboard',
      subtitle: 'Manage customers, invoices, and checks with ease',
      totalCustomers: 'Total Customers',
      totalInvoices: 'Total Invoices',
      totalChecks: 'Total Checks',
      recentActivity: 'Recent Activity',
    },
    
    // Customers
    customers: {
      title: 'Customers',
      addCustomer: 'Add Customer',
      editCustomer: 'Edit Customer',
      customerDetails: 'Customer Details',
      firstName: 'First Name',
      lastName: 'Last Name',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      mobileNumber: 'Mobile Number',
      customerNumber: 'Customer Number',
      nationalCode: 'National Code',
      city: 'City',
      description: 'Description',
      createDate: 'Create Date',
      noCustomers: 'No customers found',
    },
    
    // Settings
    settings: {
      title: 'Settings',
      appearance: 'Appearance',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      english: 'English',
      persian: 'Persian',
    },
  },
  
  fa: {
    // Common
    common: {
      save: 'ذخیره',
      cancel: 'انصراف',
      delete: 'حذف',
      edit: 'ویرایش',
      add: 'افزودن',
      search: 'جستجو',
      loading: 'در حال بارگذاری...',
      confirm: 'تأیید',
      yes: 'بله',
      no: 'خیر',
      close: 'بستن',
      actions: 'عملیات',
      details: 'جزئیات',
    },
    
    // Navigation
    nav: {
      dashboard: 'داشبورد',
      customers: 'مشتریان',
      invoices: 'فاکتورها',
      checks: 'چک‌ها',
      settings: 'تنظیمات',
      profile: 'پروفایل',
      logout: 'خروج',
    },
    
    // Auth
    auth: {
      login: 'ورود',
      username: 'نام کاربری',
      password: 'رمز عبور',
      rememberMe: 'مرا به خاطر بسپار',
      forgotPassword: 'رمز عبور را فراموش کرده‌اید؟',
      welcomeBack: 'خوش آمدید',
      loginToAccount: 'وارد حساب کاربری خود شوید',
    },
    
    // Dashboard
    dashboard: {
      welcome: 'به داشبورد خوش آمدید',
      subtitle: 'مدیریت مشتریان، فاکتورها و چک‌ها به آسانی',
      totalCustomers: 'کل مشتریان',
      totalInvoices: 'کل فاکتورها',
      totalChecks: 'کل چک‌ها',
      recentActivity: 'فعالیت‌های اخیر', 
    },
    
    // Customers
    customers: {
      title: 'مشتریان',
      addCustomer: 'افزودن مشتری',
      editCustomer: 'ویرایش مشتری',
      customerDetails: 'جزئیات مشتری',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      fullName: 'نام کامل',
      phoneNumber: 'شماره تلفن',
      mobileNumber: 'شماره همراه',
      customerNumber: 'شماره مشتری',
      nationalCode: 'کد ملی',
      city: 'شهر',
      description: 'توضیحات',
      createDate: 'تاریخ ایجاد',
      noCustomers: 'مشتری‌ای یافت نشد',
    },
    
    // Settings
    settings: {
      title: 'تنظیمات',
      appearance: 'ظاهر',
      language: 'زبان',
      theme: 'تم',
      light: 'روشن',
      dark: 'تیره',
      english: 'انگلیسی',
      persian: 'فارسی',
    },
  },
};

export const useTranslations = (language: 'en' | 'fa') => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t };
};