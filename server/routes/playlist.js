const router = require("express").Router();
const auth = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectId");
const {
    createPlaylist,
    editPlaylistById,
    addSongToPlaylist,
    removeSongFormPlaylist,
    getUserPlaylist,
    getRandomPlayList,
    getPlaylistById,
    getAllPlaylist,
    deletePlaylistById,
  } = require("../controllers/playlist");


// create playlist
router.route("/create").post(auth, createPlaylist);

// edit playlist by id
router.route("/edit/:id").put(validateObjectId, auth, editPlaylistById);

// add song to playlist
router.route("/add-song").put( auth, addSongToPlaylist);

// remove song from playlist
router.route("/remove-song").put(auth, removeSongFormPlaylist);

// user playlists
router.route("/favourite").get(auth, getUserPlaylist);

// get random playlists
router.route("/random").get(auth, getRandomPlayList);

// get playlist by id
router.route("/:id").get(validateObjectId, auth, getPlaylistById);

// get all playlists
router.route("/all").get(auth, getAllPlaylist);

// delete playlist by id
router.route("/:id").delete(validateObjectId, auth, deletePlaylistById);

module.exports = router;