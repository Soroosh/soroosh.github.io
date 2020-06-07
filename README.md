# Because We Code

A DIY tech blog

## Run
run server with `bundle exec jekyll serve --no-watch`

build with `bundle exec jekyll build`


## What to take care of when updating the theme:

* in layout/home.html add archieve and categories

* adapt config.yml

* add css to _global.scss
* adapt _navbar.scss
* change capitalisation of sites in pages/ to sort them in the navbar
* In _utility.scss set padding for header to scale background image height

* Search for %B %-d, %Y and replace with %Y-%m-%d

* Remove the hero image scaling in _posts.scss and _blog.scss
* If needed remove title from nabar in navbar.html