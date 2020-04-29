/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import React from 'react';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import BusinessUnit from "views/BusinessUnit/BusinessUnit.js";
import Typography from "views/Typography/Typography.js";
// eslint-disable-next-line import/extensions
import Items from "views/Items/Items.js";
import BuInventory from "views/BuInventory/buInventory";
import BuRepRequest from "views/BuRepRequest/buRepRequest";
import BuRepRequestDetails from "views/BuRepRequestDetails/buRepRequestDetails";
import BuReturn from "views/BuReturn/buReturn";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

// const items = () => { return (< i class="zmdi zmdi-collection-item" ></i >) }


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/items",
    name: "Items",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Items,
    layout: "/admin"
  },
  {
    path: "/buInventory",
    name: "Bu Inventory",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: BuInventory,
    layout: "/admin"
  },
  {
    path: "/buRepRequest",
    name: "Bu Rep Request",
    rtlName: "الرمز",
    icon: BubbleChart,
    component: BuRepRequest,
    layout: "/admin"
  },
  {
    path: "/buRepRequestDetails",
    name: "Bu Rep Request Details",
    rtlName: "الرمو",
    icon: BubbleChart,
    component: BuRepRequestDetails,
    layout: "/admin"
  },
  {
    path: "/buReturn",
    name: "Bu Return",
    rtlName: "الموز",
    icon: BubbleChart,
    component: BuReturn,
    layout: "/admin"
  },


  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },

  {
    path: "/businessunit",
    name: "Business Unit",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: BusinessUnit,
    layout: "/admin"
  }

];

export default dashboardRoutes;
