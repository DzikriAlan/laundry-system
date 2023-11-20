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
                    meta: { title: 'Manage Couriers' }
                },
                {
                    path: 'add',
                    name: 'couriers.add',
                    component: AddCouriers,
                    meta: { title: 'Add New Courier' }
                },
                {
                    path: 'edit/:id',
                    name: 'couriers.edit',
                    component: EditCouriers,
                    meta: { title: 'Edit Courier' }
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
                    meta: { title: 'Set Permissions' }
                },
            ]
        },
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