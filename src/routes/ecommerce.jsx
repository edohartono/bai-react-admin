import General from "views/general/Dashboard/General.jsx";
import Hospital from "views/hospital/Dashboard/Hospital.jsx";
import Music from "views/music/Dashboard/Music.jsx";
import Crm from "views/crm/Dashboard/Crm.jsx";
import Social from "views/social/Dashboard/Social.jsx";
import Freelance from "views/freelance/Dashboard/Freelance.jsx";
import University from "views/university/Dashboard/University.jsx";
import Ecommerce from "views/ecommerce/Dashboard/Ecommerce.jsx";
import Blog from "views/blog/Dashboard/Blog.jsx";

import BisnisProduk from "views/ecommerce/Category/Product.jsx";
import AddProduct from "views/ecommerce/Product/AddProduct.jsx";
import AddCategory from "views/ecommerce/Category/AddCategory.jsx";

import Product from "views/ecommerce/Product/Product.jsx";
import EditProduct from "views/ecommerce/Product/EditProduct.jsx";
import ViewProduct from "views/ecommerce/Product/ViewProduct.jsx";

import Customer from "views/ecommerce/Customer/Customer.jsx";
import AddCustomer from "views/ecommerce/Customer/AddCustomer.jsx";
import EditCustomer from "views/ecommerce/Customer/EditCustomer.jsx";

import Vendor from "views/ecommerce/Vendor/Vendor.jsx";
import AddVendor from "views/ecommerce/Vendor/AddVendor.jsx";
import VendorProduct from "views/ecommerce/Vendor/VendorProduct.jsx";
import EditVendor from "views/ecommerce/Vendor/EditVendor.jsx";

import User from "views/ecommerce/User/User.jsx";
import AddUser from "views/ecommerce/User/AddUser.jsx";
import EditUser from "views/ecommerce/User/EditUser.jsx";

import EcommerceMailinbox from "views/ecommerce/Mail/Inbox.jsx";
import EcommerceMailcompose from "views/ecommerce/Mail/Compose.jsx";
import EcommerceMailview from "views/ecommerce/Mail/View.jsx";

import Invoice from "views/ecommerce/Invoice/Invoice.jsx";
import AddInvoice from "views/ecommerce/Invoice/AddInvoice.jsx";
import EditInvoice from "views/ecommerce/Invoice/EditInvoice.jsx";
import EcommerceInvoice from "views/ecommerce/Invoice/EcommerceInvoice.jsx";

import Order from "views/ecommerce/Order/Order.jsx";
import AddOrder from "views/ecommerce/Order/AddOrder.jsx";
import EditOrder from "views/ecommerce/Order/EditOrder.jsx";

import Tag from "views/ecommerce/Tag/Tag.jsx";
import AddTag from "views/ecommerce/Tag/AddTag.jsx";
import EditTag from "views/ecommerce/Tag/EditTag.jsx";

import Category from "views/ecommerce/Category/Category.jsx";
// import AddCategory from 'views/ecommerce/Category/AddCategory.jsx';
import EditCategory from "views/ecommerce/Category/EditCategory.jsx";

import EcommerceSettings from "views/ecommerce/Settings/Settings.jsx";

