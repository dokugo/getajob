## ~~Intended functionality~~ Todo

- [ ] server
  - [x] refactor crawling core from promises to async/await
  - [x] get rid of cheerio (puppeteer eval instead)
  - [x] incoming api get requests throttling (rate limit)
  - [x] run single crawling async function per client (mutex)
  - [x] spawn chromium pages insted of instances
  - [ ] extend search parameters
  - [ ] try cluster mode
- [ ] client
  - [x] form validation
  - [x] api call (pseudo) throttling
  - [x] infinite scrolling (without lazy loading)
  - [x] styling refactoring (css-in-js styled-components)
  - [x] adaptive layout
  - [x] improve interface logic
  - [x] update color theme
  - [x] create dark theme
  - [ ] add more functional interface elements
  - [ ] extend search parameters ui

## Todo side notes

#### Reminders:

- include Moscow and SPB
- set npm scripts for running from root folder
- improve error handling on server
- backend response messages refactoring 
- separate api logic from mutex
- store mutex lock state in redis instead of in-memory 

- data context refactoring
- true lazy loading instead of emulated infinite scrolling
- improve error handling on client
- try load more button
- try pagination
- separate fetch function 
- fade input placeholder on focus
- sort out cors issue
- configure browserlist

- cleanup readme
- update node
- perform depcheck
- check package.json and other config files
- rename ideas: xtractor, nxtractor, ncrawler
- try RYM crawling

#### Completed:

###### Server:

- puppeteer crawling
- puppeteer stealth
- promises to async/await refactoring
- get requests processing
- cleanup getNextPageLoop function

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

## bigger scale: implement large data amounts crawling toolkit

- [ ] admin panel
  - [ ] scheduling
  - [ ] log monitor
  - [ ] data downloading
  - [ ] custom data rendering (e.g. for a specific site)
- [ ] backend
  - [ ] try pure async requests instead of puppeteer
  - [ ] try cluster mode and worker threads
  - [ ] increase live data crawling pace
  - [ ] connect to the db
  - [ ] write data to file system
  - [ ] new scrapped data parsing methods

- research on a faster fresh data collection methods (push, concat, spread, batching transactions)