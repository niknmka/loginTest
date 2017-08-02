exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub', //for web
    framework: 'mocha',
    specs: ['./../dist/**/login.spec.js'],
    allScriptsTimeout: 50000,
    mochaOpts : {
        reporter : 'spec',
        timeout  : 90000
    }
};