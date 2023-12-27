import { Router } from 'express';

import {authorizeRoles,isLoggedIn } from '../middlewares/auth.middleware.js';
import { contact, userStats } from '../controllers/miscellaneous.controller.js';

const router = Router();

// {{URL}}/api/v1/
router.route('/contact').post(contact);
router
  .route('/admin/stats/users')
  .get(isLoggedIn, authorizeRoles('ADMIN'), userStats);

export default router;