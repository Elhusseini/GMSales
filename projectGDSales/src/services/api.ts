const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      removeAuthToken();
    }
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },
};

// Users API
export const usersAPI = {
  getAll: () => apiRequest('/users'),
  getById: (id: string) => apiRequest(`/users/${id}`),
  create: (userData: any) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  update: (id: string, userData: any) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  delete: (id: string) => apiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Products API
export const productsAPI = {
  getAll: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/products/${id}`),
  create: (productData: any) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  update: (id: string, productData: any) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  delete: (id: string) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
  getCategories: () => apiRequest('/products/categories/list'),
};

// Customers API
export const customersAPI = {
  getAll: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/customers${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/customers/${id}`),
  create: (customerData: any) => apiRequest('/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
  }),
  update: (id: string, customerData: any) => apiRequest(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(customerData),
  }),
  delete: (id: string) => apiRequest(`/customers/${id}`, {
    method: 'DELETE',
  }),
};

// Sales Orders API
export const salesOrdersAPI = {
  getAll: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/sales-orders${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/sales-orders/${id}`),
  create: (orderData: any) => apiRequest('/sales-orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  updateStatus: (id: string, status: string) => apiRequest(`/sales-orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  delete: (id: string) => apiRequest(`/sales-orders/${id}`, {
    method: 'DELETE',
  }),
};

// Inventory API
export const inventoryAPI = {
  getOverview: () => apiRequest('/inventory/overview'),
  getMovements: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/inventory/movements${queryString ? `?${queryString}` : ''}`);
  },
  createMovement: (movementData: any) => apiRequest('/inventory/movements', {
    method: 'POST',
    body: JSON.stringify(movementData),
  }),
  getLowStock: () => apiRequest('/inventory/low-stock'),
  getByCategory: () => apiRequest('/inventory/by-category'),
};

// Reports API
export const reportsAPI = {
  getDashboard: () => apiRequest('/reports/dashboard'),
  getSales: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/reports/sales${queryString ? `?${queryString}` : ''}`);
  },
  getInventory: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/reports/inventory${queryString ? `?${queryString}` : ''}`);
  },
  getCustomers: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/reports/customers${queryString ? `?${queryString}` : ''}`);
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };