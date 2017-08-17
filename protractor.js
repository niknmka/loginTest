
exports.config = {
    framework: 'mocha',
    //seleniumAddress: 'http://localhost:4723/wd/hub', //for iPhone
    seleniumAddress: 'http://localhost:4444/wd/hub', //for web
    specs: ['dist/**/login.spec.js'],
    allScriptsTimeout: 50000,
    mochaOpts : {
        reporter : 'spec',
        timeout  : 90000
    }
    //baseUrl: 'http://localhost:8100/',
    /*capabilities: {
        browserName: 'safari',
        platformName: 'iOS',
        platformVersion: '10.3',
        deviceName: 'iPhone'
    },*/
};