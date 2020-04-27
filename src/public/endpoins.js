const baseUrl= 'http://localhost:8080/api';

// auth endpoints
export const loginUrl = `${baseUrl}/auth/login`;

// items endpoints
export const getItemsUrl = `${baseUrl}/item/getitems`;
export const addItemUrl = `${baseUrl}/item/additem`;
export const updateItemUrl = `${baseUrl}/item/updateitem`;
export const deleteItemUrl = `${baseUrl}/item/deleteitem`;
