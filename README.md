# README #

### What is this repository for? ###

* This repository is an implementation of the Google mars rover tech challenge written in Express.js as aa REST api.
* Version: 1.0.0

### Assumptions regarding this challenge ###

* Collision exists.
* A rover cannot be placed on a position that any of the previous rovers have moved to.
* When a rover is going to move to the position of a rover that has moved, the rover will stop and it will not continue with the movement instructions.
* When a rover's next move is out of bounds, the rover will stop and it will not continue with the movement instructions.
* The data is not persisted.
* The system will continue placing rovers even if some of the rovers are invalid.

### How do I get set up ###

1. Make sure that you have the latest verison of [Node.js](https://nodejs.org/en/) and NPM installed. You can check that they are installed by checking their versions:
    * for Node use `node -v` in the terminal (Make sure you have atleast version 9)
    * for NPM us `npm -v` in the terminal
2. Download the zip of the project files and extract it in a folder on your computer.
3. Use a terminal and navigate into the folder where the project files are.
4. Run `npm install` to download all the dependant libraries
5. As a final step, run the tests to make sure everything is in order by typing `npm run test` in your terminal
6. You can now start the server with `npm run start`. The server sould be accessible on `localhost:3000` 
