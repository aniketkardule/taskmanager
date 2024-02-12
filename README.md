Project Setup: <br>
1)Download zip from this GitHub repository <br>
2)Extract Zip file on computer <br>
3)Now in root (/taskmanager) folder <br>
Give command on terminal npm install
4) Now move to (/backend) by cd backend in terminal <br>
5) Create .env file <br>
6)in .env file write <br>

PORT=8000
URI={your mongodb uri with taskmanager database and users collection}
JWT_SECRET={Random string}
 <br>
 <br>
7)give command node server.js on terminal <br>

8)Now move to frontend (/frontend) folder and run npm install <br>
9) create .env file in frontend and edit it like <br> <br>

REACT_APP_API_URL=http://localhost:8000/
<br><br>
10) Now in frontend folder run command npm start on terminal <br>

Your project will:automatically start on localhost

APIs
