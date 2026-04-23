import express from 'express';

import { loadPage, send, edit, messagePage, del } from '../controllers/messageControllers.js';

export const router = express.Router();

//write a route
router.get("/", loadPage);

router.post("/send", send);

//edit
router.get('/:id/edit', edit);

router.post('/:id', messagePage);

//delete
router.post('/:id/delete', del);