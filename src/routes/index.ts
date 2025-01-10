import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from '~pages';

const route = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: route,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach(async (_, __, next) => {
    next();
});

export default router;