
const I = actor();

module.exports = {
    fields:{
        email:'#id_username',
        password:'#id_password',
        user_email:{xpath:"(//*[@type='email'])[last()-1]"},
        user_first_name:{xpath:"(//td[@class='field-first_name']/input[@type='text'])[last()-1]"},
        user_last_name:{xpath:"(//td[@class='field-last_name']/input[@type='text'])[last()-1]"},
        new_password:'#password',
        confirm_password:'#conforimPassword',
    },
    buttons:{
        login:'Log in',
        submit:{xpath:"//input[@value='Save']"},
        createPassword:'Create Password',
        manage_survey:{xpath:"//td/p[1]/a[1]"},
        export_dalo_button:{xpath:"//a[4]"},
        export_button:{xpath:"//tr[@id='exports-0']//td[@class='field-the_file_link']/p/a"}
    },

    async sendForm(email, password) {
        I.fillField(this.fields.email, email);
        I.fillField(this.fields.password, password);
        I.click(this.buttons.login);
    }
}