import EcommerceReportsSales from "views/ecommerce/Reports/ReportsSales.jsx";
import EcommerceReportsVisitors from "views/ecommerce/Reports/ReportsVisitors.jsx";
import EcommerceReportsTargets from "views/ecommerce/Reports/ReportsTargets.jsx";
import DetailCustomer from "../views/ecommerce/Customer/DetailCustomer";
import DetailVendor from "../views/ecommerce/Vendor/DetailVendor";
import UserCategory from "../views/ecommerce/UserCategory/UserCategory";
import UserAddCategory from "../views/ecommerce/UserCategory/UserAddCategory";
import SellerList from "../views/ecommerce/Sellers/SellerList";
import SellerDetail from "../views/ecommerce/Sellers/SellerDetail";
import UserList from "../views/ecommerce/User/UserList";
import CategoryBusiness from "../views/ecommerce/Category/CategoryBusiness";
import CategoryBusinessEdit from "../views/ecommerce/Category/CategoryBusinessEdit";
import CategoryBusinessLandingEdit from "../views/ecommerce/Category/CategoryBusinessLandingEdit";
import BusinessProduct from "../views/ecommerce/Product/BusinessProduct";
import OrderList from "../views/ecommerce/Order/OrderList";
import OrderTodayList from "../views/ecommerce/Order/OrderTodayList";
import DashboardAdmin from "../views/ecommerce/Dashboard/DashboardAdmin";
import Banner from "../views/ecommerce/Settings/Banner";
import BusinessInnovationGroup from "../views/ecommerce/Settings/BusinessInnovationGroup";
import SellerEdit from "../views/ecommerce/Sellers/SellerEdit";
import UserDetail from "../views/ecommerce/User/UserDetail";
import UserEdit from "../views/ecommerce/User/UserEdit";
import SellerAdd from "../views/ecommerce/Sellers/SellerAdd";
import BusinessProductEdit from "../views/ecommerce/Product/BusinessProductEdit";
import ChangePassword from "../views/ecommerce/Settings/ChangePassword";
import TransactionList from "../views/ecommerce/Transactions/TransactionList";
import TransactionDetail from "../views/ecommerce/Transactions/TransactionDetail";

var BASEDIR = "";

