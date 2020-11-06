var action = getUrlQueryParameterValue(window.location.href, 'action');

//======================================================================================================================
// Index
//======================================================================================================================

if (action === 'index' || action === false)
{
    // Update postion by drop-down field.
    $('select[name="position"]').change(function() {
        var $this = $(this);

        var id = $this.closest('tr').find('input[name="ids[]"]').val();
        var position = $this.val();

        window.open(
            '?page=' + hash['app.page']
            + '&action=change_position'
            + '&id=' + id
            + '&position=' + position
            + '&sid=' + hash['auth.sid'],
            '_self');
    });

    // Open modal for deleting a single rule.
    $('.app-modal-delete-single-trigger').click(function() {
        var $trigger = $(this);
        var $modal = $('#app-modal-delete-single');

        var id = $trigger.closest('tr').find('input[name="config_id"]').val();
        var name = $trigger.closest('tr').find('input[name="config_name"]').val();

        $modal.closest('form').find('input[name="ids[]"]').val(id);
        $modal.find('.app-rule-name').text(name);

        $modal.addClass('is-active');
    });

    // Anti-lockout check after appling rules.
    if (antiLockout)
    {
        var $antiLockoutModal = $('#app-modal-anti-lockout')

        $antiLockoutModal.addClass('is-active');

        // Wait a couple of seconds.
        setTimeout(function() { callAjaxAntiLockout(); }, 6000);

        function callAjaxAntiLockout()
        {
            var $loading        = $('#app-anti-lockout-loading');
            var $statusWaiting  = $('#app-anti-lockout-status-waiting');
            var $statusChecking = $('#app-anti-lockout-status-checking');
            var $error          = $('#app-anti-lockout-error');
            var $errorMessage   = $('#app-anti-lockout-error-message');
            var $success        = $('#app-anti-lockout-success');

            ajax({
                action: 'firewall_anti_lockout_check',
                timeout: 12000,
                success: function(response) {
                    if (response.error)
                    {
                        $error.show(200);
                        $errorMessage.html(response.error_msg);
                    }
                    else
                    {
                        $success.show(200);
                        setTimeout(function() { $antiLockoutModal.removeClass('is-active'); }, 1500);
                    }
                },
                beforeSend: function()
                {
                    $statusWaiting.hide();
                    $statusChecking.show();
                },
                error: function(textStatus, error)
                {
                    $error.show();

                    if (textStatus.statusText !== 'timeout')
                    {
                        $errorMessage.html('AJAX_ERROR');
                    }

                    ajaxLogError(textStatus, error);
                },
                complete: function()
                {
                    $loading.hide();
                }
            });
        }
    }
}

//======================================================================================================================
// Add / edit rule
//======================================================================================================================

if (action === 'add' || action === 'edit')
{
    $('input[name="direction"]').on('change', function() {
        var $this = $(this);
        var $source      = $('.app-input-source');
        var $destination = $('.app-input-destination');

        if ($this.is(':checked'))
        {
            $source.hide();
            $destination.hide();

            if ($this.val() === 'input')
            {
                $source.show();
            }
            else if ($this.val() === 'output')
            {
                $destination.show();
            }
            else
            {
                $source.show();
                $destination.show();
            }
        }
    }).trigger('change');
}