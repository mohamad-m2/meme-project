# Exam #2: "Meme Generator"
## Student: s287821 MOHAMAD MOHAMAD

## React Client Application Routes

- Route `/`: redirect to page home/mainPage
- Route `/home/mainPage`: this page show the list of memes (as a preview of each meme) that the user can check , public memes unauthenticated user and all memes for authenticated ones
- Route `/home/mainPage/:id` :this route show the actual meme content of the meme specified with parameter id , further more authenticated users can like or dislike the meme from this page
- Route `/login` :a route for the user to login to his account
- Route `/user` : a route to sign up
- Route `/home/create`: a route for the page where creator generate a meme
- Route `/home/Mymemes`: a route similar to mainPage but it show the list of memes belonging to the current user only 
## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
