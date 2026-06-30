router.post("/google", async (req, res) => {
  try {
    const { email, name, photo, uid } = req.body;

    // 1. check if user exists
    let user = await User.findOne({ email });

    // 2. if not create user
    if (!user) {
      user = await User.create({
        name,
        email,
        photo,
        googleId: uid
      });
    }

    // 3. generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Google auth failed" });
  }
});