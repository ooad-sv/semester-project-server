# CSCI 5448: Object-Oriented Analysis & Design (OOAD) (Fall 2021)
## Semester Project- Weather Monitoring System

## Team Members
1. Sagar Pathare
2. Vimal Kakaraparthi

## Files to check for the submission (main branch)
1. [Project 7- Final Project Report.pdf](https://github.com/ooad-sv/semester-project-server/blob/main/extras/reports/Project%207-%20Final%20Project%20Report.pdf)
   * Full size class diagram- [annotated-class-diagram.png](https://github.com/ooad-sv/semester-project-server/blob/main/extras/reports/annotated-class-diagram.png)
2. Code Submission-
   * Source code for the backend web server- Current Repository
   * Source code for the Raspberry Pi- [Different Repository](https://github.com/ooad-sv/semester-project-rpi)
3. Demonstration Videos-
   * Demo 1- Hardware [Raw Video in the repo](https://github.com/ooad-sv/semester-project-server/blob/main/extras/demo-videos/Demo%201-%20Hardware.mp4) | [Google Drive Mirror](https://drive.google.com/file/d/18M1ng9kGtxrpY7JnOFLPqM1XpqGR2v40/view?usp=sharing)
   * Demo 2- Software [Raw Video in the repo](https://github.com/ooad-sv/semester-project-server/blob/main/extras/demo-videos/Demo%202-%20Software.mp4) | [Google Drive Mirror](https://drive.google.com/file/d/18kef3RW0zdZmpupEKhaBaMoMb0zJi1gf/view?usp=sharing)

## Technical Specifications
* Node.js >= 12, downloaded from [here](https://nodejs.org/)
* PostgreSQL >= 14 downloaded from [here](https://www.postgresql.org/)

## Steps to run this project
* Install Node and PostgreSQL
* Clone the repository 
* Run `npm i` in the root of the repository
* Copy the `.example.env` to `.env` and replace the environment variables
* Restore DB snapshot from [here](https://nodejs.org/)
* Set `JWT_SECRET_KEY = 393acaebc13559b6440e9d0b5e38246d26bb9de9702f4c5d66eed0eefc75d2223`
* Install nodemon globally if you haven't, using `npm i -g nodemon`
* Start the development server with `npm run dev`

## Acknowledgments
* Bruce Montgomery (Instructor)