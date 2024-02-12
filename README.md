Project Setup:
1)Download zip from this GitHub repository
2)Extract Zip file on computer
3)Now in root (/taskmanager) folder
Give command on terminal npm install
4) Now move to (/backend) by cd backend in terminal
5) Create .env file
6)in .env file write

PORT=8000
URI={your mongodb uri with taskmanager database and users collection}
JWT_SECRET={Random string}

7)give command node server.js on terminal

8)Now move to frontend (/frontend) folder and run npm install
9) create .env file in frontend and edit it like

REACT_APP_API_URL=http://localhost:8000/

10) Now in frontend folder run command npm start on terminal

Your project will:automatically start on localhost

APIs
