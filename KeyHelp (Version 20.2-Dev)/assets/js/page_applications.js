//======================================================================================================================
// Action: index
//======================================================================================================================

    if (typeof reloadCache !== 'undefined' && reloadCache)
    {
        var $loadingAnimation = $('#app-loading-animation');
        var $loadingError     = $('#app-loading-error');
        var $loadingErrorMsg  = $('#app-loading-error-message');
        var $loadingSuccess   = $('#app-loading-success');

        ajax({
            action: 'load_applications',
            success: function(response)
            {
                if (response.error)
                {
                    $loadingError.show();
                    $loadingErrorMsg.html(response.error_msg.replace(/\n/, '<br>'));
                }
                else
                {
                    location.reload(true);
                    $loadingSuccess.show();
                }
            },
            error: function(textStatus, error)
            {
                $loadingError.show();
                $loadingErrorMsg.html('AJAX_ERROR');
                ajaxLogError(textStatus, error);
            },
            beforeSend: function()
            {
                $loadingSuccess.hide();
                $loadingError.hide();
                $loadingErrorMsg.html('');
                $loadingAnimation.show();
            },
            complete: function()
            {
                $loadingAnimation.hide();
            }
        });
    }

    // Show items based on the selected category.
    $('.button[data-show-category]').click(function() {
        var $this = $(this);
        var category = $this.data('show-category');

        $('div[data-category]').hide();

        if (category === 'all')
        {
            $('div[data-category]').fadeIn(200);
        }
        else
        {
            $('div[data-category="' + category + '"]').fadeIn(200);
        }
    });
