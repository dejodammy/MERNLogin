const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");


router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({
          status: "user not found",
          message: "Can Not find User",
          errorCode: 404,
        });
    }
    const payload = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    return res
      .status(200)
      .json({ status: "success", message: "message", data: { payload } });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        status: "server error",
        message: "server error",
        statusCode: 500,
      });
  }
});

module.exports = router;
