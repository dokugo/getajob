## ~~Intended functionality~~ Todo

- [ ] server
  - [x] refactor crawling core from promises to async/await
  - [x] get rid of cheerio
  - [ ] puppeteer outgoing requests throttling
  - [ ] incoming api get requests throttling
  - [ ] extend search parameters
  - [ ] crawl only in one chromium instance & in the same tab
- [ ] client
  - [x] form validation
  - [x] infinite scrolling
  - [x] styling refactoring (css-in-js)
  - [ ] adaptive
  - [ ] update color theme
  - [ ] create dark theme
  - [ ] extend search parameters ui

## Todo side notes

#### Reminders:

- found nothing animation
- try load more button
- balance infinite scrolling height trigger
- fade input placeholder on focus
- sort out cors issue
- true lazy loading instead of emulated infinite scrolling
- save search parameters to bookmarks
- get pure links

#### Completed:

###### Server:

- puppeteer crawling
- puppeteer stealth
- promises to async/await refactoring
- get requests processing

###### Client:

- search ui
- fetch new data by keyword
- data rendering
- color scheme
- check form submission event (/? url param)
- cleanup SVGs
- infinite scrolling loading transition animation
- fade-in vacancies animation refactoring
