# Intelage interview app

## Instructions

### Running

Should just be able to run `npm run start` and play with the app locally

### Testing

To run tests, run `npm run test`

## Notes

I went a bit ham with this assignment because I wanted to run my libraries `@doughtnerd/qwizard-react` and `@doughtnerd/wrangler-di` through their paces. This helped me spot a couple type errors with wrangler-di (nothing huge though) and develop a proof-of-concept for JSON serialization/deserialization for qwizard-react, which is a feature I've had on my backlog for a bit. Because of this I did end up altering the fieldset data-structure to be closer to what my library might actually use.

As far as assignment criteria...

Validation:

-   Leverages native browser validation but `@doughtnerd/qwizard-react` does allow custom validators/error messages. Didn't feel it was completely necessary to go that far though, given the fieldset.

Submission:

-   Redirects to thank you page
-   Displays submitted data with same grouping logic as data entry portion
-   Uses a handler method to submit

Responsiveness:

-   Uses Flexbox wrapping for reactivity. Media queries would have been overkill for this but I suppose they would provide some additional UX niceties (if I wanted wrapping to occur earlier than what flexbox does by default for instance).

Other:

-   Unit tested, everything should pass with about 95% coverage. I did skip a couple lines here and there for cases where the code SHOULD never execute within this app or where coverage was reduced due to an interaction with my library that I need to fix (on the library side). Otherwise, the only file I skipped testing for was the http-client, since it's just a dummy client that doesn't actually make requests and was set up purely for demonstrative purposes.
-   Some aria attributes added to form inputs but I didn't do a complete audit. Lighthouse seemed happy with it.
-   Uses Redux. It's minimal but it's there.
-   Uses styled-components for structural components.
