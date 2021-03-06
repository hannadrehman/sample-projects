# Project Management

### For my complete react-redux starter project with test visit [here](https://github.com/hannadrehman/react-redux-starter)


## Read [INSTALL.md](/INSTALL.md) for installation and basic setup guide and how to run

### credential info. 
| username      | password    | role      | description                                   |
| ------------- |:-------------:| -----:  |------------:                                  |
| owner         | any           | owner   | can create a project,list,task,edit list,task |
| manager       | any           | manager | can create list,task,edit list,task           |
| member        | any           | member  | Can only view                                 |

# Project structure 
all Files and Folders in the root directore are described below:

### Folders :
  2. __dist__ : contains final transpiled files that will be deployed on a web server.
  3. __node_modules__ : is the folder where are dependencies are kept.
  4. __src__ : is where all the source code will be written.

### Files in root directory

  1.  [.babelrc](/.babelrc) : configuration file for babel transpiler.to keep the pluguns detalls etc
  2.  [.eslintignore](/.eslintignore) : configuration file that will store the ignored/disabled rules for eslint
  3.  [.gitignore](/.gitignore) : config for git that contains ignore file info. ex we dont want nodemodules to be stored on git
  4.  [.CHANGELOG.md](/.CHANGELOG.md) : all release notes and changes per version will be mentioned here.
  5.  [License.md](/License.md) : license info
  6.  [webpack.config.js](/webpack.config.js) : configuration file for webpack which will have transpile and bundle our project
  7.  [yarn-error.log](/yarn-error.log)  : will contains error logs if occured in yarn execution
  8.  [README.md](/README.md)  : contains usefull info.
  9.  [package.json](/package.json)  : contains all dependency details and also Jest config
  10. [yarn.lock](/yarn.lock)  : lock file created by yarn to make sure all node modules are locked
  11. [INSTALL.md](/INSTALL.md) :has installation instructions

# The Project
#### using cross-env to make set NODE_ENV cross platfom

All of development will be done in "src" folder in the root directory
the src folder has following structure

```
+-- App -- root application that will be load our react app
|    +-- common --  common react components will be created here
|    |    +-- AsyncComponentLoader
|    |    +-- ErrorHandler
|    |    +-- LoadingSpinner
|    |    +-- NavBar
|    |    +-- action.js -- all actions for each commponent
|    |
|    +-- elements --   components that are single elements like textbox,label,dropdown etc are kept here
|    |    +-- TextBox
|    |    +-- CheckBox
|    +-- Routes  --   page level comonents will be kept here
|    |    +-- Home
|    |    +-- Project
|    |    +-- Login
|    |    +-- index.jsx
|    |    +-- reducer.js -- all combined reducers for each commponent
|    +-- scss  --   site top level styling will be kept here 
|    |    +-- _colors.scss
|    |    +-- _mixins.scss
|    |    +-- _variables.scss
|    |    +-- base.scss
|    +-- store  --   redux store initialization and reducers.
|    |    +-- combinedReducer.js -- will combine all components reducers
|    |    +-- configureStore.js --  will create redux store
|    |    +-- logger.js --  a console logger for all store actions and reducers
|    +-- reducer.js  --  reducer function for App component
|    +-- index.jsx --  the entry point or the App component definition .
|
+-- assets --  this folder will have static assets for the application
|    +-- css --  all css libs should placed here
|    +-- images --  images should be kept here
|
+-- services --  will contain helper classes/functions to take common login out of the components
```

### structure for Redux store :

    ```
      +--Store -- root component
      |   +-- App
      |   |   +-- Component
      |   +-- Routes
      |   |   +-- Component

    ```
      our top level reducer will be in App folder. which will combine all the reducers in 
      common and Routes folder. and also it will have its own (App component) reducer functions. 
      finally it will be exported and used in the store.
      the store folder has cominedReducerfile which will import this component and pass it to the 
      redux store.
