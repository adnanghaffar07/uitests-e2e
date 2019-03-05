const env = require('../environments');
Feature('Create survey').timeout(5000).config(env.helper, {url: env.appHost});
const users = require('../providers/login-data.js');

const libraries = require('../providers/libraries.js');


const MailosaurClient = require('mailosaur');
const client = new MailosaurClient(libraries.Mailosaur.clientId);
const serverId = libraries.Mailosaur.serverId;
let latestEmail = libraries.latestEmail(client);
let invitationLink;

BeforeSuite(async (I, loginPage,organization) => {
    // Login before test begin
        I.amOnPage('/');
        I.w('#email');
        await loginPage.sendForm(users.insight.email, users.insight.password);

});

Scenario('As a Customer Admin user, I click on Save And Continue button without filling Survey Name field @empty_fields', async (I) => {

    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    // Click on Save and Continue
    I.click('Save and Continue');
    // Verify Survey form validation is working
    I.wSee('Survey Name is required');
    // Verify that page in not redirected to Configure questions page
    I.dontSeeInCurrentUrl('questions');
});
//Fill Name
Scenario('As a Customer Admin, I enter the Survey Name @fill_name', async (I, createSurvey) => {
    //data for form.
    let data = {survey_name: 'Survey Name'};
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    createSurvey.fillName(data);
});
//Fill Date
Scenario('As customer admin, I select the time period for Survey Start and Survey End Date @dates', async (I, createSurvey) => {
    //data for form.
    let data = createSurvey.getDateTimeForSurvey();
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');

    //I.click(createSurvey.fields.start_date);



    createSurvey.fillDates(data);

    //I.wait(90)
});

//Verify timezone
Scenario('As customer admin, I verify that timezone displays which was selected Site Administration @timezone', async (I, createSurvey) => {
    //
    I.amOnPage('/settings/general');
    let timeZone = await I.grabTextFrom(createSurvey.fields.timezone);
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');

    I.wSee('Create New Survey');

    I.see(timeZone, '#start-helper-text')


});


Scenario('As a customer admin user, I select Spanish language @language', (I, createSurvey) => {
    //data for form.

    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    createSurvey.selectLanguage();
});

Scenario('As a customer admin user, I see English language is selected by default and user can\'t uncheck it @english_lang ', (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    createSurvey.unSelectLanguage();
});

Scenario('As a customer admin user, I fill all the fields/options in \'Design 6. Survey\' and click on Save and Continue button @fill_all ', async (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    let data = {
        survey_name: 'Design Survey - ' + createSurvey.generateRandomNumber()
    };
    createSurvey.fillName(data);
    createSurvey.fillDates(createSurvey.getDateTimeForSurvey());
    createSurvey.selectLanguage();
    // Click on Save and Continue
    await I.click(createSurvey.buttons.submit_button);
    I.seeInCurrentUrl('questions');

});

Scenario('As a Customer Admin, I\'m redirected to Add Participant page  @participant_page', async (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    let data = {
        survey_name: 'Design Survey - ' + createSurvey.generateRandomNumber()
    };
    createSurvey.fillName(data);
    // Click on Save and Continue
    await I.click(createSurvey.buttons.submit_button);
    I.seeInCurrentUrl('questions');
    I.w(createSurvey.buttons.submit_button);
    await I.click(createSurvey.buttons.submit_button);
    I.seeInCurrentUrl('participants');
});

Scenario('As a Customer Admin, I click on Back button before uploading data file  @go_back', async (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    let data = {
        survey_name: 'Design Survey - ' + createSurvey.generateRandomNumber()
    };
    createSurvey.fillName(data);
    // Click on Save and Continue
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Questions Page
    I.seeInCurrentUrl('questions');
    //Wait and Click on Next button to navigate on Add Participant Page
    I.w(createSurvey.fields.submit_button);
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Participant Page
    I.seeInCurrentUrl('participants');
    //Wait and Click on Back button to navigate on previous page
    I.wSee('Upload Participants Data File');
    await I.click(createSurvey.fields.back_button);
    //Check that current page is Add Questions Page
    I.seeInCurrentUrl('questions');


});

