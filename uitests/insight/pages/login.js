
const I = actor();

module.exports = {

    fields: {
        email: '#email',
        password: '#password'
    },
    submitButton: 'button',

    // introducing methods
    async sendForm(email, password) {
        I.fillField(this.fields.email, email);
        I.fillField(this.fields.password, password);
        I.click(this.submitButton);
    }
}
