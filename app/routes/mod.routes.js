module.exports = (app) => {
    const mods = require('../controllers/mod.controller.js');

    // Create a new Mod
    app.post('/mods', mods.create);

    // Retrieve all mods
    app.get('/mods', mods.findAll);

    // Retrieve a single Mod with modId
    app.get('/mods/:modId', mods.findOne);

    // Update a Mod with modId
    app.put('/mods/:modId', mods.update);

    // Delete a Mod with modId
    app.delete('/mods/:modId', mods.delete);
}