const express = require("express");
const { discoverOpportunities } = require("../../services/opportunityDiscoveryService");

const router = express.Router();

async function getOpportunitiesHandler(req, res) {
  try {
    const careerUrls = Array.isArray(req.query.careerUrls)
      ? req.query.careerUrls
      : req.query.careerUrls
        ? String(req.query.careerUrls).split(",")
        : [];

    const result = await discoverOpportunities({ careerUrls });
    return res.status(200).json({
      opportunities: result.opportunities,
      sourceStatus: result.sourceStatus,
    });
  } catch (error) {
    return res.status(500).json({
      opportunities: [],
      sourceStatus: {
        dashboard: {
          active: false,
          disabled: false,
          error: error.message || "Opportunity discovery failed",
        },
      },
    });
  }
}

router.get("/opportunities", getOpportunitiesHandler);
router.get("/dashboard/opportunities", getOpportunitiesHandler);

module.exports = router;
