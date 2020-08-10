// load default template
$('#app-btn-load-default-template').click(function() {

    var $this = $(this);

    var language = $('input[name="language"]').length ? $('input[name="language"]').val() : $('select[name=language]').val();
    var event = $('input[name="event"]').length ? $('input[name="event"]').val() : $('select[name=event]').val();

    var $subject = $('input[name="subject"]');
    var $text = $('textarea[name="text"]');
    var $senderName = $('input[name="sender_name"]');

    ajax({
        action: 'get_defaultmail',
        data: {
            language: language,
            event: event
        },
        success: function(data)
        {
            $subject.val(data.subject);
            $text.val(data.text);
            $text.trigger('input'); // trigger auto resize
            $senderName.val(data.sender_name);
        },
        beforeSend: function()
        {
            $this.addClass('is-loading');
        },
        complete: function()
        {
            $this.removeClass('is-loading');
        }
    });

});


// send test email
$('.app-send-test-email').click(function() {

    var $this = $(this);

    var $error= $('#app-send-test-error');
    var $errorMessage = $('#app-send-test-error-message');

    ajax({
        action: 'send_email_template_test',
        data: {
            recipient	: $('input[name=test_recipient]').val(),
            subject		: $('input[name=subject]').val(),
            text		: $('textarea[name=text]').val(),
            sender_name : $('input[name=sender_name]').val()
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

// add placeholder texts
var eventPlaceholderConfig = {
    user_created: ['password'],
    user_loginchanged: ['password'],
    forgot_password: ['reset_link'],
    emailaccount_created: ['email'],
    diskspace_warning: [],
    diskspace_exceeded: [],
    domain_enabled: ['domain'],
    domain_disabled: ['domain'],
    backup_succeeded: ['backup_type', 'error_message'],
    backup_failed: ['backup_type', 'error_message'],
    tls_problems: ['certificate_messages']
};

$('select[name="event"], input[name="event"]').on('change', function() {
    var $this = $(this);
    var $help = $('#app-placeholder');
    var $placeholderWrapper = $('#app-placeholder-wrapper');

    var placeholders = eventPlaceholderConfig[$this.val()];

    if (placeholders !== undefined && placeholders.length > 0)
    {
        var helpText = placeholderTexts['placeholder_additional'];

        for (var key in placeholders)
        {
            helpText += '<br>' + placeholderTexts['placeholder_' + placeholders[key]];
        }

        $help.html(helpText);
        $placeholderWrapper.show();
    }
    else
    {
        $placeholderWrapper.hide();
        $help.html('');
    }
}).trigger('change');