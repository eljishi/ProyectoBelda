const express = require('express');
const seriesCtrl = require('../controllers/series.controller');
const router = express.Router();

router.get('/',seriesCtrl.getSeries);
router.get('/serie/:id',seriesCtrl.getSerie);
router.post('/',seriesCtrl.addSerie);
router.put('/:id',seriesCtrl.updateSerie);
router.delete('/:id',seriesCtrl.deleteSerie);

router.get('/categorias', seriesCtrl.getCategorias);
module.exports = router;