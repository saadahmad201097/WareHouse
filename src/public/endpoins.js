const baseUrl= 'http://localhost:8080/api';
export const socketUrl= 'ws://localhost:8080';

// auth endpoints
export const loginUrl = `${baseUrl}/auth/login`;

// items endpoints
export const getItemsUrl = `${baseUrl}/item/getitems`;
export const addItemUrl = `${baseUrl}/item/additem`;
export const updateItemUrl = `${baseUrl}/item/updateitem`;
export const deleteItemUrl = `${baseUrl}/item/deleteitem`;

// bu inventory endpoints
export const getBuInventoryUrl = `${baseUrl}/buinventory/getbuinventory`;
export const addBuInventoryUrl = `${baseUrl}/buinventory/addbuinventory`;
export const updateBuInventoryUrl = `${baseUrl}/buinventory/updatebuinventory`;
export const deleteBuInventoryUrl = `${baseUrl}/buinventory/deletebuinventory`;

// bu rep request
export const getBuRepRequestUrl = `${baseUrl}/bureprequest/getbureprequest`;
export const addBuRepRequestUrl = `${baseUrl}/bureprequest/addbureprequest`;
export const updateBuRepRequestUrl = `${baseUrl}/bureprequest/updatebureprequest`;
export const deleteBuRepRequestUrl = `${baseUrl}/bureprequest/deletebureprequest`;

// bu rep request details
export const getBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/getbureprequestdetails`;
export const addBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/addbureprequestdetails`;
export const updateBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/updatebureprequestdetails`;
export const deleteBuRepRequestDetailsUrl = `${baseUrl}/bureprequestdetails/deletebureprequestdetails`;

// bu return
export const getBuReturnUrl = `${baseUrl}/bureturn/getbureturn`;
export const addBuReturnUrl = `${baseUrl}/bureturn/addbureturn`;
export const updateBuReturnUrl = `${baseUrl}/bureturn/updatebureturn`;
export const deleteBuReturnUrl = `${baseUrl}/bureturn/deletebureturn`;

// business unit
export const getBusinessUnitUrl = `${baseUrl}/businessunit/getbusinessunit`;
export const addBusinessUnitUrl = `${baseUrl}/businessunit/addbusinessunit`;
export const updateBusinessUnitUrl = `${baseUrl}/businessunit/updatebusinessunit`;
export const deleteBusinessUnitUrl = `${baseUrl}/businessunit/deletebusinessunit`;

// bu stock in log
export const getBuStockInLogUrl = `${baseUrl}/bustockinlog/getbustockinlog`;
export const addBuStockInLogUrl = `${baseUrl}/bustockinlog/addbustockinlog`;
export const updateBuStockInLogUrl = `${baseUrl}/bustockinlog/updatebustockinlog`;
export const deleteBuStockInLogUrl = `${baseUrl}/bustockinlog/deletebustockinlog`;

// bu stock out log
export const getBuStockOutLogUrl = `${baseUrl}/bustockoutlog/getbustockoutlog`;
export const addBuStockOutLogUrl= `${baseUrl}/bustockoutlog/addbustockoutlog`;
export const updateBuStockOutLogUrl= `${baseUrl}/bustockoutlog/updatebustockoutlog`;
export const deleteBuStockOutLogUrl= `${baseUrl}/bustockoutlog/deletebustockoutlog`;

// vendor
export const getVendorUrl = `${baseUrl}/vendor/getvendors`;
export const addVendorUrl= `${baseUrl}/vendor/addvendor`;
export const updateVendorUrl= `${baseUrl}/vendor/updatevendor`;
export const deleteVendorUrl= `${baseUrl}/vendor/deletevendor`;
