# Dynamically add or remove markers to Google Map ✨

[Create React App](https://facebook.github.io/create-react-app/) + [Ant Design](https://ant.design) + [Ruby On Rails](https://rubyonrails.org/).

## Design Decisions

- I have decided to use Antd for the UI components as its as per the standards of W3C and also adds an enhanced intuitive UI with minimal effort.
- I split up the layout into 2 halves majorly, where the map occupies major area to showcase the locations mapped on it. Whereas the second half is used to show the makers along with their co-ordinates.
- I have placed the primary action for adding new markers on the right top corner bacuse it always needs to stay right inside the focus of the user to facilitate faster navigation to it. Hence, one can quickly add the data through it.
- I have added a popup or modal to add or update data. I have chosen modal because it does not take the user to a different page to add or update content but rather facilitates him by opening a small section with a field and a button in focus and the rest of the screen gets inactive. This way he would have his primary focus on the search field and can conveniently create or update data.
- The map and right content area quickly updates on Marker addition or deletion and hence a user can quickly check his markers on the screen.
- Also I have shown intuitive notifications for every CRUD operation. This way the user can get notified of all the activities happening on the system.

## Guideline Questions

- How do you handle configuration values? What if those values change?

    Configuration values like the Country, Country Code, Language, Base Url and API Key are stored in respective variables and declared first inside the ruby markers controller file.

- What happens if we encounter an error with the third-party API integration?

    Errors are handled accordingly via a notification describing the Error and its cause.

- Will it also break our application, or are they handled accordingly?

    No, it will not break the application but are handled as notifications to the user with respect to the error occured.

- Now we will need to change the third-party geocoder API to another one. How can we
change our current solution so that we can make this change as seamless as possible? Or
how will we change (or refactor) our solution so that any future changes with the third-party
integration is only done in isolation?

    We can quickly the change the third-party geocoder to anything else involving only a minimal effort of just changing the API URL and it corresponding Key with the new one or if it involves changing other parameters we have a quick access to them at the top of the controller paving a quick acccess to modification. Hardly within an hour or two the API can be updated to a newer one.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
