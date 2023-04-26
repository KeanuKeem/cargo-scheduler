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

router.get(
    '/search',
    shipmentsControllers.getSearch
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

module.exports = router;