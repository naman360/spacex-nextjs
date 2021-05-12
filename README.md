## Tech Stack:-

NextJS(for server side rendering purpose), Vercel(for deployment)

## Approach:-

Main `index.js` component makes and API call that is server side rendered using `getServerSideProps()` method offered by NextJS. The design layout is responsive and designed using mobile-first approach. Now as far as filters are concerned, it gets stored in the local state of the component and makes an API call on every filter applied and thus populates the screen with refreshed data without any page refreshes. <br>
Additionally webpack plugins are used to minify the bundle for optimization purposes.

## Lighthouse Reporter

Performance - 98
Accessibility - 96
SEO - 100
