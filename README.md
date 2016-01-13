## Website Performance Optimization portfolio project

This was a challenge project to optimize this sample online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques from the [Critical Rendering Path course from Udacity](https://www.udacity.com/course/ud884).

You can see the original state of the application by going to the parent repository.

### Getting started

You can see the portfolio site by visiting the hosted [github pages](http://aequinn.github.io/frontend-nanodegree-optimization/dist/)

####Part 1: Optimize PageSpeed Insights score for index.html

The challenge was to get the [index.html](http://aequinn.github.io/frontend-nanodegree-optimization/dist/) page to run pull in a score of 90 or better from Google's pageSpeed insights for the mobile page load.
From my testing I was able to get a consistent [96/100 on mobile, you can test it yourself](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Faequinn.github.io%2Ffrontend-nanodegree-optimization%2Fdist%2F).

I also used learned and used [gulp](http://gulpjs.com/) to manage and run my build tasks to package all my [/src](https://github.com/aequinn/frontend-nanodegree-optimization/tree/master/src) code into the final [/dist](https://github.com/aequinn/frontend-nanodegree-optimization/tree/master/dist).


####Part 2: Optimize Frames per Second in pizza.html

The second challenge was to get the Frames per Second in views/pizza.html to 60 fps or higher.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

####Setting this project up for yourself
You can use git to clone this project and use 'npm install' to get gulp and all the dependencies I used.