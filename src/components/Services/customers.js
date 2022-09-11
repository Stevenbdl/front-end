import { baseURL } from "."

export const getCustomers = async () => {
  const response = await baseURL.get(
    '/customers'
  );

  return response;
}