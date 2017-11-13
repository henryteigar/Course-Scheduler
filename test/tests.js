const assert = require('assert');
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


describe('Test 3. -> Testing drafts API endpoint', function() {
    it('Adding and removing courses from draft and comparing response sizes.', function(done) {

        let length = -1;
        let contains = false;
        server.get("/api/drafts")
            .end(function(err,res){
                let body = res.body;
                contains = (body.toString()).indexOf("Java Harjutused") !== -1;
                length = Object.keys(res.body).length;
                done();
            });

        if (contains){
            request.delete('http://course-scheduler.me:3000/api/drafts/8');
            server
                .get("/api/drafts")
                .expect("Content-type",/json/)
                .expect(200)
                .end(function(err,res){
                    assert.equal(res.status, 200);
                    assert.equal(Object.keys(res.body).length, (length - 1));
                    request.post('http://course-scheduler.me:3000/api/drafts/8');
                    done();
                });
        }
        else {
            request.post('http://course-scheduler.me:3000/api/drafts/8');

            server
                .get("/api/drafts")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(Object.keys(res.body).length, (length + 1));
                    request.delete('http://course-scheduler.me:3000/api/drafts/8');
                    done();
                });
        }
        });

});


describe("Test 4. -> Testing registered-courses API endpoint",function(){
    it("Should get response from /registered-courses",function(done){
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


describe('Test 5. -> Testing registered-courses API endpoint', function() {
    it('Adding and removing courses from registered-courses and comparing response sizes.', function(done) {

        let length = -1;
        let contains = false;
        server.get("/api/registered-courses")
            .end(function(err,res){
                let body = res.body;
                contains = (body.toString()).indexOf("Multimedia") !== -1;
                length = Object.keys(res.body).length;
                done();
            });

        if (contains){
            request.delete('http://course-scheduler.me:3000/api/registered-courses/8');
            server
                .get("/api/registered-courses")
                .expect("Content-type",/json/)
                .expect(200)
                .end(function(err,res){
                    assert.equal(res.status, 200);
                    assert.equal(Object.keys(res.body).length, (length - 1));
                    request.post('http://course-scheduler.me:3000/api/registered-courses/8');
                    done();
                });
        }
        else {
            request.post('http://course-scheduler.me:3000/api/registered-courses/8');

            server
                .get("/api/registered-courses")
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    // HTTP status should be 200
                    assert.equal(res.status, 200);
                    assert.equal(Object.keys(res.body).length, (length + 1));
                    request.delete('http://course-scheduler.me:3000/api/registered-courses/8');
                    done();
                });
        }
    });

});
