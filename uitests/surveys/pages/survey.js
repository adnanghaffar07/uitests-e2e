const I = actor()

module.exports = {
    getStarted: '#get-started',
    submitSurvey: '#submit-survey',
    goBack: '#go-back',
    confirm: '#confirm',

    scoreStatement(code, score) {
        I.waitForElement(`.score-${score}`)
        within(`#${code}`, () => {
            I.click(`.score-${score}`)
        })
    },
}
