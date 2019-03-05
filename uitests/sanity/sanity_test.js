const env = require('../environments');
Feature('Core Functionality Testing Checklist').timeout(5000).config(env.helper, {url: env.appHost});
const users = require('../providers/login-data.js');
const libraries = require('../providers/libraries.js');


const MailosaurClient = require('mailosaur');
const client = new MailosaurClient(libraries.Mailosaur.clientId);
const serverId = libraries.Mailosaur.serverId;
let latestEmail = libraries.latestEmail(client);
let invitationLink;

BeforeSuite(async (I, loginPage, organization) => {
    // Login before test begin
    I.amOnPage('/');
    I.w('#email');
    await loginPage.sendForm(users.insight.email, users.insight.password);

});

Scenario('As a user, I can set up and launch a survey. @launch_survey', async (I, organization) => {
    console.log('Invite User');
    I.amOnPage('/admin/organizations/organization/');
    I.w(organization.fields.email);
    await organization.sendForm(users.organization.email, users.organization.password);

    I.seeInCurrentUrl('/organizations/organization/');

    I.amOnPage('/admin/organizations/organization/14/change/');
    I.wSee('Change organization');
    I.scrollTo(organization.fields.user_email);
    I.w(organization.fields.user_email);

    I.fillField(organization.fields.user_email, latestEmail);
    I.fillField(organization.fields.user_first_name, 'Test');
    I.fillField(organization.fields.user_last_name, 'Test');
    I.click(organization.buttons.submit);
    I.wait(2)
    I.wSee('was changed successfully')

});
Scenario("As a user, I can check email is sent  @launch_survey", async (I, createSurvey) => {
    invitationLink = await createSurvey.checkEmailSent(client, serverId, latestEmail);
    console.log(invitationLink);
});

Scenario("As a user, I Can accept invitation. @launch_survey", async (I, organization) => {
    I.amOnPage(invitationLink);
    I.wSee('CREATE PASSWORD');
    I.fillField(organization.fields.new_password, users.insight.password);
    I.fillField(organization.fields.confirm_password, users.insight.password);

    I.click(organization.buttons.createPassword);
    I.wSee('Surveys');


});

Scenario("Login as the user and create and fully launch the survey with Spanish and Englis @launch_survey", async (I, createSurvey) => {

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
    await I.click(createSurvey.fields.submit_button);
    I.wSee('TRUST INDEX SURVEY');

    I.seeInCurrentUrl('questions');
    await I.click(createSurvey.fields.submit_button);

    I.seeInCurrentUrl('participants');
    I.wSee('Upload Participants Data File')
    await I.click(createSurvey.fields.submit_button);

    I.seeInCurrentUrl('notifications');
    I.wSee('Notifications');
    createSurvey.fillData(createSurvey.fields.email_field, users.insight.email);
    createSurvey.fillData(createSurvey.fields.phone_number, users.insight.phone_number);
    await I.click(createSurvey.buttons.send_email_button);

    I.click(createSurvey.buttons.send_sms_button);
    I.w(createSurvey.fields.submit_button);

    await I.click('Next');
    I.wSee('Survey Design');
    I.seeInCurrentUrl('summary');

});

Scenario(" As a user, I can send text and email notifications to my survey takers. @email_test", async (I, createSurvey) => {
    I.wSee('Surveys');
    I.amOnPage('/surveys');
    // Verify that surveys page is opened
    I.wSee('Create New Survey');
    // Redirected to surveys page
    I.click(createSurvey.buttons.first_survey_link);
    I.wSee('Time Period');
    // Redirected to questions page
    I.click(createSurvey.buttons.submit_button);
    I.wSee('TRUST INDEX SURVEY');

    // Redirected to participant page
    I.click(createSurvey.buttons.submit_button);
    I.wSee('Upload Participants Data File');

    // Redirected to notification page
    I.click(createSurvey.buttons.submit_button);
    I.wSee('Notifications');

    //Fill email
    createSurvey.fillData(createSurvey.fields.email_field, latestEmail);
    createSurvey.fillData(createSurvey.fields.phone_number, users.insight.phone_number);
    I.w(createSurvey.buttons.send_email_button);
    await I.click(createSurvey.buttons.send_email_button);
    I.wait(4);
});

