import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Product from '../views/Product'
import Test from '../views/Test'
import ProductDtl from '../views/ProductDetail'

Vue.use(VueRouter)

export default function createRouter() {
    return new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'home',
                component: HomeView
            },
            {
                path: '/product',
                name: 'product',
                component: Product
            },
            {
                path: '/test',
                name: 'test',
                component: Test
            },
            {
                path: '/ProductDtl',
                name: '상품상세',
                component: ProductDtl
            }
        ]
    })
}
