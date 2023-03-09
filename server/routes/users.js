const router = require("express").Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectId");
const {
    signup,
    login,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
  } = require("../controllers/users");


// create user
router.route("/login",).post(login)
router.route("/signup",).post(signup)
// get all users
router.route("/allusers", admin, ).get(admin, getAllUsers);
// get user by id
router.route("/:id").get(validateObjectId, auth, getUserById)
// update user by id
router.route("/:id").put(validateObjectId, auth, updateUserById)
// delete user by id
router.route("/:id").delete(validateObjectId, admin, deleteUserById)

module.exports = router;