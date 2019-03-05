/**
 * Created by   :  Muhammad Yasir
 * Project Name : ui-tests-new
 * Product Name : PhpStorm
 * Date         : 07-Jan-19 7:44 PM
 * File Name    : insight.js
 */
const I = actor();
module.exports = {
    fields: {
        emailField:{xpath:"//div[2]/div[2]/div[1]/div[1]/input[1]"},

    },
    buttons: {
        location:{xpath:"//div[1]/div[1]/p[2]"},
        department:{xpath:"//div[1]/div[1]/p[3]"},
        location1:{xpath:"//div/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"},
        location2:{xpath:"//div/div[1]/div[1]/div[2]/span[1]"},
        location3:{xpath:"//div/div[1]/div[3]/span[1]"},
        sendEmailButton:{xpath:"//div[2]/div[1]/button[1]"},
        shareScreenShot:{xpath:"//body[1]/div[2]/div[2]/ul[1]/li[1]"},
        sendScreenshotButton:{xpath:"//button[2]/span[1]"},
    },
    links: {
        insight:'Insights',
        statements:{xpath:"//a[2]/span[1]/span[1]/span[1]"},
        comments:{xpath:"//a[3]/span[1]/span[1]/span[1]"},
        comparisons:{xpath:"//a[4]/span[1]/span[1]/span[1]"},
        snapshot:{xpath:"//a[1]/span[1]/span[1]/span[1]"},
        statementText:{xpath:"//h6[contains(text(),'Statements')]"},
    }
};
