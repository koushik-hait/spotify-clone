const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");
const {
	addSong,
	getAllSongs,
	updateSongById,
	deleteSongById,
	likeSong,
	getLikedSongs,
	search,
  } = require("../controllers/songs");

// Create song
router.route("/add").post( admin, addSong);

// Get all songs
router.route("/all").get( getAllSongs );

// Update song
router.route("/:id").put( validateObjectId, admin, updateSongById);

// Delete song by ID
router.route("/:id").delete( validateObjectId, admin, deleteSongById);

// Like song
router.route("/like/:id").put(validateObjectId, auth, likeSong);

// Get liked songs
router.route("/liked").get(auth, getLikedSongs);

router.route("/search").get(auth, search)

module.exports = router;