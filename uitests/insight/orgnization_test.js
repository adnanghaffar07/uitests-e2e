
const env = require('../environments');
Feature('Create survey').timeout(5000).config(env.helper, {url: env.appHost});
const users = require('../providers/login-data.js');

const libraries = require('../providers/libraries.js');


const MailosaurClient = require('mailosaur');
const client = new MailosaurClient(libraries.Mailosaur.clientId);
const serverId = libraries.Mailosaur.serverId;
let latestEmail = libraries.latestEmail(client);
let invitationLink;
BeforeSuite(async (I, organization) => {
    // Login before test begin

    I.amOnPage('/admin/organizations/organization/');
    I.w(organization.fields.email);
    await organization.sendForm(users.organization.email, users.organization.password);
});


Scenario('As an AI employee, I can download the results from a survey in the admin panel @download_dalo',async (I,organization) => {

    I.seeInCurrentUrl('/organizations/organization/');


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
    // I.wSee('Export is being created. Please refresh in a minute or so to see your file');
    let url = await I.grabCurrentUrl();
    console.log(url);
    //Wait for 40 second for report to ready
    I.wait(40);

    I.amOnPage(url);
    I.click(organization.buttons.export_button);
    I.wait(10)



});
