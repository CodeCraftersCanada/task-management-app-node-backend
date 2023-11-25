const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	// Get token from the header
	const token =
		req.headers.authorization && req.headers.authorization.split(" ")[1];

	if (!token) {
		return res.status(403).json({
			status: false,
			message: "No token provided. Access denied.",
		});
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next(); // Proceed to the next middleware
	} catch (error) {
		res.status(401).json({
			status: false,
			message: "Invalid token.",
		});
	}
};

module.exports = verifyToken;
