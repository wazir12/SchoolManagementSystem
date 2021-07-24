# SchoolManagementSystem

Prerequisites:
1. install npm 
2. node js,
3. install visual studio code
4. install eclipse IDE 
5. install java 

Please refer to the following video which running frontend and backed app:In this i walk through the entire setup:
https://www.youtube.com/watch?v=_HTMtAdfZyo

For Deploying the Frontend, Follow the following steps:

1. unzip the schoolManagment.zip folder
2. goto frontend folder  
        --> open terminal/cmd and goto the frontend folder in the unzip folder and run the following commands:
                a. npm install
                b. npm start
3. The frontend application will automatically launch in chrome on http://localhost:4500/login

For Deploying backend, Follow the following steps:
1. unzip  the schoolManagment.zip folder.. if not already done
    a.  you will see the following folder structure
            -SchoolManagmentSystem
                -backend
                    -schoolManagementSystem 
                        -src
                            -main
                               -java
                                    -com.lwazir.project.schoolManagementsystem
                                        -controllers
                                        -errors
                                        -jwt
                                        -model
                                        -repository
                                        -utility
                                        -SchoolManagementsystemApplication.java  [this is the main file that has to be run after importing the project in Eclipse.. the installation process is explained below]
                            -test
                        -target
                        -pom.xml
                -frontend
                    -public
                    -src
                    -package.json
                    
2.  Install Eclipse IDE and Java 8
3. open eclipse IDE
        - it will ask for a worksapce ---Just create a blank folder any where on your machine and while selecting workspace give that path of it there.
        -After selecting  and intialization of the workspace
            .--> goto file in the tool bar menu of  eclipse IDE-
                    -->goto import 
                            --> window will popup
                            --> select maven 
                            --> select existing maven project
                            --> Here you have to browse to the location where you have unzipped the zipped file and select the path upto 
                                     -Backend/schoolManagementsystem
                            --> please note: that while importing the maven project please select the path upto the folder that is containing the pom.xml file
                            --> After succesfully importing the project go to the SchoolManagementsystemApplication.java file in  the com.lwazir.project.schoolManagementsystem package 
                            ---> after selecting and opening the file 
                                    ---> Right Click on the file 
                                                --> A menu will appear
                                                --> select run as --> select Java  Application
                                    ----The application will launch on Localhost:9000
    4. Once the server is running you can login into the front end application  using the following credentials:
    
        1.  Admin : 
            username: lwazir
            password: 1234
        2. Pupil: 
            username:username5
            password: 1234
        3. Teacher
            username: teacher
            password: 1234
            
5. Once server is running , you can also access the H2 Database on the following url:
        --http://localhost:9000/h2-console/login.jsp
        --if it prompts for username and password or only password --> just leave it blank and login
6. You can also access the api Documentation on the following url:
        1.http://localhost:9000/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config.
        2.https://bit.ly/3xuIokc 
        



