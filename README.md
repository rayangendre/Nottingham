# Welcome to Nottingham! We are the leader in faux stock trading.

# 308-project

## The Project Structure

### Frontend

The Frontend folder holds all of the files needed to run the frontend of the application. More information on running the Frontend can be found in the Readme of the Frontend section

### Backend

The Backend folder holds all of the files needed to run the Backend of the application. More information on running the Frontend can be found in the Readme of the Frontend section

### Code Linting

Before every commit prettier is automatically run in order to fix formatting issues with the code and abide to coding standards. The precommit commands can be found in the .husky folder

### Home Folder setup

npm install needs to be run in the root directory to install the prettier dependencies to do the code linting required

### CI/CD

Our CI CD is built with a combination of github actions, github pages, and heroku. Our github workflow yml file located in the .github/workflows folder details the parrallel builds that happen to deploy the Frontend and the Backend. The Frontend is deployed onto github pages. The Backend is deployed onto heroku and the backend tests are run in the pipeline to ensure that all code is running at the moment. Secrets are included and stored under settings that hold the enviroment variables that are used in the Frontend which are pulled and stored on build. The environment variables for the backend are stored directly in Heroku again under settings

## External Links

### Storyboard link: https://www.figma.com/file/rA9JkMK6FzikNOncbG1QAZ/Nottingham?node-id=0%3A1

### Design Document link: https://docs.google.com/document/d/1EZv8KlK8MhqdjzQw7LLkBuAZQAf5MFiTjIGeAwOhu_s/edit?usp=sharing

### CD - Frontend Link: https://rayangendre.github.io/Nottingham/

We are experiencing problems on reload as github pages are not meant to handle wesbites as such. If you reload and experience a 404 error, revert back to this link

### CD - Backend https://nottingham-csc309.herokuapp.com/
