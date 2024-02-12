<h1>Task Manager Application</h1>
features: <br>
backend: Express, Authentication, Middlewares, Validators, JWT, Cookies <br>
frontend: React, Tailwind CSS, Toastify, React-redux, State Management
<br><br>
Hosted Application: https://taskmanager-mmwt.onrender.com/
Hosted Backend: https://taskmanager-backend-1pvp.onrender.com
<br><br>

<h2>Project Setup: <h2>
1)Download zip from this GitHub repository <br>
2)Extract Zip file on computer <br>
3)Now in root (/taskmanager) folder <br>
Give command on terminal npm install
4) Now move to (/backend) by cd backend in terminal <br>
5) Create .env file <br>
6)in .env file write <br>

PORT=8000
URI={your mongodb uri with taskmanager database and users collection} <br>
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

| API           | Method        | Usage         | Body          |
| ------------- | ------------- | ------------- | ------------- |
|  baseurl/tasks | post  | create new task | task_name: string, start_date : date, end_date : date, status : string, details : string
|  baseurl/tasks/id | put  | update task | id: number
|  baseurl/tasks/id | delete  | delete task | id : number


hosted backend api (baseurl) : https://taskmanager-backend-1pvp.onrender.com <br>
<br>
this api use authentication so user to be authenticated before trying apis  <br> <br>

for authentication first use APIs <br> <br>
| API           | Method        | Usage         | Body          |
| ------------- | ------------- | ------------- | ------------- |
|  baseurl/users/register | post  | create new user | name: string, email : string, password: string
|  baseurl/users/login | post  | login user | email: string, password: string


