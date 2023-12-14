const express = require("express");
const router = express.Router();

const statsControllers = require("../Controller/stats-controller");

//GET
router.get("/getStatsDay", statsControllers.getStatsDay);
router.get("/getStatsWeek", statsControllers.getStatsWeek);
router.get("/getStatsMonth", statsControllers.getStatsMonth);
router.get("/getWeekSales", statsControllers.geWeekSales);
router.get("/getMonthSales", statsControllers.getMonthSales);

module.exports = router;
