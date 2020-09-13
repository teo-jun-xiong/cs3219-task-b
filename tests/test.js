//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Mod = require("../app/models/mod.model");
const dbConfig = require("../config/database.config.js");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

describe("Mods", () => {
  after((done) => {
    mongoose.connection.db.dropDatabase((err) => {
      done();
    });
  });

  it("Cleaning up database", (done) => {
    chai.request(server).get("/mods");
    mongoose.connection.db.dropDatabase((err) => {
      done();
    });
  });

  describe("GET /mods", () => {
    it("should GET all modules", (done) => {
      chai
        .request(server)
        .get("/mods")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("POST /mods", () => {
    it("should not POST one module with a missing code property", (done) => {
      let mod = {
        name: "Software Engineering Principles and Patterns",
        grade: "A",
      };

      chai
        .request(server)
        .post("/mods")
        .send(mod)
        .end((end, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Module code cannot be empty");
          done();
        });
    });

    it("should POST one module", (done) => {
      let mod = {
        name: "Software Engineering Principles and Patterns",
        code: "CS3219",
        grade: "C",
      };

      chai
        .request(server)
        .post("/mods")
        .send(mod)
        .end((end, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("code");
          done();
        });
    });
  });

  describe("GET /mods/:modId", () => {
    it("should GET the module with modId 1", (done) => {
      let modId = 1;

      chai
        .request(server)
        .get("/mods/" + modId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.name.should.be.eql(
            "Software Engineering Principles and Patterns"
          );
          res.body.code.should.be.eql("CS3219");
          res.body.grade.should.be.eql("C");
          done();
        });
    });
  });

  describe("PUT /mods:modId", () => {
    it("should not UPDATE one module with a missing code property", (done) => {
      let modId = 1;
      let mod = {
        name: "Software Engineering Principles and Patterns",
        grade: "A",
      };

      chai
        .request(server)
        .put("/mods/" + modId)
        .send(mod)
        .end((end, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Module code cannot be empty");
          done();
        });
    });

    it("should not UPDATE one module with a non-existent value of code", (done) => {
      let modId = 2;
      let mod = {
        name: "Software Engineering Principles and Patterns",
        code: "CS3219",
        grade: "A",
      };

      chai
        .request(server)
        .put("/mods/" + modId)
        .send(mod)
        .end((end, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Module not found with id " + modId);
          done();
        });
    });

    it("should UPDATE a module of modId 1", (done) => {
      let modId = 1;
      let mod = {
        name: "Software Engineering Principles and Patterns",
        code: "CS3219",
        grade: "A",
      };

      // Update grade from C to A
      chai
        .request(server)
        .put("/mods/" + modId)
        .send(mod)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.name.should.be.eql(
            "Software Engineering Principles and Patterns"
          );
          res.body.code.should.be.eql("CS3219");
          res.body.grade.should.be.eql("A");
          done();
        });
    });
  });

  describe("DELETE /mods:modId", () => {
    it("should not DELETE the module with non-existant modId 2", (done) => {
      let modId = 2;

      chai
        .request(server)
        .delete("/mods/" + modId)
        .end((end, res) => {
          console.log(res.body);
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Module not found with id " + modId);
          done();
        });
    });

    it("should DELETE the module with modId 1", (done) => {
      let modId = 1;

      chai
        .request(server)
        .delete("/mods/" + modId)
        .end((end, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.be.eql("Module deleted successfully!");
          done();
        });
    });
  });
});
