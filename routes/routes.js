import express from 'express';

import { loadPage, addPoint, edit, pointPage, del } from '../controllers/pointControllers.js';
import { adminEnter } from '../controllers/adminControllers.js';

export const router = express.Router();

//write a route
router.get("/", loadPage);

router.post("/addPoint", addPoint);

router.get('/adminEnter', adminEnter);
//edit
router.get('/:id/edit', edit);

router.post('/:id', pointPage);

//delete
router.post('/:id/delete', del);