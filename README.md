<<<<<<< HEAD

# Kellerman Database Website
This project was build for the kellerman foundation to handle there grants, donations, and reports.





## Roadmap

- Additional browser support
- Add more integrations
- add indexing to the tables
- fix the reports builder page
- find a better folder structure
- change the look of the web design to more Kellerman feel




## Current Features

- Adding / deleting grants
- Adding / deleting organizations
- view grants / organizations
- database access
- download default excel reports


## Tech Stack

**Client:** Express-handlebars, Bootstraps

**Server:** Node, Express

**Datbase:** MariaDB MySQL
## Run Locally
Download XAMPP
```bash
https://www.apachefriends.org/download.html
```

Start XAMPP and click this actionss
```
Apache
 - start
MySQL
 - start
 - admin
```

Download NodeJs
```bash
https://nodejs.org/en/download/
```

Clone the project

```bash
git clone https://github.com/Fernando4242/kgrantdabase_website.git
```

Run SQL Template to create database on XAMPP
```bash
SQLDatabaseTemplate{current-version}.sql
```

Start the server
```bash
npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```code
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = kgrantdatabasev3 // based on current database version
DB_USER = root
DB_PASS = ''
```

## FAQ

#### Missing dependencies error?
This are the dependencies that should be included in the project
```bash
npm install {dependency}
```
- nodemon
- express-handlebars
- mysql

#### Where is the live website?

The website is in azure. The mentor for the team should know more about uploading the code and any database changes on azure.

#### What is the folder structure?

`view` - is where the HTML lives ( .hbs files).
- `partial` -  are HTML (.hbs) you can use throught many pages kinda like a template
- `layout` - global HTML that is used when building other files ( like a preset look and size of page)
- `{page name}` - has most of the HTML files for that specific page like different form views

For server its usually split based on each page

`server` - any js related to handling the backend ( basically everything )
    
- `controller` - has functions files that handle each POST and GET request on the website
- `routes` - controls which functions to call based on the URL path ( on forms or even web search bar)



## Appendix

https://nodejs.org/en/download/

https://www.apachefriends.org/download.html

https://getbootstrap.com/docs/5.1/getting-started/introduction/

https://handlebarsjs.com/guide/expressions.html

https://www.w3schools.com/sql/

https://learngitbranching.js.org/

https://www.youtube.com/watch?v=1aXZQcG2Y6I&ab_channel=Raddy
## Authors

- [@Fernando4242](https://github.com/Fernando4242)

=======
# Kellermann-Foundation-Website
>>>>>>> 23375941e8b3db211da1db6285c1b2d681a40531
