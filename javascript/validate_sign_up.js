//The signup validation

$(document).ready(function () {
    jQuery.validator.addMethod("lettersAndNumbers", function(value, element) {

        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    }, "Please enter only letters and numbers");

    jQuery.validator.addMethod("letters", function(value, element) {
        return this.optional(element) || /^[a-zA-Z]+$/.test(value);
    }, "Please enter only letters");
    jQuery.validator.addMethod("minimum2", function(value, element) {
        
        var category = document.getElementById("category_signup");
        var values = getSelectValues(category);
        return values.length >= 2;
    }, "At least 2 categories");


    $('#sign_up_form').validate({ // initialize the plugin
        rules: {
            username: {
                minlength: 3,
                maxlength: 8,
                required: true,
                letters: true
            },
            password: {
                required: true,
                minlength: 5,
                maxlength:10,
                lettersAndNumbers: true
            },
            fName: {
                required: true,
                letters: true
            },
            lName: {
                required: true,
                letters: true
            },
            
            email: {
                required: true,
                email: true
            },
            country:{
                required:true
            },
            Categories:{
                minimum2: true
            },
            city:{
                required:true
            },
            question:{
                required:true
            },
            answer:{
                required:true
            }
        },
        submitHandler: function (form) {

            Submit();

        }
    });
});
