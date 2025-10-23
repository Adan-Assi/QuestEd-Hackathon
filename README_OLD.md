React Guide
# React guide


NOTE : 
if the app refused to run , try :
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm start


1. install vs code 
2. install node.js :

https://nodejs.org/en

1. select add to path 

![image.png](attachment:76104c87-cc19-458e-8e35-e04da91e2074:image.png)

1. check the installation :

```jsx
node -v
npm -v
```

1. (to create a new react app ) 

```jsx
npx create-react-app my-app
cd my-app

```

1. to start the development server 

```jsx
npm start

```

1. open the project in vs code 

```jsx
code .

```

1. install expo 

```jsx
npm install -g expo-cli

```

1. create react-expo app

```jsx
npx create-expo-app myApp
cd myApp
```

1. run the expo app

```jsx
npx expo start
```

- cd myApp
- npm run android
- npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web

1. install the scss library 

```jsx
npm install --save-dev sass
```

Rename `.css` files to `.scss` to use Sass syntax.

12. install Tailwind

```jsx
npm install -D tailwindcss nativewind
npx tailwindcss init
```

1. edit the tailwind.config.js

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Then in `App.js`

```jsx
import "nativewind/tailwind.css";
```

1. install the matirial UI

```jsx
npm install react-native-paper
```

then in App.js

```jsx
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      {/* Your app goes here */}
    </PaperProvider>
  );
}

```

1.  Install React Navigation 

```jsx
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npm install @react-navigation/native-stack

```

1. install Axios

```jsx
npm install axios

```

(you dont need to create apps unless you want to try things , just Clone the repo i give you )

for our app to work install libraries:

```jsx
npm install recharts
npm install recharts html2canvas jspdf
npm install axios
npm install react-beautiful-dnd
npm install react-beautiful-dnd --legacy-peer-deps
npm install framer-motion
npm install framer-motion --legacy-peer-deps
npm install @iconify/react --legacy-peer-deps
npm install three --legacy-peer-deps
npm install eslint-plugin-jsx-a11y --save-dev --legacy-peer-deps


```
before starting the app :
$$ npm i $$
```
for linux users :

NODE_OPTIONS=--openssl-legacy-provider npm start

# 1. Install Expo CLI globally (with sudo to avoid permission error)
sudo npm install -g expo-cli

# 2. Create a new Expo app (if you haven’t already)
expo init HackatonApp
cd HackatonApp

# 3. Install SASS (for styling support in web only)
npm install --save-dev sass --legacy-peer-deps

# 4. Install TailwindCSS and NativeWind
npm install -D tailwindcss nativewind
npx tailwindcss init

# 5. Install React Native Paper (Material UI for RN)
npm install react-native-paper --legacy-peer-deps

# 6. Install React Navigation
npm install @react-navigation/native --legacy-peer-deps

npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated

npm install @react-navigation/native-stack --legacy-peer-deps

# 7. Axios for API calls
npm install axios --legacy-peer-deps

# 8. Animation + Icons
npm install framer-motion --legacy-peer-deps         # (only works for web)
npm install @iconify/react --legacy-peer-deps        # (only works for web)

 ✅ Optional: If you plan to support Web (expo start --web)
Then you can use:
npm install html2canvas jspdf recharts --legacy-peer-deps

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
