//======================================================================================================================
// Action: index
//======================================================================================================================

    var $loadingAnimation = $('#app-loading-animation');
    var $loadingError     = $('#app-loading-error');
    var $loadingErrorMsg  = $('#app-loading-error-message');

    var $containerEmpty   = $('#app-container-empty');
    var $containerContent = $('#app-container-content');

    var $itemContainer    = $('#app-item-container');
    var itemTemplate      = Handlebars.compile($('#app-item-template').html());

    var $workingDir       = $('input[name="working_dir"]');
    var $showObjectCount  = $('input[name="show_object_count"]');

    var $totalSize        = $('#app-total-size');
    var $shownItems       = $('#app-shown-items-count');

    ajax({
        action: 'get_disk_usage',
        data: {
            show_object_count: $showObjectCount.val(),
            working_dir: $workingDir.val()
        },
        success: function(response)
        {
            if (response.error)
            {
                $loadingError.show();
                $loadingErrorMsg.html(response.error_msg.replace(/\n/, '<br>'));
            }
            else
            {
                if (response.items.length === 0)
                {
                    $containerEmpty.show();
                }
                else
                {
                    $containerContent.show();

                    $totalSize.text(response.total);
                    $shownItems.text(response.items.length + 1 /* add one for the directory itself */);

                    for (var i = 0; i < response.items.length; i++)
                    {
                        var placeholder = response.items[i];
                        var $html = $(itemTemplate(placeholder));

                        $html.find('.usage-indicator').attr('data-tippy-content', placeholder.percent_formatted);
                        $html.find('progress').val(placeholder.percent);
                        $html.find('progress').text(placeholder.percent_formatted);
                        $html.find('.level-right > .level-item').text(placeholder.percent_formatted);

                        $itemContainer.append($html);
                    }

                    // Enable tooltips on dynamic elements.
                    tippy.delegate('#app-container-content', { target: '.app-tooltip' });
                }
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
            $containerEmpty.hide();
            $containerContent.hide();

            $loadingError.hide();
            $loadingErrorMsg.html('');
            $loadingAnimation.show();
        },
        complete: function()
        {
            $loadingAnimation.hide();
        }
    });