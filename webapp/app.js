// Configure require to load from lib subdir by default,
// unless the path is "app"
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app'
    }
});
// Entry point for application. Main logic goes in app/main.js.
requirejs(['app/main']);