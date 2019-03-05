const env = require('./environments')

// const env = getEnv();
// const options = getEnv()

// Weird error, tries to resolve relative to module
const factoryDir = '../../../../factories'
const helpers = {
    ApiDataFactory: {
        endpoint: env.apiHost,
        cleanup: true,
        REST: {
            timeout: 100000,
            defaultHeaders: {
                auth: '111111',
            },
        },
        factories: {
            participant: {
                uri: '/participant',
                factory: `${factoryDir}/participant`
            },
        },
    },
};
if (process.env.BROWSERSTACK) {
    helpers.WebDriverIO = {
        url: env.appHost,
        user: 'petersheats3',
        key: 'qr8LWRRrCWtY8bACz9mB',
        browser: 'chrome',
        desiredCapabilities: {
            // 'browserstack.local': true,
            'browserstack.video': true,
            ignoreHTTPSErrors: true,
            acceptInsecureCerts: true,
            acceptInvalidCerts: true,
            acceptSslCerts: true,
        },
    };
} else {
    helpers.Puppeteer = {
        url: env.appHost,
        show: true,
        restart: false,
        keepCookies: true,
        keepBrowserState: true,
        windowSize: '1366x886',
        waitForNavigation: ['networkidle2', 'domcontentloaded'],
        waitForAction: 1000,
        chrome: {
            args: ['--no-sandbox', '--window-size=1366,886'],
        },
    }
}

exports.config = {
    tests: './*/*_test.js',
    timeout: 100000,
    output: './output',
    helpers,
    include: {
        I: './steps_file.js',
        portalPage: './surveys/pages/portal.js',
        surveyPage: './surveys/pages/survey.js',
        loginPage: './insight/pages/login.js',
        createSurvey: './insight/pages/create_survey.js',
        organization: './insight/pages/organization.js',
        insights: './sanity/pages/insight.js',
    },
    bootstrap: false,
    mocha: {
        "reporterOptions": {
            "reportDir": "./output",
            "inlineAssets": true,
        }
    },
    name: 'uitests',
    multiple: {
        // https://www.browserstack.com/automate/capabilities
        latest: {
            browsers: [
                {
                    browser: 'IE',
                    desiredCapabilities: {
                        os: 'Windows',
                        os_version: '7',
                        browserName: 'IE',
                        browser_version: '11.0',
                        resolution: '1280x1024',
                    },
                },
                {

                    browser: 'Edge',
                    desiredCapabilities: {
                        os: 'Windows',
                        os_version: '10',
                        browserName: 'Edge',
                        browser_version: '17.0',
                        resolution: '1280x1024',
                    },
                },
                {
                    browser: 'Chrome',
                    desiredCapabilities: {
                        os: 'Windows',
                        os_version: '10',
                        browserName: 'Chrome',
                        browser_version: '70',
                        resolution: '1280x1024',
                    },
                },
                {
                    browser: 'Safari',
                    desiredCapabilities: {
                        os: 'OS X',
                        os_version: 'High Sierra',
                        browserName: 'Safari',
                        browser_version: '11.0',
                        resolution: '1280x1024',
                    },
                },
            ],
        },
    },
};
