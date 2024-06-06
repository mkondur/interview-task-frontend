import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import TimetableView from '../views/TimetableView.vue'
import BusLinesView from '../views/BusLinesView.vue'
import BusStopsView from '../views/BusStopsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TimetableView,
    children: [
      {
        path: '/',
        component: BusLinesView,
      },
      {
        path: '/stops',
        component: BusStopsView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
