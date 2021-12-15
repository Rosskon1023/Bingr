# Bingr

Bingr is a full CRUD application that allows the user to:
* Personal:
    - Login to their very own Bingr profile
    - Add their own list of movies/shows
        - Maintain and track movies and shows that you have watched (Bing'd it!) or want to watch (Up next!)
    - Rate Bing'd movies and shows and view your watched movie/show ratings
    - Edit ratings and watched status
    - Delete movies/shows from their profile
* Social:
    - Add Friends that have a Bingr account by their username
    - View your friends movies, shows and user ratings
    - Use your friends' pages as a "discover" page and add shows/movies to your list directly from theirs!

## Technologies Used

- MongoDB and Mongoose
- Express Server
- Node.JS
- Bcrypt
- Axios
- JavaScript
- HTML
- CSS
- EJS

## Screenshots

![screenshot 1](https://i.imgur.com/JZFXg6k.png) <!--- Screenshot of the Landing Page -->
![screenshot 2](https://i.imgur.com/q2LbxBf.png) <!--- Screenshot of the Sign Up Page -->
![screenshot 3](https://i.imgur.com/idoptjx.png) <!--- Screenshot of the Dashboard Page -->
![screenshot 4](https://i.imgur.com/IGwNPq0.png) <!--- Screenshot of the Movie/Show Index Page -->
![screenshot 5](https://i.imgur.com/rlSNnZa.png) <!--- Screenshot of the Movie/Show Show Page -->
![screenshot 6](https://i.imgur.com/g5y9GLr.png) <!--- Screenshot of the Movie/Show Ratings Page -->

## Getting Started 
[Click here](https://bingr-app.herokuapp.com/) to get started! Log in to your Bingr account or Sign up for free! 

## Future Enhancements
* User Authentication / User Features 
    - Add a forgot password feature 
    - Add a feature to send an invite link to friends
    - Add a feature to invite friends from contacts list 
    - Add a feature to autocomplete usernames based on usernames registered with Bingr
    - Allow a user to add their subscriptions (Hulu, Netflix, HBOMax, etc)
* Movie / Show Search
    - Autocomplete search for movies/shows
        - if duplicates exist, allow user to select movie/show with additional information (year of release)
* Features Beyond the Scope of OMDB API
    - Add a list of platforms that a show/movie can be watched on (Hulu, Netflix, HBOMax, etc.)
    - Add a link to the movie/show trailers so that a user can watch the trailer if desired
    - Reminders/Notifications when a show is returning for a new season
* Additional Features - Friends
    - Sync friends movie/show lists to your subscriptions so you can see which movies/shows you can easily start Binging
* Additional Features - Social Network
    - Create a main feed that displays all of your friends' recent actions - Shows binged, rated, watched, added to up next, etc. Allow user to like/comment and interact with posts (perhaps called kernel's)
    - Ability to search for a movie/show and display how many friends have seen/rated it (i.e 62 of your 200 friends have watched Squid Game with an average rating of 8.2/10)
    - Ability to create groups and invite other users to a group (i.e. college roommates)
* Additional Features - Movie/Show Finder
    - Create a Dating-App like swipe application that displays movie/show trailers. User is able to swipe left to skip or swipe right to save to a list of trailers they are interested in
        - User can set filters for the trailers they receive (i.e. 1990's movies, oscar-nominated for best-picture, box office >$100MM)