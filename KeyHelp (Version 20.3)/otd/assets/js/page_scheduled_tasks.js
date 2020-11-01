// Task type.
$('input[type=radio][name="type"]').on('change', function() {
    if (this.checked)
    {
        var $allParentContainer = $('[class^="app-command-"]');
        var $activeContainer = $('[class^="app-command-' + this.value + '"]');

        $allParentContainer.hide(0);
        $allParentContainer.find('input').prop('required',false);

        $activeContainer.show(200);
        $activeContainer.find('input').prop('required',true);
    }
}).trigger('change');


// Interval switching.
var intervalElements = {
    minute:         $('#app-schedule-minute'),
    hour:           $('#app-schedule-hour'),
    day_of_week:    $('#app-schedule-day-of-week'),
    day_of_month:   $('#app-schedule-day-of-month'),
    month:          $('#app-schedule-month'),
    time:           $('#app-schedule-time'),
    cron_style:     $('#app-schedule-cron-style')
};

var visibilityByInterval = {
    hourly:         ['minute'],
    daily:          ['time'],
    weekly:         ['day_of_week', 'time'],
    monthly:        ['day_of_month', 'time'],
    yearly:         ['day_of_month', 'month', 'time'],
    minute_interval:['minute'],
    hour_interval:  ['hour'],
    cron_style:     ['cron_style']
};

$('select[name="interval"]').on('change', function() {
    var $this = $(this);
    var selectedInterval = $this.val();
    var visibleElements = visibilityByInterval[$this.val()];

    if (visibleElements !== undefined)
    {
        for (var key in intervalElements)
        {
            if ($.inArray(key, visibleElements) !== -1)
            {
                intervalElements[key].show(200);

                // Updating help text for minute field.
                if (selectedInterval === 'minute_interval')
                {
                    $('#app-schedule-minute-help').html(helpEveryMinutes);
                }
                else if (selectedInterval === 'hourly')
                {
                    $('#app-schedule-minute-help').html(helpAtMinute);
                }
            }
            else
            {
                intervalElements[key].hide();
            }
        }
    }
}).trigger('change');


// Notification type.
$('input[type=radio][name="notification"]').on('change', function() {
    if (this.checked)
    {
        var $notificationEmail = $('.app-notification-email');

        if (this.value === 'never')
        {
            $notificationEmail.hide(200);
            $notificationEmail.find('input[name=email]').prop('type', 'text').prop('required', false);
        }
        else
        {
            $notificationEmail.show(200);
            $notificationEmail.find('input[name=email]').prop('type', 'email').prop('required', true);
        }
    }
}).trigger('change');

// Owner: Show additional warning if System (root) is selected.
$('#input-owner').on('change', function() {
    var $this = $(this);
    var $showWithOwnerSystem = $('.app-show-with-owner-system');

    if ($this.val() === '0')
    {
        $showWithOwnerSystem.show(0);
    }
    else
    {
        $showWithOwnerSystem.hide(0);
    }
}).trigger('change');


// Select2
select2_prepareSelect('#input-owner', select2_formatUsers);