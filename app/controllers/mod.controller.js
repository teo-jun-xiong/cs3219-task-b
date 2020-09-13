const Mod = require("../models/mod.model.js");

// Create and Save a new Mod
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    return res.status(400).send({
      message: "Module code cannot be empty",
    });
  }

  // Create a Mod
  const mod = new Mod({
    name: req.body.name,
    code: req.body.code,
    grade: req.body.grade,
  });

  // Save Mod in the database
  mod.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Mod.",
      });
    });
};

// Retrieve and return all Mods from the database.
exports.findAll = (req, res) => {
  Mod.find()
    .then((modules) => {
      res.send(modules);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving modules.",
      });
    });
};

// Find a single Mod with a ModId
exports.findOne = (req, res) => {
  Mod.findById(req.params.modId)
    .then((mod) => {
      if (!mod) {
        return res.status(404).send({
          message: "Module not found with id " + req.params.modId,
        });
      }
      res.send(mod);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Module not found with id " + req.params.modId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving modules with id " + req.params.modId,
      });
    });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body.code) {
    return res.status(400).send({
      message: "Module code cannot be empty",
    });
  }

  // Find mod and update it with the request body
  Mod.findByIdAndUpdate(
    req.params.modId,
    {
      name: req.body.name,
      code: req.body.code,
      grade: req.body.grade,
    },
    { new: true }
  )
    .then((mod) => {
      if (!mod) {
        return res.status(404).send({
          message: "Module not found with id " + req.params.modId,
        });
      }
      res.send(mod);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Module not found with id " + req.params.modId,
        });
      }
      return res.status(500).send({
        message: "Error updating module with id " + req.params.modId,
      });
    });
};

// Delete a Mod with the specified ModId in the request
exports.delete = (req, res) => {
    Mod.findByIdAndRemove(req.params.modId)
    .then(mod => {
        if(!mod) {
            return res.status(404).send({
                message: "Module not found with id " + req.params.modId
            });
        }
        res.send({message: "Module deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Module not found with id " + req.params.modId
            });                
        }
        return res.status(500).send({
            message: "Could not delete module with id " + req.params.modId
        });
    });
};