// get_home, get_songs, find_song, delete_song, post_song

// Import database model
const Folder = require("../models/folders");

//set up mongoose
const mongoose = require("mongoose");

const page_home = (req, res) => {
  Folder.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("home", { folders: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const page_folder = (req, res) => {
  const id = req.params.id;
  Folder.findById(id)
    .then((result) => {
      res.render("folder", { folder: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const select_folder = (req, res) => {
  Folder.findById(req.params.id)
    .then((result) => {
      res.json({ redirect: `/folder/${req.params.id}` });
    })
    .catch((err) => {
      console.log(err);
    });
};

const delete_folder = (req, res) => {
  Folder.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const new_folder = (req, res) => {
  const folder = new Folder(req.body);
  folder
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const new_note = (req, res) => {
  let createId = mongoose.Types.ObjectId();
  createId += "k";
  Folder.findByIdAndUpdate(req.body.folderID, {
    $push: {
      notes: {
        id: createId,
        title: req.body.title,
        body: req.body.body,
      },
    },
  })
    .then((result) => {
      res.redirect(`/folder/${req.body.folderID}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const delete_note = (req, res) => {
  Folder.findByIdAndUpdate(req.params.id, {
    $pull: { notes: { id: req.params.note } },
  })
    .then((result) => {
      res.json({ redirect: `/folder/${req.params.id}` });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  page_home,
  page_folder,
  select_folder,
  delete_folder,
  new_folder,
  new_note,
  delete_note,
};