Scenario('As a Customer Admin, I click on Next button without uploading data file  @go_to_next', async (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    let data = {
        survey_name: 'Design Survey - ' + createSurvey.generateRandomNumber()
    };
    createSurvey.fillName(data);
    // Click on Save and Continue
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Questions Page
    I.seeInCurrentUrl('questions');
    //Wait and Click on Next button to navigate on Add Participant Page
    I.w(createSurvey.fields.submit_button);
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Participant Page
    I.seeInCurrentUrl('participants');
    //Wait and Click on Back button to navigate on previous page
    I.wSee('Upload Participants Data File');
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Questions Page
    I.seeInCurrentUrl('notifications');


});

Scenario('As a Customer Admin, I Upload Participants Data File @upload_file', async (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    let data = {
        survey_name: 'Design Survey - ' + createSurvey.generateRandomNumber()
    };
    createSurvey.fillName(data);
    // Click on Save and Continue
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Questions Page
    I.seeInCurrentUrl('questions');
    //Wait and Click on Next button to navigate on Add Participant Page
    I.w(createSurvey.fields.submit_button);
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Participant Page
    I.seeInCurrentUrl('participants');
    //Wait and Click on Back button to navigate on previous page

    I.wSee('Upload Participants Data File');
    //await I.click('//*[@id="documentWrapper"]/div[2]/div/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/div/div/div/div[2]/div/button/span[1]');

    let e = I.executeScript(function (I) {
        let Zb = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        handleFileChange = function (e) {
            e.preventDefault(), n.setState({
                showLoading: !0
            });
            var t = e.target.files[0];
            if (Zb.includes(t.type)) {
                var a = new FileReader;
                a.onloadend = function (e) {
                    return function () {
                        var t = this,
                            n = arguments;
                        return new Promise(function (a, r) {
                            var o = e.apply(t, n);

                            function i(e, t) {
                                try {
                                    var n = o[e](t),
                                        i = n.value
                                } catch (e) {
                                    return void r(e)
                                }
                                n.done ? a(i) : Promise.resolve(i).then(l, s)
                            }

                            function l(e) {
                                i("next", e)
                            }

                            function s(e) {
                                i("throw", e)
                            }

                            l()
                        })
                    }
                }(vn.a.mark(function e() {
                    var a, r, o, i;
                    return vn.a.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return n.setState({
                                    file: t
                                }), e.next = 3, n.props.generateUploadUrl(t.name, t.type);
                            case 3:
                                a = e.sent, r = a.url, o = a.path, (i = Xb("PUT", r)).setRequestHeader("Content-Type", t.type), i.onload = function () {
                                    n.setState({
                                        showLoading: !1
                                    }), n.props.onFileUploaded(t, o)
                                }, i.onerror = function () {
                                    n.setState({
                                        showLoading: !1
                                    })
                                }, i.send(t);
                            case 10:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                })), a.readAsDataURL(t)
            } else n.setState({
                showLoading: !1,
                errorMessage: "Only Excel files can be uploaded"
            })
        }

        e = document.createElement("input");
        e.type = "file", e.accept = Zb.join(","), e.onchange = handleFileChange;
        return e;

    });
    I.attachFile(e.target, 'data/precodedrows.xlsx');
    var t = e.target.files[0];
    console.log(t)


    // I.click('Select Excel File');
    I.wait(30);



});

Scenario('As a Customer Admin, I click on Back button @go_back_from_questions', async (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    let data = {
        survey_name: 'Design Survey - ' + createSurvey.generateRandomNumber()
    };
    createSurvey.fillName(data);
    // Click on Save and Continue
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');
    I.seeInCurrentUrl('questions');
    await I.click(createSurvey.fields.back_button);
    //Check that current page is Design Survey Page
    I.seeInCurrentUrl('design');
});

