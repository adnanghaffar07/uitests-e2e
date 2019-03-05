const I = actor()

module.exports = {
    submittedSurveyId: '1',
    unSubmittedSurveyId: '99',

    fields: {
        code: 'input[type=text]'
    },

    submitButton: 'button[type=submit]',

    submitCode(code){
        I.waitForElement(this.submitButton, 10)
        I.fillField(this.fields.code, code)
        I.click(this.submitButton)
    },
}
