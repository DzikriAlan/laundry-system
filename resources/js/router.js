//IMPORT SECTION
import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import store from './store.js'

import IndexOutlet from './pages/outlets/Index.vue'
import DataOutlet from './pages/outlets/Outlet.vue'
import AddOutlet from './pages/outlets/Add.vue'
import EditOutlet from './pages/outlets/Edit.vue'

import AddCouriers from './pages/couriers/Add.vue'
import IndexCouriers from './pages/couriers/Index.vue'
import DataCouriers from './pages/couriers/Courier.vue'
import EditCouriers from './pages/couriers/Edit.vue'

import AddProduct from './pages/products/Add.vue'
import IndexProduct from './pages/products/Index.vue'
import DataProduct from './pages/products/Product.vue'
import EditProduct from './pages/products/Edit.vue'

import Setting from './pages/setting/Index.vue'
import SetPermission from './pages/setting/roles/SetPermission.vue'

import IndexExpenses from './pages/expenses/Index.vue'
import DataExpenses from './pages/expenses/Expenses.vue'
import CreateExpenses from './pages/expenses/Add.vue'
import ViewExpenses from './pages/expenses/View.vue'
import EditExpenses from './pages/expenses/Edit.vue'

import IndexCustomer from './pages/customers/Index.vue'
import DataCustomer from './pages/customers/Customer.vue'
import AddCustomer from './pages/customers/Add.vue'
import EditCustomer from './pages/customers/Edit.vue'

import IndexTransaction from './pages/transaction/Index.vue'
import AddTransaction from './pages/transaction/Add.vue'
import ListTransaction from './pages/transaction/List.vue'
import ViewTransaction from './pages/transaction/View.vue'

Vue.use(Router)

//DEFINE ROUTE
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
          path: '/outlets',
          component: IndexOutlet,
          meta: { requiresAuth: true },
          children: [
              {
                  path: '',
                  name: 'outlets.data',
                  component: DataOutlet,
                  meta: { title: 'Manage Outlets', permissions: 'read outlets' }
              },
              {
                  path: 'add',
                  name: 'outlets.add',
                  component: AddOutlet,
                  meta: { title: 'Add New Outlet', permissions: 'create outlets' }
              },
              {
                  path: 'edit/:id',
                  name: 'outlets.edit',
                  component: EditOutlet,
                  meta: { title: 'Edit Outlet', permissions: 'edit outlets' }
              }
          ]
        },
        {
            path: '/couriers',
            component: IndexCouriers,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'couriers.data',
                    component: DataCouriers,
                    meta: { title: 'Manage Couriers', permissions: 'read couriers' }
                },
                {
                    path: 'add',
                    name: 'couriers.add',
                    component: AddCouriers,
                    meta: { title: 'Add New Courier', permissions: 'create couriers' }
                },
                {
                    path: 'edit/:id',
                    name: 'couriers.edit',
                    component: EditCouriers,
                    meta: { title: 'Edit Courier', permissions: 'edit couriers' }
                },
            ]
        },
        {
            path: '/product',
            component: IndexProduct,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'products.data',
                    component: DataProduct,
                    meta: { title: 'Manage Products', permissions: 'read products' }
                },
                {
                    path: 'add',
                    name: 'products.add',
                    component: AddProduct,
                    meta: { title: 'Add New Product', permissions: 'create products' }
                },
                {
                    path: 'edit/:id',
                    name: 'products.edit',
                    component: EditProduct,
                    meta: { title: 'Edit Product', permissions: 'edit products' }
                },
            ]
        },
        {
            path: '/setting',
            component: Setting,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'role-permission',
                    name: 'role.permissions',
                    component: SetPermission,
                    meta: { title: 'Set Permissions', permissions: 'read permissions' }
                },
            ]
        },
        {
            path: '/expenses',
            component: IndexExpenses,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'expenses.data',
                    component: DataExpenses,
                    meta: { title: 'Manage Expenses', permissions: 'read expenses' }
                },
                {
                    path: 'add',
                    name: 'expenses.create',
                    component: CreateExpenses,
                    meta: { title: 'Add New Expenses', permissions: 'create expenses' }
                },
                {
                    path: 'view/:id',
                    name: 'expenses.view',
                    component: ViewExpenses,
                    meta: { title: 'View Expenses', permissions: 'view expenses' }
                },
                {
                    path: 'edit/:id',
                    name: 'expenses.edit',
                    component: EditExpenses,
                    meta: { title: 'Edit Expenses', permissions: 'edit expenses' }
                },
            ]
        },
        {
            path: '/customers',
            component: IndexCustomer,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'customers.data',
                    component: DataCustomer,
                    meta: { title: 'Manage Customers', permissions: 'read customers'}
                },
                {
                    path: 'add',
                    name: 'customers.add',
                    component: AddCustomer,
                    meta: { title: 'Add New Customers', permissions: 'create customers'}
                },
                {
                    path: 'edit/:id',
                    name: 'customers.edit',
                    component: EditCustomer,
                    meta: { title: 'Edit Customer', permissions: 'edit customers'}
                },
            ]
        },
        {
            path: '/transactions',
            component: IndexTransaction,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'create',
                    name: 'transactions.add',
                    component: AddTransaction,
                    meta: { title: 'Create New Transaction', permissions: 'create transactions' }
                },
                {
                    path: 'view/:id',
                    name: 'transactions.view',
                    component: ViewTransaction,
                    meta: { title: 'View Transaction', permissions: 'view transactions' }
                },
                {
                    path: 'list',
                    name: 'transactions.list',
                    component: ListTransaction,
                    meta: { title: 'List Transaction', permissions: 'list transactions' }
                },
            ]
        }
    ]
});

//Navigation Guards
router.beforeEach((to, from, next) => {
    store.commit('CLEAR_ERRORS') 
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth = store.getters.isAuth
        if (!auth) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router