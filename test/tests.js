const assert = require('chai').assert;
//const chai = require('chai');
const request = require('request');
const supertest = require("supertest");
//const expect = chai.expect();
//const express = require('express');
//const router = express.Router();

const server = supertest.agent("course-scheduler.me:3000");



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


describe("Test 3. -> Testing drafts API endpoint by adding and removing courses",function(){

    let length = -1;
    let contains = false;

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
            request.post("http://course-scheduler.me:3000/api/drafts/26");

            setTimeout(() =>
                server
                    .get("/api/drafts")
                    .expect("Content-type", /json/)
                    .expect(200)
                    .end(function (err, res) {
                        assert.equal(Object.keys(res.body).length, (length+1));
                        done();
                    }), 500);
        });

        it("Removing courses from draft and comparing response sizes.", function (done) {
            request.delete("http://course-scheduler.me:3000/api/drafts/26");

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
            request.delete("http://course-scheduler.me:3000/api/drafts/26");

            server
                .get("/api/drafts")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, (length-1));
                    done();
                });
        });

        it("Adding courses to draft and comparing response sizes.", function (done) {
            request.post("http://course-scheduler.me:3000/api/drafts/26");

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

/*
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

    let options = {
        body: {
            course_id: 26,
            group_id: 11
        },
        json: true,
        url: "http://course-scheduler.me:3000/api/registered-courses"
    };

    if (!contains) {
        it("Adding courses to draft and comparing response sizes.", function (done) {

            request.post(options);

            server
                .get("/api/registered-courses")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log("pikkus: " + length);
                    assert.equal(Object.keys(res.body).length, (length+1));
                    done();
                });
        });

        it("Removing courses from draft and comparing response sizes.", function (done) {

            request.delete("http://course-scheduler.me:3000/api/registered-courses/26");

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

            request.delete("http://course-scheduler.me:3000/api/registered-courses/26");

            server
                .get("/api/registered-courses")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(Object.keys(res.body).length, (length-1));
                    done();
                });
        });

        it("Adding courses to draft and comparing response sizes.", function (done) {

            request.post(options);

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
*/

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

