const User  = require("../models/user");
const bcrypt = require("bcrypt");


exports.login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select("+password");
	if (!user){
		return res.status(400).send({ message: "invalid email or password!" });
	}
	// match the password
	const isPasswordCorrect = await user.isValidatedPassword(password);
	const validPassword = await bcrypt.compare(password, user.password);
	console.log(isPasswordCorrect, validPassword);
	if (!isPasswordCorrect){
		return res.status(400).send({ message: "Invalid email or password!!" });
	}
	const token = user.generateAuthToken();
	res.status(200).send({ data: token, message: "Signing in please wait..." });
}

exports.signup = async (req, res) => {
	const { name, email, password, role, isAdmin } = req.body;
	const user = await User.findOne({ email });
	if (user)
		return res
			.status(403)
			.send({ message: "User with given email already Exist!" });

	const salt = await bcrypt.genSalt(Number(process.env.SALT || 10));
	const hashPassword = await bcrypt.hash(password, salt);
	let newUser = await new User({
		...req.body,
		password: hashPassword,
	}).save();

	newUser.password = undefined;
	newUser.__v = undefined;
	res
		.status(200)
		.send({ data: newUser, message: "Account created successfully" });
}


exports.getAllUsers = async (req, res) => {
	const users = await User.find().select("-password -__v");
	res.status(200).send({ data: users });
}

exports.getUserById = async (req, res) => {
	const user = await User.findById(req.params.id).select("-password -__v");
	res.status(200).send({ data: user });
}

exports.updateUserById = async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200).send({ data: user, message: "Profile updated successfully" });
}

exports.deleteUserById = async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Successfully deleted user." });
}