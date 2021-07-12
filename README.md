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
  - require the credentials of the user to be authenticated (username,password)
  - return user information if successful 
- GET `/api/sessions/current`
  - no parameters
  - check if the current user is authenticated if yes return name and email else return an unnauthenticated user message
- DELETE `/api/sessions/current`
  - log out funcionality 
- GET `/api/memes`
  - no parameters
  - return the list of public memes if the current user is not authenticated or the list of all memes if he is authenticated
- GET `/api/SelfMemes`
  - no parameters
  - return the list of memes belonging to the current authenticated user (user must be authenticated)
- GET `'/api/memes/:id`
  - no parameters
  - return the meme specified by id  with all its attribute ( unlike the list of memes) if the meme was private and the user is not authenticated it return an error
- POST `/api/memes`
  - require the meme to be added attributes (title,image ,texts,alignments,color,font,....)
  - check if layout exists , if not create a layout for the meme (there is a layout table) and than add the meme
- DELETE `/api/memes/:id`
  - no parameters only id
  - delete a meme with id = the specified id only if the meme owner is the authenticated user
- DELETE `/api/likes/:id` / DELETE `/api/dislike/:id`
  - no parameters only id
  - both delete the row associated with current user and memeid=id from like_dislike table (same logic)
- GET `'/api/like_dislike/:id`
  - no parameters only id
  - return the dislike or like event associated with memeid=id and current user , if user didn;t like or dilike the meme return 0

- POST `/api/like/:id`
  - no parameters only id
  - check if previous like or dislike event occured for meme (id) and current user if a like event occured return error
  if a dislike event occured delete it and add the new like event if none occured add the new like event

- POST `/api/dislike/:id`
  - no parameters only id
  - check if previous like or dislike event occured for meme (id) and current user if a dislike event occured return error
  if a like event occured delete it and add the new dislike event if none occured add the new dislike event

- POST `/api/createUser`
  - name,email,password
  - check if email is used , if not create user else return a email is used error message
  
  there is a delete ad put api for user but they are not used

## Database Tables

- Table `users` - contains name ,email, hashpassword
- Table `layout` - contains layout id , the image  , the align1 of text1,align2 of text2,align3 of text3
- Table `memes` - contains meme id , the title  , private,user that the meme belong to , date of creation , text1 , text2 , text3 , font type, color, size of text , layout id that link the meme to its layout of table layout , box attribute wich can be 0 or 1 to specify if the user want a faded black box behind the text in case the background image is too shiny ,nblikes , nb dislikes
- Table `likes` - contains meme_id ,user, like_dislike event  0 for dislike 1 for like 
- 2 Triggers  one for insert into likes and one for delete to update the nb likes and dislikes of the meme 

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
