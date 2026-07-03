const express = require('express');
const router = express.Router();

router.use(require('./auth'));
router.use(require('./galpones'));
router.use(require('./produccion'));
router.use(require('./almacen'));
router.use(require('./insumos'));
router.use(require('./molino'));
router.use(require('./ventas'));
router.use(require('./clientes'));
router.use(require('./proveedores'));
router.use(require('./compras'));
router.use(require('./empleados'));
router.use(require('./alertas'));
router.use(require('./reportes'));

module.exports = router;
