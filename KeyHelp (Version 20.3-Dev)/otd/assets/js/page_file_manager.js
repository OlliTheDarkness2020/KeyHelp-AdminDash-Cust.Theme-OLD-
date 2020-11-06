// =====================================================================================================================
// Trigger
// =====================================================================================================================

    // Used for quick access, when clicking the file name
    $('.app-modal-extract-trigger').on('click', function() {
        initExtract(this);
    });

    // We do not use our 'modal' trigger inside our button,
    // cause we have to perform additional initialization steps instead just simply opening the modal.
    $('.app-modal-copy-move-trigger').on('click', function() {
        initCopyMove(this);
    });

    // Dynamically created trigger.
    tippy('.app-extended-menu', $.extend(tippySettingsTooltipButtonClick, {
        onShown: function(instance) {
            // Rename
            $('.app-modal-rename-trigger').on('click', function() {
                initRename(this);
            });
            // Permission
            $('.app-modal-permissions-trigger').on('click', function() {
                initPermissions(this);
            });
            // Copy / Move
            $('.app-modal-copy-move-trigger').on('click', function() {
                initCopyMove(this);
            });
            // Extract
            $('.app-modal-extract-trigger').on('click', function() {
                initExtract(this);
            });
            // Delete
            $('.app-modal-delete-trigger').on('click', function() {
                initDelete(this);
            });
        }})
    );

// =====================================================================================================================
// Read configuration
// =====================================================================================================================

    function readConfiguration(trigger)
    {
        var $trigger = $(trigger);
        var $configContainer = $trigger.closest('tr').length > 0 ? $trigger.closest('tr') : $trigger.closest('div');
        var $config = $configContainer.find('.app-configuration');

        return {
            id:             $config.find('input[name="config_id"]').val(),
            current_path:   $config.find('input[name="config_path"]').val(),
            permissions:    $config.find('input[name="config_permissions"]').val()
        };
    }

// =====================================================================================================================
// Rename
// =====================================================================================================================

    function initRename(trigger)
    {
        var config = readConfiguration(trigger);
        var $modal = $('#app-modal-rename');

        // Set values.
        $modal.find('.app-current-path').text(config.current_path);
        $modal.find('input[name="name"]').val(config.id);
        $modal.closest('form').find('input[name="id"]').val(config.id);

        $modal.addClass('is-active');
    }

// =====================================================================================================================
// Permissions
// =====================================================================================================================

    function initPermissions(trigger)
    {
        var config = readConfiguration(trigger);
        var $modal = $('#app-modal-permissions');
        var $configurator = $('#app-permissions-configurator');

        // Event listener.
        $configurator.find('input[type="checkbox"]').on('change', function() {
            updatePermissions('checkbox', $configurator);
        });

        $configurator.find('input[type="number"]').on('change', function() {
            updatePermissions('number', $configurator);
        });

        // Set values + trigger initial change event.
        $modal.find('.app-current-path').text(config.current_path);
        $modal.closest('form').find('input[name="id"]').val(config.id);

        $configurator.find('input[name="owner"]').val(config.permissions[0]);
        $configurator.find('input[name="group"]').val(config.permissions[1]);
        $configurator.find('input[name="others"]').val(config.permissions[2]).trigger('change');

        $modal.addClass('is-active');
    }


    function updatePermissions(reference, $configurator)
    {
        var levels = { owner: 0, group: 0, others: 0 };

        //          0   1   2   3   4   5   6   7
        // read     0   0   0   0   x   x   x   x       0100
        // write    0   0   x   x   0   0   x   x       0010
        // execute  0   x   0   x   0   x   0   x       0001
        var actions = { read: 4, write: 2, execute: 1 };

        if (reference === 'checkbox')
        {
            $.each(levels, function(level, levelValue) {
                $.each(actions, function(action, actionValue) {
                    var selector = 'input[name="' + level + '_' + action + '"]';
                    var checkbox = $configurator.find(selector);

                    if (checkbox.prop('checked'))
                    {
                        levels[level] = levels[level] | actionValue;
                    }
                });

                $configurator.find('input[name="' + level + '"]').val(levels[level]);
            });
        }

        if (reference === 'number')
        {
            $.each(levels, function(level, levelValue) {
                var a = $configurator.find('input[name="' + level + '"]').val();

                $.each(actions, function(action, actionValue) {
                    var selector = 'input[name="' + level + '_' + action + '"]';
                    var checkbox = $configurator.find(selector);

                    var isChecked = (a & actionValue) !== 0;
                    checkbox.prop('checked', isChecked);
                });
            });
        }
    }

// =====================================================================================================================
// Extract archive
// =====================================================================================================================

    function initExtract(trigger)
    {
        var config = readConfiguration(trigger);
        var $modal = $('#app-modal-extract');

        // Set values.
        $modal.find('.app-current-path').text(config.current_path);
        $modal.closest('form').find('input[name="id"]').val(config.id);

        $modal.addClass('is-active');
    }

// =====================================================================================================================
// Copy / Move
// =====================================================================================================================

    function initCopyMove(trigger)
    {
        var $modal = $('#app-modal-copy-move');
        var $selectedFiles = $modal.closest('form').find('.app-modal-selected-files');
        var $trigger = $(trigger);
        var items = [];

        // Fill items array.
        if ($trigger.hasClass('app-modal-copy-move-multiple'))
        {
            $('#form-file-manager').find('input[name="ids[]"]:checked').each(function() {
                items.push(this.value);
            });
        }
        else if ($trigger.hasClass('app-modal-copy-move-single'))
        {
            var config = readConfiguration(trigger);
            items.push(config.id);
        }
        else
        {
            return;
        }

        if (items.length === 0)
        {
            $('#app-modal-copy-move-empty').addClass('is-active');
            return;
        }

        // Reset modal to default state

            // Reset hidden input fields
            $selectedFiles.html('');

            // Set start directory to /www/
            $('#app-directory-browser-container').find('input[name="path"]').val('/www/');

            // Open directory browser.
            if ($('.app-directory-browser').is(':hidden'))
            {
                $('.app-browse-directory').trigger('click');
            }

            // Select 'copy' as default
            $modal.find('input[name="file_operation"][value="copy"]').prop('checked', true);

            // Deselect 'replace' checkbox
            $modal.find('input[name="replace_existing_files"]').prop('checked', false);

        // Set new values.
        for (var i = 0; i < items.length; i++)
        {
            $selectedFiles.append('<input type="hidden" name="ids[]" value="' + items[i] + '">');
        }

        // Update counter.
        var $counter = $('.app-modal-copy-move-files-count');

        if (items.length > 1)
        {
            $counter.removeClass('is-hidden');
        }
        else
        {
            $counter.addClass('is-hidden');
        }

        $counter.find('p').text(items.length);

        $modal.addClass('is-active');
    }

// =====================================================================================================================
// Delete single item
// =====================================================================================================================

    function initDelete(trigger)
    {
        var config = readConfiguration(trigger);
        var $modal = $('#app-modal-delete-single');

        // Set values.
        $modal.find('.app-current-path').text(config.current_path);
        $modal.closest('form').find('input[name="id"]').val(config.id);

        $modal.addClass('is-active');
    }