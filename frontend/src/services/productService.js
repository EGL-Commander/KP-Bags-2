const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const response = await fetch(`${API_URL}/products?t=${new Date().getTime()}`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(slug) {
  const response = await fetch(`${API_URL}/products/${slug}?t=${new Date().getTime()}`, { cache: 'no-store' });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function submitInquiry(data) {
  const response = await fetch(`${API_URL}/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}