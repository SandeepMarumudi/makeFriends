# devTinder
 
 
## auth check
-POST/sign-up
-POST/sign-in
-POST/logout

## profile
-GET/profile/view
-PATCH/profile/update
-PATCH/password/update

## connection requests
-POST/request/send/status/:toUserID
-POST/request/status/received
-GET/request/connection  // get all the requests who are interested
-GET/request/connection  // get all the requests who are accepted

## feed
-GET/profiles -get profiles of all users on the homescreen for sending requests

## profiles viewed over
-GET/profiles  //loading no profiles new 

## interstes
-GET/profiles/photoVerified
-GET/profiles/petLover
-GET/profiles/natureLover
-GET/profiles/longTerm
-GET/profiles/shortTerm
-GET/profiles/foodie