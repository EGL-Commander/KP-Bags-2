const API_URL = `${import.meta.env.VITE_API_URL || ""}/api/admin`;

console.log("API URL =", API_URL);

const getHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  if (data.token) localStorage.setItem("adminToken", data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "#/admin/login";
};

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/dashboard`, { headers: getHeaders() });
  if (!response.ok) {
    if (response.status === 401) logout();
    throw new Error("Failed to fetch dashboard stats");
  }
  return response.json();
};

export const getInquiries = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/inquiries?${query}`, { headers: getHeaders() });
  if (!response.ok) {
    if (response.status === 401) logout();
    throw new Error("Failed to fetch inquiries");
  }
  return response.json();
};

export const updateInquiry = async (id, data) => {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update inquiry");
  return response.json();
};

export const deleteInquiry = async (id) => {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete inquiry");
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`, { headers: getHeaders() });
  if (!response.ok) {
    if (response.status === 401) logout();
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const createProduct = async (data) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (slug, data) => {
  const response = await fetch(`${API_URL}/products/${slug}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (slug) => {
  const response = await fetch(`${API_URL}/products/${slug}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("adminToken");
  const response = await fetch(`${API_URL}/upload-image`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) logout();
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to upload image");
  }

  return response.json();
};

export const getGalleryItems = async () => {
  const response = await fetch(`${API_URL}/gallery`, { headers: getHeaders() });
  if (!response.ok) {
    if (response.status === 401) logout();
    throw new Error("Failed to fetch gallery items");
  }
  return response.json();
};

export const createGalleryItem = async (data) => {
  const response = await fetch(`${API_URL}/gallery`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create gallery item");
  return response.json();
};

export const updateGalleryItem = async (id, data) => {
  const response = await fetch(`${API_URL}/gallery/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update gallery item");
  return response.json();
};

export const deleteGalleryItem = async (id) => {
  const response = await fetch(`${API_URL}/gallery/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete gallery item");
  return response.json();
};
