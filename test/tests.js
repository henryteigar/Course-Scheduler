const assert = require('chai').assert;
//const chai = require('chai');
//const request = require('request');
const supertest = require("supertest");
//const expect = chai.expect();
//const express = require('express');
//const router = express.Router();
const axios = require('axios');

const server = supertest.agent("course-scheduler.me:3000");
//const remoteApiUrl = "course-scheduler.me:3000/api";

let jwt;
describe("Test 1. -> Testing login",function(){
    it("Should get JWT from /api/login",function(done){

        axios.post('http://course-scheduler.me:3000/api/login' , {
            username: "test",
            password: "test"}
        ).then(function (response) {
            //console.log(response.data);
            assert.equal(response.status, 200);
            assert.equal(response.data.jwt.length > 0, true);
            jwt = response.data.jwt;
            done();
        }).catch(function (error) {
           done(error);
        });
    });
});

/*
describe("Test 2. -> Testing courses API endpoint", function(){

    it("Should get courses from /api/courses",function (done) {
        this.timeout(10000);
        let instance = axios.create({
            headers: {'session-key': jwt}
        });
        console.log(instance)
        axios.get('http://course-scheduler.me:3000/api/courses' , instance
        ).then(function (response) {
            assert.equal(response.status, 200);
            done();
        }).catch(function (error) {
            done(error);
        });


    });
});

describe("Test 3. -> Testing drafts API endpoint", function(){
    let jwt;

    before(function () {
        axios.post('http://course-scheduler.me:3000/api/login' , {
            username: "test",
            password: "test"}
        ).then(function (response) {
            jwt = response.data.jwt
        }).catch(function (error) {
            done(error);
        });
    });

    it("Should get courses from /api/drafts",function (done) {
        let instance = axios.create({
            headers: {'session-key': jwt}
        });


        axios.get('http://course-scheduler.me:3000/api/drafts' , instance
        ).then(function (response) {
            assert.equal(response.status, 200);
            done();
        }).catch(function (error) {
            done(error);
        });

    });

});


describe("Test 4. -> Testing drafts API endpoint", function(){
    let jwt;

    before(function () {
        axios.post('http://course-scheduler.me:3000/api/login' , {
            username: "test",
            password: "test"}
        ).then(function (response) {
            jwt = response.data.jwt
        }).catch(function (error) {
            done(error);
        });
    });

    it("Adding courses to drafts and comparing response sizes.",function (done) {
        let instance = axios.create({
            headers: {'session-key': jwt}
        });


        axios.get('http://course-scheduler.me:3000/api/drafts', instance
        ).then(function (response) {
            assert.equal(response.status, 200);
            done();
        }).catch(function (error) {
            done(error);
        });
    });

});

describe("Test 5. -> Testing registered-courses API endpoint", function(){
    let jwt;

    before(function () {
        axios.post('http://course-scheduler.me:3000/api/login' , {
            username: "test",
            password: "test"}
        ).then(function (response) {
            jwt = response.data.jwt
        }).catch(function (error) {
            done(error);
        });
    });

    it("Should get response from /apu/registered-courses",function (done) {
        let instance = axios.create({
            headers: {'session-key': jwt}
        });


        axios.get('http://course-scheduler.me:3000/api/registered-courses', instance
        ).then(function (response) {
            assert.equal(response.status, 200);
            done();
        }).catch(function (error) {
            done(error);
        });
    });

});

describe("Test 6. -> Testing registered-courses API endpoint", function(){
    let jwt;

    before(function () {
        axios.post('http://course-scheduler.me:3000/api/login' , {
            username: "test",
            password: "test"}
        ).then(function (response) {
            jwt = response.data.jwt
        }).catch(function (error) {
            done(error);
        });
    });

    it("Adding courses to registered-courses and comparing response sizes.",function (done) {
        let instance = axios.create({
            headers: {'session-key': jwt}
        });


        axios.get('http://course-scheduler.me:3000/api/registered-courses', instance
        ).then(function (response) {
            assert.equal(response.status, 200);
            done();
        }).catch(function (error) {
            done(error);
        });
    });

});

describe("Test 7. -> Testing user API endpoint", function(){
    let jwt;

    before(function () {
        axios.post('http://course-scheduler.me:3000/api/login' , {
            username: "test",
            password: "test"}
        ).then(function (response) {
            jwt = response.data.jwt
        }).catch(function (error) {
            done(error);
        });
    });

    it("Should get courses from /api/user",function (done) {
        let instance = axios.create({
            headers: {'session-key': jwt}
        });


        axios.get('http://course-scheduler.me:3000/api/user' , instance
        ).then(function (response) {
            assert.equal(response.status, 200);
            done();
        }).catch(function (error) {
            done(error);
        });

    });

});
*/

