# GamerBlog

Welcome to GamerBlog, your ultimate tech and gaming blog platform! This project is designed to provide users with an intuitive interface to manage and interact with tech-related blog posts. Users can register, log in, create, edit, and delete their blog posts while enjoying a responsive and user-friendly experience.

## Table of Contents

1. [Project Overview](#project-overview)

2. [Features](#features)

3. [Technologies Used](#technologies-used)

4. [Setup and Installation](#setup-and-installation)

5. [How to Use](#how-to-use)

6. [API Endpoints](#api-endpoints)

7. [Future Enhancements](#future-enhancements)

8. [My own opinion](#my-own-opinion)

## Project Overview

GamerBlog allows users to explore and manage gaming and tech-related content seamlessly. With secure user authentication and a well-structured admin panel, users can focus on content creation while enjoying a smooth experience. The project is fully responsive and adapts to mobile, tablet, and desktop views.

## Features

- Authentication:

* User registration and login with token-based authentication.
* Secure storage of credentials using localStorage.

- User Management:

* Create, edit, and delete blog posts.
* Manage posts from a personal admin panel.

- Blog Feed:

* Display the latest 12 posts dynamically.
* View individual blog posts with detailed content.

- Responsive Design:

* Optimized for all screen sizes.

- Error Handling:

* Informative error messages for all interactions.
* Loading indicators for API interactions.

## Technologies Used

- Frontend: HTML5, CSS, JavaScript (ES6+)
- API: Noroff Blog API & Noroff Authentication API
- Tools: Figma (design), Github Pages (hosting)

## Setup and Installation

1. Clone the repository:
   `git clone https://github.com/arkuradev/project-exam-1-stein-a.git`
2. Navigate to the project directory:
   `cd project-exam-1-stein-a`
3. Open index.html in your browser or use a local server like Live Server in VS Code.

## How to Use

1. ### Registration/Login:

- Register as a new user or log in with existing credentials.

2. ### Create a Post:

- Navigate to the "New Post" page via the manage panel.
- Fill in the form and click submit.
  3 ### Edit/Delete Posts:
- Access the manage panel to edit or delete your posts.
  4 ### Explore Posts:
- Browse the homepage for the latest posts or go to "Blog" page to see all posts.

## API Endpoints

Base URL: https://v2.api.noroff.dev/blog/posts

- Create Post: POST /${name}
- Edit Post: PUT /${name}/${id}
- Delete Post: DELETE /${name}/${id}
- Fetch latest 12 Posts: GET /${name}?\_limit=12&sort=created&sortOrder=desc

Refer to Noroff API Documentation for more details.

## Future Enhancements

If I had more time on the assignment and this was a project I was doing on my own I would look into the following:

- Include search and filter options.

## My own opinion

This was a challenging but fun project where I learned alot more about API interactions and how they work,
with that in mind I did have some challenges early on with figuring out how to handle the authentication.
But when that got handled everything started flowing very well throughout the rest of the assignment.

I feel like I'm starting to see a pattern now that I have had more then 1 assignment with API interaction, and the process is starting to get more familiar to me.
I'm looking forward to learn more and use more tools to develop better looking websites.

I hope whoever reads this and checks out the website has a joyful experience reviewing and testing out its
functionality.

Enjoy blogging with GamerBlog! 🎮
