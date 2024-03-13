## Production ready link

https://salla-checkout.netlify.app/

## Notes

UI and functionality implemented as per the requirements.
Used stacks are: tailwindcss, stenciljs and typescript.
Unit test for only static(which have no asset imports) are successfully done.
Other unit tests are failing due to incompatible issue with jest and svg/asset import mocking.
#Tried to build React and Vue wrapper components directory, but the build was failing.

```bash
npm init stencil app
```

and run:

```bash
npm start
```

To build the app for production, run:

```bash
npm run build
```
