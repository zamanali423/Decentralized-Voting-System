const express = require("express");
const router = express.Router();
const Polls = require("../../database/polls/pollsData");
const authenticate = require("../../middleware/authenticate");

router.get("/results/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // Find polls where the votes array contains an object with the matching userId
    const polls = await Polls.find({
      votes: { $elemMatch: { userId: id } }
    });

    if (polls.length === 0) {
      return res.status(404).json({ msg: "Polls not found" });
    }

    return res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
