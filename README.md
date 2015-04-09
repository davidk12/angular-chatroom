<<<<<<< HEAD
# Angular chatroom

## How to use

```
**NOTE**: It is expected that you have python, node, grunt and bower installed.

$ bower install -g angular
$ bower install angular-route
$ bower install bootstrap
$ bower install jquery

$ npm install
$ node chatserver.js
Run the runclient.bat to run the webserver.
```

Now open up your browser and point it to http://localhost:8090 . 

## Features
- Users can join a room entering a unique username.
	* the user can either click choose "signout" or reload the page to free up his username and signout
- Users can type messages to the specific room.
- Users can create or join a room.
	* if the requested room doesn't exist, it is created 
- Users can send private messages to each other.
	* To send a private message, a username must be chosen on the right in the userlist
	* a user cannot send another user a private message unless they share a room
- For the rooms to update the user has to click on some room in the room list.
=======
# angular-chatroom
Chatroom created in Angular
>>>>>>> 92ed0c049b9ff956b3079b5f226d765aa8470539
