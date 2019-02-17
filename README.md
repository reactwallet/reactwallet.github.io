Deployed for demo purposes at https://reactwallet.github.io/.

React Wallet is a simple PoC for a web app made with React and Redux. It is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Material-UI](https://material-ui.com).

In the app we can add and store multiple currencies each with its own balance. For each currency we can `Deposit` and `Withdraw` funds as well as `Exchange` to another currency that we have previously added.

We can set a default currency which will be used for calculating the total balance from all available currencies in the wallet. Currency rates are fetched from the [Exchange Rates API](https://exchangeratesapi.io/) when the app is loaded or when new currency is added.

All actions and data are saved in the `localStorage` so that everything is available after refreshing the browser. The `History` page shows all actions that we've made. And the `Reset Data` button will remove everything from the state and the localStorage.

Tests are incomplete and shown just as an example.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in dev mode (auto reloads on file changes and shows lint errors in the console).

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

There are only a few simple tests for showing the setup.

### `npm run build`

Builds the app for production to the `build` folder.

It optimizes the build for the best performance. The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This setup uses the default config from [Create React App](https://github.com/facebook/create-react-app). If any customization is needed, we can `npm run eject` which will remove the single build dependency from the project.

Then it will copy all the configuration files and dependencies (Webpack, Babel, ESLint, etc) right into the project so that we have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts.

There is no need to use `eject` if we are happy with the default config.

## Learn More

For more info about the setup check [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
