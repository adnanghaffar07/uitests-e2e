module.exports = function() {
    return actor({

        // Define custom steps here, use 'this' to access default methods of I.
        // It is recommended to place a general 'login' function here.

        // Override some methods to include some built in waiting
        w(element){
            this.waitForElement(element, 10)
        },
        wSee(text, context=''){
            this.waitForText(text, 10, context)
            this.see(text)
        },

        wClick(element){
            this.waitForElement(element, 10)
            this.click(element)
        }
    })
}
