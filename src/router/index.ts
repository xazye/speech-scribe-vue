/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [{
  path: '/',
  children: [
    {
      path: '',
      name: 'home', 
      components: {
        default: HomePage, 
      },
    },
    {
      path: '',
      name: 'transcribePage',
      components: {
        default: () => import('@/pages/TranscribePage.vue'),
      },
    },
    {
      path: '',
      name: 'resultsPage',
      components: {
        default: () => import('@/pages/ResultsPage.vue'),
      },
    },
    {
      path: '',
      name: 'filePage',
      components: {
        default: () => import('@/pages/FilePage.vue'),
      },
    },
  ],
}]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
