# Web Development Final Project - *Chairvana*

Submitted by: **Jamar Brown**

This web app: **Chairvana is a niche community forum designed for chair enthusiasts—from ergonomic office setups and luxury gaming chairs to custom wheelchair configurations. It allows users to discover, discuss, and vote on the best "seats" in the house.**

Time spent: **30** hours spent in total

## Required Features

The following **required** functionality is completed:


- [X] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [X] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [X] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [X] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [X] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [X] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [X] List anything else that you added to improve the site's functionality!

- I have included a dislike button
- I have included animated gifs that give the website life for all my webpages and my main page has a different color
- I have also included multiple filters for my app.


## Video Walkthrough

Here's a walkthrough of implemented user stories:

Google Drive Link: https://drive.google.com/file/d/1ksTyB2A-OtA3bycoQaTGNzLWxKaKqW_o/view?usp=sharing

GIF created with QuickTime Player MacOS

## Notes

- **Database Integrity & Foreign Keys:** I hit a major roadblock with a "Foreign Key Constraint" error when trying to delete posts. I realized I couldn't delete a post while it still had comments attached to it. I solved this by going into the Supabase dashboard and setting up a Cascade Delete, ensuring that when I delete a chair post, the associated comments are wiped out too.

- **The "Z-Index" Layering Issue:** One of the most frustrating parts was having my navigation links and buttons visible but not clickable. I discovered my fixed background GIF was acting like an invisible wall over the UI. I fixed this by adjusting the z-index and using pointer-events: none on the background so my clicks could pass through to the buttons.

- **Persistent State for Likes:** Initially, my upvote/downvote counts would reset whenever I refreshed the page. I had to figure out how to bridge the gap between my local React state and the database. I wrote async functions to update the Supabase table every time a user interacts with the buttons, making the engagement permanent.

- **"Equalizing" the Layout:** Because user-submitted descriptions vary in length, my grid cards were originally all different heights, which looked messy. I mastered Flexbox and flex-grow to force the cards to stay the same height and push the comment inputs to the exact same spot at the bottom of every card.

- **Relational Commenting:** I decided to add a comment feature directly on the main feed. This was a challenge because it required managing a separate comments table and linking every new entry to a specific post_id. I also had to write logic to handle both the Enter key and a physical "Post" button for a better user experience.

- **Strict Build Rules (ESLint):** I ran into build errors due to unused variables, like the data object returned by Supabase. I learned how to destructure only the specific error messages I needed to keep my code clean and make sure the project would pass the build process for deployment.

- **Routing & Deployment:** I had to deal with the common React Router "404" issue when refreshing the page on a live site. I fixed this by creating a _redirects file for Netlify, ensuring the server always points back to index.html.

## License

    Copyright [2026] [Jamar Brown]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.