Scenario('As a Customer Admin, I mouse hover to the Icon beside "TRUST INDEX SURVEY"  @hover', async (I, createSurvey) => {
    // after login verify that login is success
    I.wSee('Surveys');
    // Redirected to surveys page
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to Create new Survey Page
    I.click('Create New Survey');
    // Verify that create new survey page is opened
    I.wSee('Create New Survey');
    let data = {
        survey_name: 'Design Survey - ' + createSurvey.generateRandomNumber()
    };
    createSurvey.fillName(data);
    // Click on Save and Continue
    await I.click(createSurvey.fields.submit_button);
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');
    I.moveCursorTo('h6 svg');
    I.wait(3);
    I.seeInCurrentUrl('questions');
    await I.click(createSurvey.fields.back_button);
    //Check that current page is Design Survey Page
    I.seeInCurrentUrl('design');
});

Scenario('As a Customer Admin, I click on Expand/collapse arrow on each "Category"  @click_categories', async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');
    //Going to click categories
    I.click('div[tabindex="-1"] span svg:nth-child(1)');
    I.scrollTo('//div[2]/div[1]/div[1]/div[1]/div[1]/h6[1]');
    I.click('//div[2]/div[1]/div[1]/div[1]/div[1]/h6[1]');
    I.scrollTo('//div[3]/div[1]/div[1]/div[1]/div[1]/h6[1]');
    I.click('//div[3]/div[1]/div[1]/div[1]/div[1]/h6[1]');
    I.scrollTo('//div[4]/div[1]/div[1]/div[1]/div[1]');
    I.click('//div[4]/div[1]/div[1]/div[1]/div[1]');

    I.seeInCurrentUrl('questions');
    await I.click(createSurvey.fields.back_button);
    //Check that current page is Design Survey Page
    I.seeInCurrentUrl('design');
});

Scenario('As a Customer Admin, I click on \'Statements\' Category  @click_statement', async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');
    //I.click('div[tabindex="-1"] span svg:nth-child(1)');
    I.click('Statements');
    I.wait(1);
    I.scrollTo(createSurvey.buttons.uncategorized_button);
    I.click(createSurvey.buttons.uncategorized_button);
    I.wait(1);
    I.click('Add Statement');
    I.wSee('Add New Question')
});

Scenario('As a Customer Admin, I Add Statement to the Statements category  @add_statement', async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');
    //I.click('div[tabindex="-1"] span svg:nth-child(1)');
    I.click('Statements');
    I.wait(1);
    I.scrollTo(createSurvey.buttons.uncategorized_button);
    I.click(createSurvey.buttons.uncategorized_button);
    I.wait(1);
    I.click('Add Statement');
    I.wSee('Add New Question');
    let statement = 'Statement - ' + createSurvey.generateRandomNumber();
    I.fillField(createSurvey.fields.question, statement);

    await I.click(createSurvey.buttons.save_statement_button);
    I.wait(3)


});

Scenario('As a Customer Admin, I Delete a statement from Statements category  @delete_statement', async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');
    I.click('Statements');
    I.wait(1);
    I.scrollTo(createSurvey.buttons.uncategorized_button);
    I.click(createSurvey.buttons.uncategorized_button);
    I.wait(1);
    I.click('Add Statement');
    I.wSee('Add New Question');
    let statement = 'Statement - ' + createSurvey.generateRandomNumber();
    I.fillField(createSurvey.fields.question, statement);

    await I.click(createSurvey.buttons.save_statement_button);
    I.wait(3)


});


Scenario('As a Customer Admin, I click on Demographics Category @click_demographic_category', async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');

    I.scrollTo(createSurvey.buttons.demographics);
    I.click(createSurvey.buttons.demographics);

    I.wSee('How long have you worked for this organization?')
});

