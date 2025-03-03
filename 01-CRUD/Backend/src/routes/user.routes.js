import { Router } from 'express';
import { createUser, getUsers, validateUserCredentials} from '../controller/user.controller.js';

const router = Router();

router.post('/', createUser);
router.post('/login', validateUserCredentials);
router.get('/', getUsers);
export default router;
