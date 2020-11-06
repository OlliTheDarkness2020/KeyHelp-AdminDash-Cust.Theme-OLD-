//======================================================================================================================
// Update textarea to TinyMce
//======================================================================================================================

    initTinyMce('textarea[name="message"]');

//======================================================================================================================
// Send test email
//======================================================================================================================

    $('.app-send-test-email').click(function() {
        var $this = $(this);
        var $error = $('#app-send-test-error');
        var $errorMessage = $('#app-send-test-error-message');

        // To enable access to textarea value.
        tinyMCE.triggerSave();

        ajax({
            action: 'send_email_test',
            data: {
                sender_name : $('input[name=sender_name]').val(),
                sender_email: $('input[name=sender_email]').val(),
                recipient	: $('input[name=test_recipient]').val(),
                subject		: $('input[name=subject]').val(),
                message		: $('textarea[name=message]').val()
            },
            success: function(data)
            {
                animateButton($this, !data.error);

                if (data.error)
                {
                    $errorMessage.html(data.error_msg);
                    $error.show();
                }
            },
            beforeSend: function()
            {
                $error.hide();
                $this.addClass('is-loading');
            },
            complete: function()
            {
                $this.removeClass('is-loading');
            }
        });
    });