var dashRoutes = [
  //{ path: "#", name: "Main", type: "navgroup"},
  {
    path: BASEDIR + "/dashboard",
    name: "Dashboard",
    icon: "speedometer",
    badge: "",
    component: DashboardAdmin,
  },

  {
    path: "#",
    name: "User",
    icon: "energy",
    type: "dropdown",
    parentid: "products",
    child: [
      { path: BASEDIR + "/products", name: "Produk" },
      // { path: BASEDIR + "/add-product", name: "Add Product" },
      // { path: BASEDIR + "/products-unit", name: "Produk Bisnis Unit" },
      { path: BASEDIR + "/sellers", name: "Penjual" },
      { path: BASEDIR + "/customers", name: "Customer" },
    ],
  },
  { path: BASEDIR + "/dashboard", component: DashboardAdmin, type: "child" },
  { path: BASEDIR + "/products", component: Product, type: "child" },
  { path: BASEDIR + "/sellers", component: SellerList, type: "child" },
  { path: BASEDIR + "/seller/view", component: SellerDetail, type: "child" },
  { path: BASEDIR + "/seller/add", component: SellerAdd, type: "child" },
  { path: BASEDIR + "/customer/view", component: UserDetail, type: "child" },
  { path: BASEDIR + "/customer/edit", component: UserEdit, type: "child" },
  { path: BASEDIR + "/customer/add", component: UserEdit, type: "child" },
  { path: BASEDIR + "/seller/edit", component: SellerEdit, type: "child" },
  { path: BASEDIR + "/customers", component: UserList, type: "child" },
  { path: BASEDIR + "/product/view", component: ViewProduct, type: "child" },
  { path: BASEDIR + "/add-product", component: AddProduct, type: "child" },
  { path: BASEDIR + "/edit-product", component: EditProduct, type: "child" },

  // {
  //   path: "#",
  //   name: "Customer",
  //   icon: "people",
  //   type: "dropdown",
  //   parentid: "customers",
  //   child: [
  //     { path: BASEDIR + "/customers", name: "Customer" },
  //     // { path: BASEDIR + "/add-customer", name: "Add Customer" },
  //     // { path: BASEDIR + "/edit-customer", name: "Edit Customer" },
  //   ],
  // },
  { path: BASEDIR + "/customers", component: Customer, type: "child" },
  { path: BASEDIR + "/add-customer", component: AddCustomer, type: "child" },
  { path: BASEDIR + "/edit-customer", component: EditCustomer, type: "child" },
  {
    path: BASEDIR + "/detail-customer",
    component: DetailCustomer,
    type: "child",
  },

  {
    path: "#",
    name: "Bisnis Unit",
    icon: "folder-alt",
    type: "dropdown",
    parentid: "bisnisunit",
    child: [
      { path: BASEDIR + "/bisnis-kategori", name: "Kategori" },
      { path: BASEDIR + "/bisnis-produk", name: "Produk" },
      // { path: BASEDIR + "/bisnis-edit-kategori", name: "Edit Kategori" },
      { path: BASEDIR + "/bisnis-tambah-kategori", name: "Tambah Kategori" },
      { path: BASEDIR + "/bisnis-tambah-produk", name: "Tambah Produk" },
    ],
  },
  {
    path: BASEDIR + "/bisnis-kategori",
    component: CategoryBusiness,
    type: "child",
  },
  {
    path: BASEDIR + "/bisnis-kategori/edit",
    component: CategoryBusinessEdit,
    type: "child",
  },
  {
    path: BASEDIR + "/bisnis-kategori-landing/edit",
    component: CategoryBusinessLandingEdit,
    type: "child",
  },
  {
    path: BASEDIR + "/bisnis-tambah-kategori",
    component: AddCategory,
    type: "child",
  },
  {
    path: BASEDIR + "/bisnis-produk",
    component: BusinessProduct,
    type: "child",
  },
  {
    path: BASEDIR + "/bisnis-tambah-produk",
    component: AddProduct,
    type: "child",
  },
  {
    path: BASEDIR + "/bisnis-edit-produk",
    component: BusinessProductEdit,
    type: "child",
  },
  {
    path: BASEDIR + "/bisnis-edit-kategori",
    component: EditCategory,
    type: "child",
  },

  // {
  //   path: "#",
  //   name: "Kategori",
  //   icon: "folder-alt",
  //   type: "dropdown",
  //   parentid: "kategori",
  //   child: [
  //     { path: BASEDIR + "/user-category", name: "Kategori" },
  //     // { path: BASEDIR + "/user-produk", name: "Produk" },
  //     // { path: BASEDIR + "/bisnis-edit-kategori", name: "Edit Kategori" },
  //     { path: BASEDIR + "/user-tambah-kategori", name: "Tambah Kategori" },
  //     // { path: BASEDIR + "/user-tambah-produk", name: "Tambah Produk" },
  //   ],
  // },
  // { path: BASEDIR + "/user-category", component: UserCategory, type: "child" },
  // {
  //   path: BASEDIR + "/user-tambah-kategori",
  //   component: UserAddCategory,
  //   type: "child",
  // },
  // { path: BASEDIR + "/bisnis-produk", component: BisnisProduk, type: "child" },
  // {
  //   path: BASEDIR + "/user-tambah-produk",
  //   component: AddProduct,
  //   type: "child",
  // },
  // {
  //   path: BASEDIR + "/user-edit-kategori",
  //   component: EditCategory,
  //   type: "child",
  // },

  // {
  //   path: "#",
  //   name: "Seller",
  //   icon: "user",
  //   type: "dropdown",
  //   parentid: "vendors",
  //   child: [
  //     { path: BASEDIR + "/vendors", name: "Penjual" },
  //     // { path: BASEDIR + "/add-vendor", name: "Add Vendor" },
  //     // { path: BASEDIR + "/edit-vendor", name: "Edit Vendor" },
  //     { path: BASEDIR + "/vendor-product", name: "Produk" },
  //   ],
  // },
  // { path: BASEDIR + "/vendors", component: Vendor, type: "child" },
  // { path: BASEDIR + "/detail-vendor", component: DetailVendor, type: "child" },
  // // { path: BASEDIR + "/add-vendor", component: AddVendor, type: "child" },
  // { path: BASEDIR + "/edit-vendor", component: EditVendor, type: "child" },
  // {
  //   path: BASEDIR + "/vendor-product",
  //   component: VendorProduct,
  //   type: "child",
  // },

  // {
  //   path: "#",
  //   name: "Invoice",
  //   icon: "wallet",
  //   type: "dropdown",
  //   parentid: "billing",
  //   child: [
  //     { path: BASEDIR + "/invoices", name: "Invoices" },
  //     // { path: BASEDIR + "/add-invoice", name: "Add Invoice" },
  //     // { path: BASEDIR + "/edit-invoice", name: "Edit Invoice" },
  //     // { path: BASEDIR + "/invoice", name: "View Invoice" },
  //   ],
  // },
  // { path: BASEDIR + "/invoices", component: Invoice, type: "child" },
  // { path: BASEDIR + "/add-invoice", component: AddInvoice, type: "child" },
  // { path: BASEDIR + "/edit-invoice", component: EditInvoice, type: "child" },
  // { path: BASEDIR + "/invoice", component: EcommerceInvoice, type: "child" },

  {
    path: "#",
    name: "Order",
    icon: "credit-card",
    type: "dropdown",
    parentid: "orders",
    child: [
      { path: BASEDIR + "/orders", name: "Semua Order" },
      { path: BASEDIR + "/orders/today", name: "Order Hari Ini" },
      // { path: BASEDIR + "/add-order", name: "Add Order" },
      // { path: BASEDIR + "/edit-order", name: "Edit Order" },
    ],
  },
  { path: BASEDIR + "/orders", component: OrderList, type: "child" },
  { path: BASEDIR + "/orders/today", component: OrderTodayList, type: "child" },
  { path: BASEDIR + "/add-order", component: AddOrder, type: "child" },
  { path: BASEDIR + "/edit-order", component: EditOrder, type: "child" },

  // {
  //     path: "#", name: "Reports", icon: "chart", type: "dropdown", parentid: "reports",
  //     child: [
  //         { path: BASEDIR + "/reports-sales", name: "Sales" },
  //         { path: BASEDIR + "/reports-visitors", name: "Visitors" },
  //         { path: BASEDIR + "/reports-targets", name: "Targets" },
  //     ]
  // },
  {
    path: BASEDIR + "/reports-sales",
    component: EcommerceReportsSales,
    type: "child",
  },
  {
    path: BASEDIR + "/reports-visitors",
    component: EcommerceReportsVisitors,
    type: "child",
  },
  {
    path: BASEDIR + "/reports-targets",
    component: EcommerceReportsTargets,
    type: "child",
  },

  // {
  //     path: "#", name: "Users", icon: "user-female", type: "dropdown", parentid: "users",
  //     child: [
  //         { path: BASEDIR + "/users", name: "Users" },
  //         { path: BASEDIR + "/add-user", name: "Add User" },
  //         { path: BASEDIR + "/edit-user", name: "Edit User" },
  //     ]
  // },
  { path: BASEDIR + "/users", component: User, type: "child" },
  { path: BASEDIR + "/add-user", component: AddUser, type: "child" },
  { path: BASEDIR + "/edit-user", component: EditUser, type: "child" },

  {
    path: "#",
    name: "Quotation",
    icon: "tag",
    type: "dropdown",
    parentid: "tags",
    child: [
      { path: BASEDIR + "/quotation", name: "Semua Quotation" },
      // { path: BASEDIR + "/add-tag", name: "Add Tag" },
      // { path: BASEDIR + "/edit-tag", name: "Edit Tag" },
    ],
  },
  { path: BASEDIR + "/tag", component: Tag, type: "child" },
  { path: BASEDIR + "/add-tag", component: AddTag, type: "child" },
  { path: BASEDIR + "/edit-tag", component: EditTag, type: "child" },

  // {
  //     path: "#", name: "Product Categories", icon: "folder-alt", type: "dropdown", parentid: "categories",
  //     child: [
  //         { path: BASEDIR + "/category", name: "Categories" },
  //         { path: BASEDIR + "/add-category", name: "Add Category" },
  //         { path: BASEDIR + "/edit-category", name: "Edit Category" },
  //     ]
  // },
  { path: BASEDIR + "/category", component: Category, type: "child" },
  { path: BASEDIR + "/add-category", component: AddCategory, type: "child" },
  { path: BASEDIR + "/edit-category", component: EditCategory, type: "child" },

  // {
  //     path: "#", name: "Mail Box", icon: "envelope", type: "dropdown", parentid: "mailbox",
  //     child: [
  //         { path: BASEDIR + "/mail-inbox", name: "Inbox" },
  //         { path: BASEDIR + "/mail-compose", name: "Compose" },
  //         { path: BASEDIR + "/mail-view", name: "View" },
  //     ]
  // },
  // { path: BASEDIR + "/mail-inbox", component: EcommerceMailinbox, type: "child" },
  // { path: BASEDIR + "/mail-compose", component: EcommerceMailcompose, type: "child" },
  // { path: BASEDIR + "/mail-view", component: EcommerceMailview, type: "child" },
  // {
  //   path: BASEDIR + "/pages",
  //   name: "Halaman",
  //   icon: "settings",
  //   component: null,
  // },

  {
    path: BASEDIR + "/transaksi",
    name: "Transaksi",
    icon: "transaction",
    component: null,
    type: "dropdown",
    parentid: "transaksi",
    child: [
      { path: BASEDIR + "/transaksi/all", name: "Semua Transaksi" },
      {
        path: BASEDIR + "/setting/today",
        name: "Transaksi Hari Ini",
      },
    ],
  },

  {
    path: BASEDIR + "/transaksi/all",
    component: TransactionList,
    type: "child",
  },

  {
    path: BASEDIR + "/transaksi/detail",
    component: TransactionDetail,
    type: "child",
  },
  {
    path: BASEDIR + "/settings",
    name: "Pengaturan",
    icon: "settings",
    component: null,
    type: "dropdown",
    parentid: "setting",
    child: [
      { path: BASEDIR + "/setting/banner", name: "Banner" },
      {
        path: BASEDIR + "/setting/business-group",
        name: "Business Innovation Group",
      },
    ],
  },

  { path: BASEDIR + "/setting/banner", component: Banner, type: "child" },
  {
    path: BASEDIR + "/setting/change-password",
    component: ChangePassword,
    type: "child",
  },
  {
    path: BASEDIR + "/setting/business-group",
    component: BusinessInnovationGroup,
    type: "child",
  },

  // {
  //     path: "#", name: "Multi Purpose", icon: "layers", type: "dropdown", parentid: "multipurpose",
  //     child: [
  //         { path: BASEDIR + "/dashboard", name: "General" },
  //         { path: BASEDIR + "/hospital/dashboard", name: "Hospital" },
  //         { path: BASEDIR + "/music/dashboard", name: "Music" },
  //         { path: BASEDIR + "/crm/dashboard", name: "CRM" },
  //         { path: BASEDIR + "/social/dashboard", name: "Social Media" },
  //         { path: BASEDIR + "/freelance/dashboard", name: "Freelance" },
  //         { path: BASEDIR + "/university/dashboard", name: "University" },
  //         { path: BASEDIR + "/dashboard", name: "Ecommerce" },
  //         { path: BASEDIR + "/blog/dashboard", name: "Blog" },
  //     ]
  // },

  { path: BASEDIR + "/dashboard", component: null, type: "child" },
  { path: BASEDIR + "/hospital/dashboard", component: Hospital, type: "child" },
  { path: BASEDIR + "/music/dashboard", component: Music, type: "child" },
  { path: BASEDIR + "/crm/dashboard", component: Crm, type: "child" },
  { path: BASEDIR + "/social/dashboard", component: Social, type: "child" },
  {
    path: BASEDIR + "/freelance/dashboard",
    component: Freelance,
    type: "child",
  },
  {
    path: BASEDIR + "/university/dashboard",
    component: University,
    type: "child",
  },
  { path: BASEDIR + "/dashboard", component: Ecommerce, type: "child" },
  { path: BASEDIR + "/blog/dashboard", component: Blog, type: "child" },

  //{ redirect: true, path: BASEDIR+"/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
