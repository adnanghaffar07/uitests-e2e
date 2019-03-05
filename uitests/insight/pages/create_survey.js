const I = actor();

module.exports = {

    // insert your locators and methods here
    fields: {
        survey_name: 'input#surveyName',
        start_date: 'input#start',
        end_date: 'input#end',
        es_lang: 'input[name=language_es]',
        en_lang: 'input[name=languages]',
        timezone: '.jss327.jss330.jss319.jss304',
        submit_button: 'button[type="submit"]',
        back_button: 'Back',
        question: 'input[name="questionText"]',
        answer: 'input[name="answer-0"]',
        answer_1: 'input[name="answer-1"]',
        answer_2: 'input[name="answer-2"]',
        email_field: 'input[name="sendTestMessage"]',
        phone_number: '#sendTestMessage-sms'

    },
    buttons: {
        submit_button: 'button[type="submit"]',
        add_choice_button_1: {xpath: '//div[2]/div[4]/button[1]'},
        add_choice_button_2: {xpath: '//div[6]/button[1]'},
        add_choice_button_3: {xpath: '//div[8]/button[1]'},
        delete_choice_field_3: {xpath: '/html[1]/body[1]/div[2]/div[2]/form[1]/div[2]/div[2]/div[7]/button[1]/span[1]'},
        delete_choice_field_2: {xpath: '/html[1]/body[1]/div[2]/div[2]/form[1]/div[2]/div[2]/div[5]/button[1]/span[1]/*'},
        demographics: {xpath: '//div[2]/div[1]/div[1]/div[1]/div[1]/h6[1]'},
        demographics_add_question: {xpath: '//li[14]/button[1]'},
        send_email_button: {xpath: '/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/form[1]/div[1]/div[1]/div[2]/button[1]/span[1]/*'},
        send_sms_button: {xpath: '/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[4]/div[1]/form[1]/div[1]/div[1]/div[2]/button[1]/span[1]/*'},
        demegraphic_button: {xpath: '//div[2]/div[1]/div[1]/div[1]/div[1]/h6[1]'},
        uncategorized_button: {xpath: '//div[6]/div[1]/div[1]'},
        save_statement_button: {xpath: "//div[3]/button[2]"},
        add_question_button: {xpath: "//li[14]/button[1]"},
        question_cancel_button: {xpath: "//form/div[3]/button[1]"},
        first_survey_link: {xpath: "//div[2]/div[1]/a[1]/h6[1]"},
        userName: {xpath: "//div[2]/div[1]/ul[1]/li[1]/a[1]"},
        logout: {xpath: "//div[1]/div[1]/ul[1]/li[1]/a[1]"}

    },
    async logout() {
        I.click(this.buttons.userName);
        I.click(this.buttons.logout);
    },
    // introducing methods
    fillName(data) {
        I.fillField(this.fields.survey_name, data.survey_name);
    },


    fillDates(data) {
        console.log(data);

        //I.fillField(this.fields.start_date, data.start_date);
        I.click(this.fields.start_date);
        I.waitForElement({xpath: "//span[text()='" + data.day + "']"});
        I.click({xpath: "//span[text()='" + data.day + "']"});

        I.waitForElement({xpath: "//span[text()='" + data.hour + "']"});
        I.click({xpath: "//span[text()='" + data.hour + "']"});

        I.waitForElement({xpath: "//span[text()='" + data.min + "']"});
        I.click({xpath: "//span[text()='" + data.min + "']"});


        I.click('OK');
        //I.fillField(this.fields.end_date, data.end_date);
        I.click(this.fields.end_date);
        //I.waitForElement('.jss597');
        I.click('OK');

    },

    selectLanguage() {
        I.click(this.fields.es_lang);
    },
    unSelectLanguage() {
        I.click(this.fields.en_lang);
        I.seeCheckboxIsChecked(this.fields.en_lang)
    },

    getDateTimeForSurvey() {
        return this.calcTime('-8');

    },
    calcTime(offset) {
        // create Date object for current location
        var d = new Date();

        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000 * offset));
        nd.setMinutes(nd.getMinutes() + 30);

        var min = Math.ceil(nd.getMinutes() / 5) * 5;
        if (min === 60) {
            min = '00';
        }
        if (min === 5) {
            min = '05';
        }
        return {
            day: nd.getDate(),
            // hour: nd.getUTCHours(),
            hour: ((nd.getHours() % 12 || 12) < 10 ? '' : '') + (nd.getHours() % 12 || 12),
            min: min
        };
    },


    async checkEmailSent(client, serverId, latestEmail) {
        var email = await client.messages.waitFor(serverId, {
            sentTo: latestEmail
        });
        return email.html.links[0].href;
    },
    generateRandomNumber() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    async saveDesignData() {
        // after login verify that login is success
        I.waitForText('Surveys', 10);
        // Redirected to surveys page
        I.amOnPage('/surveys');
        // Verify that surveys page is opened
        I.waitForText('Create New Survey', 10);
        // Redirected to Create new Survey Page
        I.click('Create New Survey');
        // Verify that create new survey page is opened
        I.waitForText('Create New Survey', 10);
        let data = {
            survey_name: 'Design Survey - ' + this.generateRandomNumber()
        };
        this.fillName(data);
        // Click on Save and Continue
        await I.click(this.fields.submit_button);
    },
    w(element) {
        I.waitForElement(element, 10)
    },
    fillData(field, data) {
        this.w(field);
        I.scrollTo(field);
        I.fillField(field, data);
    }
};
