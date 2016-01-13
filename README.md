## Website Performance Optimization portfolio project

This was a challenge project to optimize this sample online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques from the [Critical Rendering Path course from Udacity](https://www.udacity.com/course/ud884).

You can see the original state of the application by going to the parent repository.

### Getting started

You can see the portfolio site by visiting the hosted [github pages](http://aequinn.github.io/frontend-nanodegree-optimization/dist/)

####Part 1: Optimize PageSpeed Insights score for index.html

The challenge was to get the [index.html](http://aequinn.github.io/frontend-nanodegree-optimization/dist/) page to run pull in a score of 90 or better from Google's pageSpeed insights for the mobile page load.
From my testing I was able to get a consistent [96/100 on mobile, you can test it yourself](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Faequinn.github.io%2Ffrontend-nanodegree-optimization%2Fdist%2F).

I also used learned and used [gulp](http://gulpjs.com/) to manage and run my build tasks to package all my [/src](https://github.com/aequinn/frontend-nanodegree-optimization/tree/master/src) code into the final [/dist](https://github.com/aequinn/frontend-nanodegree-optimization/tree/master/dist).
Many of the tasks helped in achieving the optimization score, like resizing and compressing images. The other major changes to achieve this score included:
- Inlining CSS to reduce critcal path to render
- Removing font imports
- Moving javascript files to load at the end of the page and marking them as 'async' to allow rendering to continue as none of the scripts were critical.


####Part 2: Optimize Frames per Second in pizza.html

The second challenge was to get the Frames per Second in [views/pizza.html](http://aequinn.github.io/frontend-nanodegree-optimization/dist/views/pizza.html) to 60 fps or higher.

The main culprits that pushed frames per Second below 60 frames were inefficient snippets of code that resulted in forced synchronous layout.
A brief explination of how this was fixed:
#####Simplified changePizzaSizes(size) function
Rather than have wto functions I combined them simplifying and reducing the number of times the following calculation had to be made
- Calculating size to a width: Instead of calling it for every one of the 100 pizzas, it is called once. It uses a % instead of set px.
- Got the collection of DOM elements to be iterated over once, instead of for each iteration through the list of 100 objects.

#####Simplified updatePosition() function
Onscroll there are a large number of pizzas that get updated in the background of the page. The function to update the position of these
pizzas to create the movement was very inefficient. The big changes to get fps down included:
- Getting the collection of elements to iterate over once. 
- Getting some properties that would not change and be used frequently once instead of for each instance. Primarily the 'scrollTop' variable for how far the user had scrolled.
- Creating a calculation to get the 'basicLeft' property instead of reading the property from DOM.
- Reduced the number of elements the created and that needed to be iterated over, the 200 generated seemed excessive given the screen size most people would view the site on.
 
####Setting this project up for yourself
You can use git to clone this project and use 'npm install' to get gulp and all the dependencies I used.