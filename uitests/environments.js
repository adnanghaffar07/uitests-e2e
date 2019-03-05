const getEnv = () => {
    const options = {
        helper: process.env.BROWSERSTACK ? 'WebDriverIO' : 'Puppeteer'
    }
    switch (process.env.ENVIRONMENT) {
        case 'prod':
            options.surveyHost = '';
            options.appHost = '';
            options.apiHost = '';
            break;
        case 'dev':
            options.surveyHost = '';
            options.appHost = '';
            options.apiHost = '';
            break;

        default:
            options.surveyHost = 'http://test.local';
            options.appHost = 'http://testQA.local';
            options.apiHost = 'http://test.local/backend/uitests/api';
    }

    if (process.env.SURVEY_HOST) {
        options.surveyHost = process.env.SURVEY_HOST;
    }

    if (process.env.APP_HOST) {
        options.appHost = process.env.APP_HOST;
    }

    if (process.env.API_HOST) {
        options.apiHost = `${process.env.API_HOST}/backend/uitests/api`;
    }


    return options
}

module.exports = getEnv()
