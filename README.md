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
  - [ ] add more functional interface elements
  - [ ] create dark theme
  - [ ] extend search parameters ui

## Todo side notes

#### Reminders:

- cleanup getNextPageLoop function
- improve error handling on server
- backend response messages refactoring 
- separate api logic from mutex
- store mutex lock state in redis instead of in-memory 

- animation context refactoring
- improve error handling on client
- data context refactoring
- increase infinite scrolling items loading 
- true lazy loading instead of emulated infinite scrolling
- try load more button
- try pagination
- find better solution for form loading animation (setTimeout)
- separate fetch function 
- found nothing / end msg refactoring + fade in / out animation
- ternary refactoring
- setState toggle refactoring
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

###### Client:

- disable form button when icon is changed
- research on useContextSelector
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

#### Discarded:

- puppeteer next page requests throttling
<!-- - form validation state icons -->

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