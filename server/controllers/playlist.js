const PlayList = require("../models/playList");
const Song  = require("../models/song");
const User = require("../models/user");


exports.createPlaylist = async (req, res) => {

	const user = await User.findById(req.user._id);
	const playList = await PlayList({ ...req.body, user: user._id }).save();
	user.playlists.push(playList._id);
	await user.save();

	res.status(201).send({ data: playList });
}

exports.editPlaylistById = async (req, res) => {

	const playlist = await PlayList.findById(req.params.id);
	if (!playlist) return res.status(404).send({ message: "Playlist not found" });

	const user = await User.findById(req.user._id);
	if (!user._id.equals(playlist.user))
		return res.status(403).send({ message: "User don't have access to edit!" });

	playlist.name = req.body.name;
	playlist.desc = req.body.desc;
	playlist.img = req.body.img;
	await playlist.save();

	res.status(200).send({ message: "Updated successfully" });
}

exports.addSongToPlaylist = async (req, res) => {

	const {playlistId, songId} = req.body
	if(!playlistId && !songId){
		return res.status(400).send({ message: "Provied playlist id and song id" });
	}

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	if (!user._id.equals(playlist.user))
		return res.status(403).send({ message: "User don't have access to add!" });

	if (playlist.songs.indexOf(req.body.songId) === -1) {
		playlist.songs.push(req.body.songId);
	}
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Added to playlist" });
}

exports.removeSongFormPlaylist = async (req, res) => {
	const {playlistId, songId} = req.body
	if(!playlistId && !songId){
		return res.status(400).send({ message: "Provied playlist id and song id" });
	}

	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.body.playlistId);
	if (!user._id.equals(playlist.user))
		return res
			.status(403)
			.send({ message: "User don't have access to Remove!" });

	const index = playlist.songs.indexOf(req.body.songId);
	playlist.songs.splice(index, 1);
	await playlist.save();
	res.status(200).send({ data: playlist, message: "Removed from playlist" });
}

exports.getUserPlaylist = async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlists = await PlayList.find({ _id: user.playlists });
	res.status(200).send({ data: playlists });
}

exports.getRandomPlayList = async (req, res) => {
	const playlists = await PlayList.aggregate([{ $sample: { size: 10 } }]);
	res.status(200).send({ data: playlists });
}

exports.getPlaylistById = async (req, res) => {
	const playlist = await PlayList.findById(req.params.id);
	if (!playlist) return res.status(404).send("not found");

	const songs = await Song.find({ _id: playlist.songs });
	res.status(200).send({ data: { playlist, songs } });
}

exports.getAllPlaylist = async (req, res) => {
	const playlists = await PlayList.find();
	res.status(200).send({ data: playlists });
}

exports.deletePlaylistById = async (req, res) => {
	const user = await User.findById(req.user._id);
	const playlist = await PlayList.findById(req.params.id);
	if (!user._id.equals(playlist.user))
		return res
			.status(403)
			.send({ message: "User don't have access to delete!" });

	const index = user.playlists.indexOf(req.params.id);
	user.playlists.splice(index, 1);
	await user.save();
	await playlist.remove();
	res.status(200).send({ message: "Removed from library" });
}



