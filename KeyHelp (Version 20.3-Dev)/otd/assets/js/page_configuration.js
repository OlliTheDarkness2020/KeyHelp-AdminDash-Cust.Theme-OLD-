var configureParameter = getUrlQueryParameterValue(window.location.href, 'configure');

//======================================================================================================================
// PHP Interpreter
//======================================================================================================================

    // load available interpreter
    $('#app-load-interpreters').on('click', function() {
        var $this = $(this);

        var $interpreterNotAvailable = $('#app-interpreter-not-available');
        var $interpreterError        = $('#app-interpreter-error');
        var $interpreterErrorMsg     = $('#app-interpreter-error-message');

        var $interpreterTable        = $('#app-interpreter-table');
        var $interpreterTbody        = $('#app-interpreter-tbody');
        var $interpreterCount        = $('#app-interpreter-count');

        var $ajaxFinished            = $('input[name="ajax_finished"]');
        var scheduledInstalls        = $('input[name="scheduled_installs"]').val();
        var interpreterTemplate      = Handlebars.compile($('#app-interpreter-template').html());

        $ajaxFinished.val(0);

        ajax({
            action: 'get_available_php_interpreters',
            success: function(response)
            {
                $interpreterNotAvailable.hide();
                $interpreterError.hide();
                $interpreterTable.hide();

                if (response.error)
                {
                    $interpreterErrorMsg.html(nl2br(response.error_msg));
                    $interpreterError.show(200);
                }
                else
                {
                    if (response.items.length === 0)
                    {
                        $interpreterNotAvailable.show(200);
                    }
                    else
                    {
                        $interpreterTbody.html('');

                        for (var i = 0; i < response.items.length; i++)
                        {
                            var item = response.items[i];
                            item.is_scheduled = scheduledInstalls.indexOf(item.main_version) > -1;
                            $interpreterTbody.append(interpreterTemplate(item));
                        }

                        $interpreterCount.html(response.items.length);
                        $interpreterTable.show(200);
                    }
                }
            },
            error: function(textStatus, error)
            {
                $interpreterErrorMsg.html('AJAX_ERROR');
                $interpreterError.show();
                ajaxLogError(textStatus, error);
            },
            beforeSend: function()
            {
                $this.addClass('is-loading');
            },
            complete: function()
            {
                $ajaxFinished.val(1);
                $this.removeClass('is-loading');
            }
        });
    }).trigger('click');


//======================================================================================================================
// RAM drive
//======================================================================================================================

    var isTmpSelector    = 'input[type="checkbox"][name="is_tmp"]';
    var isVarTmpSelector = 'input[type="checkbox"][name="is_var_tmp"]';

    $(isTmpSelector + ', ' + isVarTmpSelector).on('change', function() {
        var $showWithEnabled = $('#app-show-with-enabled');
        var isEnabled = false;

        $(isTmpSelector + ', ' + isVarTmpSelector).each(function() {
            var $this = $(this);

            if ($this.prop('checked'))
            {
                isEnabled = true;
            }
        });

        if (isEnabled)
        {
            $showWithEnabled.show(200);
        }
        else
        {
            $showWithEnabled.hide(200);
        }
    }).trigger('change');


//======================================================================================================================
// Login & sessions
//======================================================================================================================

    var administrativeAccessBehavior = $('input[type="radio"][name="administrative_access_behavior"]');

    $('textarea[name="administrative_access"]').on('input', function() {
        var $this = $(this);

        if ($this.val().trim() !== '')
        {
            administrativeAccessBehavior.prop('disabled', false);
        }
        else
        {
            administrativeAccessBehavior.prop('disabled', true);
        }
    }).trigger('input');

//======================================================================================================================
// TLS version and cipher
//======================================================================================================================

    if (configureParameter === 'tls_version_and_ciphers')
    {
        $('input[name="use_custom"]').on('change', function() {
            var $this = $(this);
            var $defaultContainer = $('.app-show-with-default');
            var $customContainer = $('.app-show-with-custom');

            if ($this.val() === '0' && $this.is(':checked'))
            {
                $defaultContainer.show(0);
                $customContainer.hide(0);
            }

            if ($this.val() === '1' && $this.is(':checked'))
            {
                $customContainer.show(0);
                $defaultContainer.hide(0);
            }
        }).trigger('change');
    }

