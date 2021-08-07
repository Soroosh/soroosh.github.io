# Good-GUI.de

A DIY tech blog

## Run
run server with `bundle exec jekyll serve --no-watch`

build with `bundle exec jekyll build`


## What to take care of when updating the theme:

### in /
* adapt _config.yml
* restore README.md and LICENSE

### in /data
* restore authors.yml and social.yml

### in /includes
* adapt date in blog/post_info.html

### in /layouts
* add archive and categories to home.html
* Add story.html 

### in /_sass
* add css to base/_global.scss
* adapt .site-header padding and avatar size in includes/_navbar.scss
* Remove the hero image scaling in layouts/_posts.scss and layouts/_blog.scss

### in /assets
* restore own content

### in /pages
* restore own content
* change capitalization of sites in to sort them in the navbar

### also
* Search for %B %-d, %Y and replace with %Y-%m-%d
 

