import { baseURL } from "."

export const getCustomers = async () => {
  const response = await baseURL.get(
    '/customers'
  );

  return response;
}

export const getCustomerById = async (id) => {
  const response = await baseURL.get(
    `/customers/${id}`
  );

  return response;
}

export const updateCustomerAttributesById = async (id, data) => {
  const response = await baseURL.patch(
    `/customers/${id}`,
    data
  )

  return response;
}