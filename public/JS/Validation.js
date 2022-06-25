
$(function () {
    var $login = $("#signin");

    if ($login.length) {
        $login.validate({
            rules: {
                username: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: 'User name is manadatory'
                }
            }
        })
    }
})