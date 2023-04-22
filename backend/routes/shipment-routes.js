const express = require('express');
const shipmentsControllers = require('../controllers/shipments-controllers');
const router = express.Router();
const checkAuth = require("../services/check-auth");

router.use(checkAuth);

router.get(
    '/',
    shipmentsControllers.getShipment
);

router.get(
    '/day',
    shipmentsControllers.getScheduleByDay
);

router.post(
    '/',
    shipmentsControllers.createShipment
);

router.post(
    '/inFak',
    shipmentsControllers.createShipmentInFak
);

router.patch(
    '/checklist',
    shipmentsControllers.saveShipment
);

router.patch(
    '/edit',
    shipmentsControllers.updateShipment
);

router.patch(
    '/fakShipment',
    shipmentsControllers.updateShipmentsInFak
);

router.patch(
    '/vessel',
    shipmentsControllers.updateVesselSchedules
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