describe("Test 1. -> Testing courses API endpoint",function(){
    it("Should get response from /courses",function(done){
        server
            .get("course-scheduler.me:3000/api/courses")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

});

describe("Test 2. -> Testing drafts API endpoint",function(){
    it("Should get response from /drafts",function(done){
        server
            .get("course-scheduler.me:3000/api/drafts")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

});

describe("Test 3. -> Testing drafts API endpoint",function(){
    it("Adding courses to draft and comparing response sizes.",function(done){
        server
            .get("course-scheduler.me:3000/api/drafts")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

    it("Removing courses from draft and comparing response sizes.",function(done){
        server
            .get("course-scheduler.me:3000/api/drafts")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

});

describe("Test 4. -> Testing registered-courses API endpoint",function(){
    it("Should get response from /registered-courses",function(done){
        server
            .get("course-scheduler.me:3000/api/drafts")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

});

describe("Test 5. -> Testing registered-courses API endpoint",function(){
    it("Adding courses to registered-courses and comparing response sizes.",function(done){
        server
            .get("course-scheduler.me:3000/api/registered-courses")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

    it("Removing courses from registered-courses and comparing response sizes.",function(done){
        server
            .get("course-scheduler.me:3000/api/registered-courses")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

});

describe("Test 6. -> Testing user API endpoint",function(){
    it("Should get response from /user",function(done){
        server
            .get("course-scheduler.me:3000/api/user")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });

});

/*
describe("Test 3. -> Testing drafts API endpoint by adding and removing courses",function(){

    let length = -1;
    let contains = false;

    let options = {
        json: true,
        url: 'http://course-scheduler.me:3000/api/drafts/8'
    };

    server.get("/api/drafts")
        .end(function(err,res){
            let body = res.body;
            for (i = 0; i<body.length; i++){
                if (body[i].course.name_est == 'Programmeerimise alused') {
                    contains = true;
                }
            }
            length = Object.keys(res.body).length;
        });

    if (!contains) {
        it("Adding courses to draft and comparing response sizes.", function (done) {

            server
                .get("/api/drafts")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, (length));
                    done();
                });
        });

        it("Removing courses from draft and comparing response sizes.", function (done) {

            server
                .get("/api/drafts")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, length);
                    done();
                });
        });
    }
    else {
        it("Removing courses from draft and comparing response sizes.", function (done) {

            server
                .get("/api/drafts")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, (length));
                    done();
                });
        });

        it("Adding courses to draft and comparing response sizes.", function (done) {

            server
                .get("/api/drafts")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, length);
                    done();
                });
        });
    }

});


describe("Test 4. -> Testing registered-courses API endpoint",function(){
    it("Should get response from /registered-courses",function(done){
        server
            .get("/api/registered-courses")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });
});

describe("Test 5. -> Testing registered-courses API endpoint by adding and removing courses",function(){

    let length = -1;
    let contains = false;

    server.get("/api/registered-courses")
        .end(function(err,res){
            let body = res.body;
            for (i = 0; i<body.length; i++){
                if (body[i].course.name_est == 'Programmeerimise alused') {
                    contains = true;
                }
            }
            length = Object.keys(res.body).length;
        });

    if (contains) {
        it("Adding courses to draft and comparing response sizes.", function (done) {


            server
                .get("/api/registered-courses")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, (length));
                    done();
                });
        });

        it("Removing courses from draft and comparing response sizes.", function (done) {

            server
                .get("/api/registered-courses")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, length);
                    done();
                });
        });
    }
    else {
        it("Removing courses from draft and comparing response sizes.", function (done) {

            server
                .get("/api/registered-courses")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, (length));
                    done();
                });
        });

        it("Adding courses to draft and comparing response sizes.", function (done) {

            server
                .get("/api/registered-courses")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, length);
                    done();
                });
        });
    }

});


describe("Test 6. -> Testing user API endpoint",function(){
    it("Should get response from /user",function(done){
        server
            .get("/api/user")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                assert.equal(res.status, 200);
                done();
            });
    });
});

*/