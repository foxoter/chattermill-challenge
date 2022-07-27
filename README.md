# Chattermill Frontend Coding Challenge

This little app allows you to browse the reviews feed and filter items based on a particular review topic.

The app requires authorization with the following credentials:

- username: `chattermill`,
- password: `SuperSecretChattermillPassword!`

## Running the project

In the project directory, first run `yarn` to install all the dependencies.

Then you can start the project with `yarn watch`.

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) to view it in the browser.

## Data and technologies

### Data

All data is fetched from the Reviews API at
[API link](https://frontend-task.production.cloud.chattermill.xyz/swagger/index.html).

### Technologies

- [React](https://reactjs.org/) - UI library,
- [Axios](https://axios-http.com/docs/) - Data fetching and caching library
- [timeago.js](https://timeago.org/) - Tiny library to display a human-readable relative time difference,
- [React Select](https://react-select.com/) - Select Input control for ReactJS.

## Comments

Comments on decisions made, potential next steps and improvements.

### Decisions made

- Use React.Context for storing Auth state and make that data available for all the routes within the app,
- Use Axios for fetching data to skip a few lines of JSON parsing code and receive a consistent response model,
- Use React Select as a quick solution for enabling typehead search and improving the UX,
- Given the Data model's restrictions, implement a fetching strategy that loads all the available filter options and disables some of them based on the variety of the themes among the reviews list items to prevent the filtering to result in an empty list; an alternative strategy would be to initially fetch the reviews list and then, based on the variety of topics, fetch the necessary filter options one-by-one using the `themes/{id}` endpoint.

### Potential next steps and improvements

- Create a `404` page and handle navigating to an invalid route,
- Handle the data fetching statuses (loading, error, success) in the UI,
- Make use of the URL`s query parameters to enable page's data persistence for link sharing purposes,
- Style the React Select component to follow the design guidelines,
- Implement Unit and Integration test suites.
