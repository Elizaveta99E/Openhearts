import { Router } from 'express';
import { getProfile, updateProfile, setUserPassword } from '../controllers/userController';

const router = Router();

router.get('/profile', getProfile);
// router.put('/profile', updateProfile);
// router.post('/set-password', setUserPassword);

export default router;