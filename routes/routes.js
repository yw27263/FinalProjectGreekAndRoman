import express from 'express';

import { loadPage, addPoint, edit, messagePage, del } from '../controllers/pointControllers.js';

export const router = express.Router();

//write a route
router.get("/", loadPage);

router.post("/", addPoint);

//edit
router.get('/:id/edit', edit);

router.post('/:id', messagePage);

//delete
router.post('/:id/delete', del);