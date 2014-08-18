function submitForm() {

    //Validate form
    var imgblank = $.trim($("#image-file").val());
    var quoteblank = $.trim($("#quote-upload").val());

    if (imgblank.length === 0 && quoteblank.length === 0) {
        $('#output').text("Please choose an image to upload or enter a quote to submit");
        var delay = setTimeout(function () {
            $('#output').text("");
        }, 5000);
        return false;
    }

    //Check file extensions if a file is being uploaded
    if (imgblank.length > 0) {
        var ext = $('#image-file').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            $('#output').text("Invalid file extension, we only accept gif, png, jpg, and jpeg extenstions.");
            var delay = setTimeout(function () {
                $('#output').text("");
            }, 5000);
            return false;
        }
    }

    //Submit form and upload
    $('#output').html("<br/><img src='images/ajax-loader.gif' alt='Uploading'/><p style=\"color: #000000\">Uploading... This may take a while</p>");
    var fd = new FormData(document.getElementById("fileinfo"));
    fd.append("label", $.now());
    $.ajax({
        url: "forms/upload.php",
        type: "POST",
        data: fd,
        enctype: 'multipart/form-data',
        processData: false, // tell jQuery not to process the data
        contentType: false // tell jQuery not to set contentType
    }).done(function (data) {
        $('#submit').val("Uploaded!");
        $('#image-file').val("");
        $('#quote-upload').val("");
        $('#credit-upload').val("");
        $('#output').empty();
        var delay = setTimeout(function () {
            $('#submit').val("Upload");
        }, 5000);
    });
    return false;
}

function submitContact() {
    //Regex to validate email
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    //Email validation if email is present
    var validemail = $.trim($("#email").val());
    if (validemail.length > 0 && !pattern.test(validemail)) {
        $('#conout').text("Please make sure you have entered a valid email address");
        var delay = setTimeout(function () {
            $('#conout').text("");
        }, 5000);
        return false;
    }


    var blank = $.trim($("#message").val());
    if (blank.length === 0) {
        $('#msgdiv').addClass('has-error');
        $('#conout').text("Please enter a message to send.");
        var delay = setTimeout(function () {
            $('#msgdiv').removeClass('has-error');
            $('#conout').text("");
        }, 5000);
        return false;
    }

    var fd = new FormData(document.getElementById("contactform"));
    $.ajax({
        url: "forms/contact.php",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false
    }).done(function (data) {
        $('#contactsubmit').val("Thanks!");
        $('#email').val("");
        $('#message').val("");
        var delay = setTimeout(function () {
            $('#contactsubmit').val("Send");
        }, 5000);
    });
    return false;
}