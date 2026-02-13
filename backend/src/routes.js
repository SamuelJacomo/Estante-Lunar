const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/livros', controller.getLivros);
router.post('/livros', controller.addLivro);
router.delete('/livros/:id', controller.deleteLivro);

module.exports = router;