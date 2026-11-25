const API_URL = import.meta.env.VITE_API_URL || "/api";

async function handleApiResponse(response, fallbackMessage) {
  const responseText = await response.text();

  let data;

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    throw new Error(
      `Server returned an invalid response (HTTP ${response.status}). Please check the backend server and API URL.`
    );
  }

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  });

  return handleApiResponse(response, "Order could not be placed.");
}

export async function adminLogin(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return handleApiResponse(response, "Login failed.");
}

export async function getAdminData(endpoint, token) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleApiResponse(response, "Could not load data.");
}

export async function changeOrderStatus(orderId, status, token) {
  const response = await fetch(
    `${API_URL}/orders/${encodeURIComponent(orderId)}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    }
  );

  return handleApiResponse(response, "Status update failed.");
}

export async function getInventory() {
  const response = await fetch(`${API_URL}/inventory`);

  return handleApiResponse(response, "Could not load inventory.");
}

export async function updateProductStock(productId, stock, token) {
  const response = await fetch(
    `${API_URL}/inventory/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stock })
    }
  );

  return handleApiResponse(response, "Stock update failed.");
}
