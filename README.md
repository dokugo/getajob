## 😱 Just Get a Job Already.

Gets the vacancies in my hometown from the local (`RU`) job search website via headless browser crawling made with [`Puppeteer`](https://github.com/puppeteer/puppeteer). For an example, try to search with the keywords such as `js` or `react`.


###### Please note that if you try to use [`https://getajob.now.sh`](https://getajob.now.sh), you might experience slow first-loading period since the free-tier Heroku instance "gets asleep" if it receives no web traffic in a 30-minute period and takes some time to get itself out of sleep, usually around 15 seconds.

### Run the dev version locally

``` shell
npm install
npm run server
npm run client
```

### Todo 📑

- [ ] **server**
  - [x] async/await crawling core
  - [x] move from cheerio to puppeteer
  - [x] api rate limit
  - [x] spawn chromium pages instead of instances
  - [x] crawling function mutex lock
  - [ ] extend search parameters
  - [ ] try cluster mode
- [ ] **client**
  - [x] form validation
  - [x] double api call blocking
  - [x] infinite scrolling
  - [x] css-in-js styled-components
  - [x] adaptive layout
  - [x] form validation ui elements
  - [x] update color theme
  - [x] create dark theme
  - [ ] extend search parameters ui

### Personal side notes ✍️

<details><summary>In progress</summary>

###### Server:

- rewrite crawling selector to class construct
- include Moscow and SPB
- improve error handling on server
- backend response messages refactoring 
- separate api logic from mutex
- store mutex lock state in redis instead of in-memory 

###### Client:

- data context refactoring
- true lazy loading instead of emulated infinite scrolling
- improve error handling on client
- try load more button
- try pagination
- separate fetch function 
- fade input placeholder on focus

###### Other:

- convert favicon
- setup .env vars
- setup serviceWorker
- setup manifest.json
- check package.json and other config files
- cleanup readme
- update node
- perform depcheck
- configure browserlist
- rename heroku instance

</details>

<details><summary>Completed</summary>

###### Server:

- puppeteer crawling
- puppeteer stealth
- promises to async/await refactoring
- get requests processing
- cleanup getNextPageLoop function
- sort out cors issue

###### Client:

- search ui
- fetch new data by keyword
- data rendering
- color scheme
- check form submission event (/? url param)
- cleanup SVGs
- infinite scrolling loading transition animation
- fade-in vacancies animation refactoring
- balance infinite scrolling height trigger
- (pseudo) request cancellation
- form validation state icons
- disable form button when icon is changed
- research on useContextSelector
- fix search button dark theme color
- increase infinite scrolling items loading
- theme button touch event
- setState toggle refactoring
- ternary refactoring
- find better solution for form loading animation (setTimeout)
- animation context refactoring
- found nothing / end msg refactoring + fade in / out animation

###### Other:

- set npm scripts for running from root folder
- restructure readme
- rename ideas: getajob, xtractor, nxtractor, ncrawler, digger, seeker, pitman, ferret, stylet, scout

</details>