# Course scheduler for information system at University of Tartu - ÕIS 2
[![Build Status](https://travis-ci.org/henryteigar/course-scheduler.svg?branch=master)](https://travis-ci.org/henryteigar/course-scheduler)  
<br/>
University of Tartu is in progress of developing a new information system for students at university. 
This project's goal is to work out and develop the course registration system which should greatly 
improve the current user experience.
 
## Installation
 
### Requirements
* Node.js - https://nodejs.org/en/

### Installing for testing
* Clone the repository: `git clone https://github.com/henryteigar/course-scheduler.git` 
* Being in the project root, execute `npm install` to install all the dependencies.
* To start the server, run `npm run start`. This should start the server on `http://localhost:3000`
* That's it!

### Installing for development
* Follow the exact steps from previous instructions, except use `npm run dev` not `npm run start`. This will 
start the backend and frontend separately and constantly watch the changes. Frontend should be running on port 8080 and
backend on port 3000.