Scenario("As a user, I can check sample email is sent  @email_test", async (I, createSurvey) => {
    invitationLink = await createSurvey.checkEmailSent(client, serverId, latestEmail);
    console.log(invitationLink);
});

Scenario('As an AI employee, I can download the results from a survey in the admin panel @download_dalo', async (I, organization) => {

    I.amOnPage('/admin/organizations/organization/8/change/');

    I.wSee('Change organization');
    I.w(organization.buttons.manage_survey);
    I.scrollTo(organization.buttons.manage_survey);

    //Navigate to manage survey page
    await I.click(organization.buttons.manage_survey);
    I.wait(2)
    I.wSee('Change survey');
    I.scrollTo(organization.buttons.export_dalo_button);
    //Click export report button
    await I.click(organization.buttons.export_dalo_button);
    let url = await I.grabCurrentUrl();
    console.log(url);
    //Wait for 40 second for report to ready
    I.wait(40);

    I.amOnPage(url);
    I.click(organization.buttons.export_button);
    I.wait(10)


});

Scenario("As a user, I can see my accurate results in Insights and can filter and as an AI employee, I can demo Insights. @see_results", async (I, createSurvey, insights, loginPage) => {
    I.amOnPage('/surveys');
    //logout
    I.wSee('Surveys');
    await createSurvey.logout();
    //login
    I.amOnPage('/');
    I.w('#email');
    await loginPage.sendForm(users.insight.email, users.insight.password);
    // after login verify that login is success
    I.wSee(insights.links.insight);
    //Navigate to Insight page
    I.click(insights.links.insight);

    //Check snapshot page is working
    I.wSee('Snapshot');
    I.seeInCurrentUrl('snapshots');

    // Filter by location and department snapshot
    I.wait(1);
    I.click(insights.buttons.location);
    I.click(insights.buttons.location1);
    I.wSee('RESPONSE RATE');
    I.click(insights.buttons.location2);
    I.wSee('RESPONSE RATE');
    I.click(insights.buttons.location3);
    I.wSee('RESPONSE RATE');

    //Uncheck all checked locations
    I.click(insights.buttons.location1);
    I.click(insights.buttons.location2);
    I.click(insights.buttons.location3);

    //Navigate to statements page
    I.click(insights.links.statements);
    I.w(insights.links.statementText);
    I.seeInCurrentUrl('statements');

    // Filter by location and department on statements
    I.click(insights.buttons.location);
    I.click(insights.buttons.location1);
    I.waitForText(insights.links.statementText);
    I.click(insights.buttons.location2);
    I.waitForText(insights.links.statementText);
    I.click(insights.buttons.location3);
    I.waitForText(insights.links.statementText);

    //Uncheck all checked locations
    I.click(insights.buttons.location1);
    I.click(insights.buttons.location2);
    I.click(insights.buttons.location3);

    //Navigate to comments page
    I.click(insights.links.comments);
    I.wSee('Comments');
    I.seeInCurrentUrl('comments');

    // Filter by location and department on statements
    I.click(insights.buttons.location);

    I.w(insights.links.statementText);

    I.w(insights.links.statementText);

    I.w(insights.links.statementText);

    //Uncheck all checked locations
    I.click(insights.buttons.location1);
    I.click(insights.buttons.location2);
    I.click(insights.buttons.location3);


    //Navigate to comparisons page
    I.click(insights.links.comparisons);
    I.wSee('Taking everything into account, I would say this is a great place to work.');
    I.seeInCurrentUrl('comparisons');

    //Show the comparison tool and filter by statement, location/dept, and demographic

    I.click(insights.buttons.location);
    I.click(insights.buttons.location1);
    I.wSee('Taking everything into account, I would say this is a great place to work.');
    I.click(insights.buttons.location2);
    I.wSee('Taking everything into account, I would say this is a great place to work.');

    I.click(insights.buttons.location3);
    I.wSee('Taking everything into account, I would say this is a great place to work.');


    //Click on email button
    I.click(insights.buttons.sendEmailButton);
    I.click(insights.buttons.shareScreenShot);
    I.fillField(insights.fields.emailField, latestEmail);
    I.click(insights.buttons.sendScreenshotButton);
    I.wait(5);


});

Scenario("As a user, I can check sample email is sent  @email_test", async (I, createSurvey) => {
    invitationLink = await createSurvey.checkEmailSent(client, serverId, latestEmail);
    console.log(invitationLink);
    console.log('received')
});
