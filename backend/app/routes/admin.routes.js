const { Router } = require('express');
const { getBlurredWord, addBlurredWord, deleteBlurredWord} = require('../controllers/admin.controller');
const adminRouter = Router();

adminRouter.get('/blurred-word', getBlurredWord);
adminRouter.post('/add-blurred-word', addBlurredWord);
adminRouter.post('/remove-blurred-word', deleteBlurredWord);

module.exports = adminRouter;