const baseUrl= 'http://localhost:8080/api';

// auth endpoints
export const loginUrl = `${baseUrl}/auth/login`;

// items endpoints
export const getItemsUrl = `${baseUrl}/item/getitems`;
export const addItemUrl = `${baseUrl}/item/additem`;
export const updateItemUrl = `${baseUrl}/item/updateitem`;
export const deleteItemUrl = `${baseUrl}/item/deleteitem`;

// bu stock out log endpoints
export const getBuStockOutLogUrl = `${baseUrl}/bustockoutlog/getbustockoutlog`;
export const addBuStockOutLogUrl= `${baseUrl}/bustockoutlog/addbustockoutlog`;
export const updateBuStockOutLogUrl= `${baseUrl}/bustockoutlog/updatebustockoutlog`;
export const deleteBuStockOutLogUrl= `${baseUrl}/bustockoutlog/deletebustockoutlog`;
