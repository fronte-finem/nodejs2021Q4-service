import { Router } from 'express';

import { User } from './user.model.js';

import { usersService } from './user.service.js';

export const userRouter = Router();

userRouter.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});