//======================================================================================================================
// Applications
//======================================================================================================================

    $('input[name="is_filter_enabled"]').on('change', function() {
        var $this = $(this);
        var $applicationContainer = $('#app-application-container');

        if ($this.val() === '1' && $this.is(':checked'))
        {
            $applicationContainer.fadeIn(200);
        }
        else
        {
            $applicationContainer.fadeOut(200);
        }
    }).trigger('change');

//======================================================================================================================
// Webmail
//======================================================================================================================

    // show / hide webmail settings depending on the selected webmail client
    $('select[name="webmail_client"]').on('change', function() {
        var $this = $(this);
        var $showWithRoundcube = $('.app-show-with-roundcube');

        if ($this.val() === 'roundcube')
        {
            $showWithRoundcube.show(200);
        }
        else
        {
            $showWithRoundcube.hide(200);
        }
    }).trigger('change');


//======================================================================================================================
// Backup
//======================================================================================================================

    // show / hide settings when local repository is enabled
    $('input[name="is_local_repo_enabled"]').on('change', function() {
        var $this = $(this);
        var $showWithLocalRepo = $('.app-show-with-local-repo');

        if ($this.prop('checked'))
        {
            $showWithLocalRepo.show(200);
        }
        else
        {
            $showWithLocalRepo.hide(200);
        }
    }).trigger('change');


//======================================================================================================================
// TLS/SSL
//======================================================================================================================

    // notification
    $('input[type=radio][name="tls_notification"]').on('change', function() {
        if (this.checked)
        {
            var $notificationEmail = $('.app-show-with-email');

            if (this.value === 'email')
            {
                $notificationEmail.show(200);
                $notificationEmail.find('input[name=tls_notification_email]').prop('type', 'text').prop('required', true);
            }
            else
            {
                $notificationEmail.hide(200);
                $notificationEmail.find('input[name=tls_notification_email]').prop('type', 'email').prop('required', false);
            }
        }
    }).trigger('change');

    select2_prepareSelect('#input-country');

//======================================================================================================================
// TLS version and cipher
//======================================================================================================================

    if (configureParameter === 'service_status')
    {
        // Globas
        var $serviceContainer = $('#app-service-container');
        var serviceTemplate = Handlebars.compile($('#app-service-template').html());

        // Add services (on page load).
        for (var i = 0; i < serviceConfig.length; i++)
        {
            addService(serviceConfig[i]['name'], serviceConfig[i]['port'], 'append');
        }

        // Add alias (on button click).
        $('#app-btn-add-service').on('click', function() {
            addService('', '', 'prepend');
        });

        // Remove service.
        $serviceContainer.on('click', '.app-btn-remove-service', function() {
            $(this).closest('.columns').remove();
        });

        // Submit
        $('form').submit(function() {
            $('input[name=service_config]').val(JSON.stringify(getCurrentServices()));
            return true;
        });

        /**
         * Adds a new service row to the container.
         *
         * @param    {string}     name
         * @param    {int}        port
         * @param    {string}     addMethod
         * @returns  {undefined}
         */
        function addService(name, port, addMethod)
        {
            var $html = $(serviceTemplate());

            if (name)
            {
                $html.find('input[name="name"]').val(name);
            }

            if (port)
            {
                $html.find('input[name="port"]').val(port);
            }

            if (addMethod === 'append')
            {
                $serviceContainer.append($html);
            }
            else
            {
                $serviceContainer.prepend($html);
            }
        }

        /**
         * Returns an array of objects with all services.
         * Each object has a 'name' and a port' property.
         *
         * @returns  {Array}
         */
        function getCurrentServices()
        {
            var services = new Array();
            var i = 0;

            $serviceContainer.find('.columns').each(function() {
                var $this = $(this);
                var name = $this.find('input[name="name"]').val().trim();
                var port = $this.find('input[name="port"]').val().trim();

                if (name && port)
                {
                    services[i] = {
                        name: name,
                        port: port
                    };
                    i++;
                }
            });

            return services;
        }
    }