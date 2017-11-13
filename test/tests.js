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
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                assert.equal(res.status, 200);
                done();
            });
    });

});

describe('Test 2. -> Testing drafts API endpoint', function() {
    it('adding courses to draft and comparing response size. Should be bigger by 1', function(done) {

        let length = 0;
        server
            .get("/api/drafts")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                length = Object.keys(res.body).length;
                done();
            });

        request.post('http://course-scheduler.me:3000/api/drafts/8');

        server
            .get("/api/drafts")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                assert.equal(res.status, 200);
                assert.equal(Object.keys(res.body).length, (length + 1));
                done();
            });
        request.delete('http://course-scheduler.me:3000/api/drafts/8');
    });

});

