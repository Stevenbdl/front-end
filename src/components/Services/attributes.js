import { baseURL } from "."

export const getAttributes = async (customerId) => {
  const response = await baseURL.get(
    `/customers/attribute?customer_id=${customerId}`
  );

  return response;
}

export const createAttribute = async (customerId, data) => {
  const response = await baseURL.post(
    `/customers/attribute?customer_id=${customerId}`,
    data,
  );

  return response;
}