Scenario('As a Customer Admin, I Click on Add Question at Demographic category @add_question', async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');

    I.scrollTo(createSurvey.buttons.demographics);
    I.click(createSurvey.buttons.demographics);
    //Going to click on add question button
    I.scrollTo(createSurvey.buttons.add_question_button);
    I.click(createSurvey.buttons.add_question_button);

    I.wSee('Add New Question')
});

Scenario("As a Customer Admin, I Click Save button on 'Add Question' popup without entering data. @click_add_without_entering_data", async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');

    I.scrollTo(createSurvey.buttons.demographics);
    I.click(createSurvey.buttons.demographics);
    //Going to click on add question button
    I.scrollTo(createSurvey.buttons.add_question_button);
    I.click(createSurvey.buttons.add_question_button);

    I.wSee('Add New Question');

    //Going to click Save button
    I.click(createSurvey.buttons.save_statement_button);
});

Scenario("As a Customer Admin, I Click Cancel button on 'Add Question' popup after providing data. @click_cancel_with_entering_data", async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');

    I.scrollTo(createSurvey.buttons.demographics);
    I.click(createSurvey.buttons.demographics);
    //Going to click on add question button
    I.scrollTo(createSurvey.buttons.add_question_button);
    I.click(createSurvey.buttons.add_question_button);

    I.wSee('Add New Question');

    let statement = 'Question - ' + createSurvey.generateRandomNumber();
    I.fillField(createSurvey.fields.question, statement);
    I.fillField(createSurvey.fields.answer, 'Answer');
    //Going to click Save button
    I.click(createSurvey.buttons.question_cancel_button);
});

Scenario("As a Customer Admin, I provide long text in 'Add Question' popup fields. @long_text", async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');

    I.scrollTo(createSurvey.buttons.demographics);
    I.click(createSurvey.buttons.demographics);
    //Going to click on add question button
    I.scrollTo(createSurvey.buttons.add_question_button);
    I.click(createSurvey.buttons.add_question_button);

    I.wSee('Add New Question');

    let statement = 'Please tell us the zip code of your primary office or work location. If you telecommute or work in the field, please use the zip code of the location you feel most connected to.';
    I.fillField(createSurvey.fields.question, statement);
    //Going to click Save button
    //I.click(createSurvey.buttons.question_cancel_button);
});

Scenario("As a Customer Admin, I provide single answer choice on 'Add Question' popup. @single_answer_choice", async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');

    I.scrollTo(createSurvey.buttons.demographics);
    I.click(createSurvey.buttons.demographics);
    //Going to click on add question button
    I.scrollTo(createSurvey.buttons.add_question_button);
    I.click(createSurvey.buttons.add_question_button);

    I.wSee('Add New Question');

    let statement = 'Question - ' + createSurvey.generateRandomNumber();
    I.fillField(createSurvey.fields.question, statement);
    I.fillField(createSurvey.fields.answer, 'Answer');
    //Going to click Save button
    //I.click(createSurvey.buttons.question_cancel_button);
});

Scenario("As a Customer Admin, I click on Delete Icon beside each row of answer choice. @click_on_each_delete_button", async (I, createSurvey) => {
    await createSurvey.saveDesignData();
    //Check that current page is Add Questions Page
    I.wSee('TRUST INDEX SURVEY');

    I.scrollTo(createSurvey.buttons.demographics);
    I.click(createSurvey.buttons.demographics);
    //Going to click on add question button
    I.scrollTo(createSurvey.buttons.demographics_add_question);
    I.click(createSurvey.buttons.demographics_add_question);

    I.wSee('Add New Question');

    let statement = 'Question - ' + createSurvey.generateRandomNumber();
    I.fillField(createSurvey.fields.question, statement);
    I.fillField(createSurvey.fields.answer, 'Answer');
    I.click(createSurvey.buttons.add_choice_button_1);
    I.fillField(createSurvey.fields.answer_1, 'Answer 2');
    I.click(createSurvey.buttons.add_choice_button_2);
    I.fillField(createSurvey.fields.answer_2, 'Answer 3');


});






