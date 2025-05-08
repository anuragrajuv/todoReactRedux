# React Todo List with Redux

This project is a simple Todo List application built using React and Redux Toolkit. It demonstrates the use of Redux for state management in a React application.

## Project Structure

The project is organized as follows:

```
todo_redux_react/
    package.json
    README.md
    public/
        favicon.ico
        index.html
        logo192.png
        logo512.png
        manifest.json
        robots.txt
    src/
        App.js
        index.css
        index.js
        logo.svg
        app/
            store.js
        features/
            todo/
                todoSlice.js
                Loader/
                    Loader.css
                    Loader.js
                TodoForm/
                    TodoForm.css
                    TodoForm.js
                TodoList/
                    TodoList.css
                    TodoList.js
```

## Features

- Add, edit, and delete todos.
- Mark todos as completed.
- State management using Redux Toolkit.
- Modular and reusable components.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Learn More

To learn more about React and Redux, check out the following resources:

- [React documentation](https://reactjs.org/)
- [Redux documentation](https://redux.js.org/)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/)
