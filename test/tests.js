const assert = require('assert');
//const chai = require('chai');
//const request = require('request');
const supertest = require("supertest");
//const express = require('express');
//const router = express.Router();

const server = supertest.agent("course-scheduler.me:3000");

describe("Test 1. -> Testing courses API endpoint",function(){
    it("Should GET /courses",function(done){
        server
            .get("/api/courses")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                assert.equal(res.status, 200);
                done();
            });
    });

});
/*
describe('Test 2. -> Adding courses to drafts', function() {
    it('checks adding course to drafts', function(done) {
        request.post('/drafts/:8');

        server
            .get("/api/drafts")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                assert.equal(res.status, 200);
                done();
            });

    });

});

*/
