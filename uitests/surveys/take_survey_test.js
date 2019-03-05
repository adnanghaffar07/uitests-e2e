const env = require('../environments')

Feature('I can take a survey').timeout(5000).config(env.helper, {url: env.surveyHost});

Scenario('I can submit survey code portal', (I, portalPage) => {
  I.amOnPage('/uitests');

  portalPage.submitCode('');
  I.wSee('Please provide a value');

  portalPage.submitCode('nevergonnawork');
  I.wSee('We cannot find');

  portalPage.submitCode(portalPage.submittedSurveyId);
  I.wSee('Survey Already Submitted');
});

Scenario('I can successfully submit a survey', async (I, portalPage, surveyPage) => {
  const participant = await I.have('participant');
  I.amOnPage('/uitests');

  portalPage.submitCode(participant.survey_code);

  I.wClick(surveyPage.getStarted);

  I.w(surveyPage.submitSurvey);

  surveyPage.scoreStatement('ti_1', 1);
  surveyPage.scoreStatement('ti_2', 2);
  surveyPage.scoreStatement('ti_3', 3);
  surveyPage.scoreStatement('ti_4', 4);
  surveyPage.scoreStatement('ti_5', 5);

  I.click(surveyPage.submitSurvey);
  I.wClick(surveyPage.goBack);

  surveyPage.scoreStatement('ti_6', 5);
  I.wClick(surveyPage.submitSurvey);

  I.wClick(surveyPage.confirm);
  I.wSee('Thank You!');

  I.amOnPage('/uitests');
  portalPage.submitCode(participant.survey_code);
  I.wSee('Survey Already Submitted');
});
