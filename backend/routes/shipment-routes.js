const express = require('express');
const shipmentsControllers = require('../controllers/shipments-controllers');
const router = express.Router();

router.post(
    '/calendar',
    shipmentsControllers.createShipment
);

router.get(
    '/',
    shipmentsControllers.getShipment
);

router.post(
    '/checklist',
    shipmentsControllers.saveShipment
);

router.post(
    '/edit',
    shipmentsControllers.updateShipment
);

router.post(
    '/inFak',
    shipmentsControllers.createShipmentInFak
);

router.post(
    '/fakShipment',
    shipmentsControllers.updateShipmentsInFak
);

router.delete(
    '/',
    shipmentsControllers.deleteShipment
);

router.delete(
    '/fak',
    shipmentsControllers.deleteShipments
);

router.delete(
    '/fakShipment',
    shipmentsControllers.deleteShipmentInFak
);

module.exports = router;