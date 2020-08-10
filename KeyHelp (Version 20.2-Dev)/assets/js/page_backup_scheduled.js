// Show / hide fields for schedule settings
$('select[name="interval"]').on('change', function() {
    var $this = $(this);
    var $dayOfWeek = $('#app-day-of-week');
    var $daysOfMonth = $('#app-days-of-month');

    switch ($this.val())
    {
        case 'weekly':
            $dayOfWeek.show(200);
            $daysOfMonth.hide();
            break;
        case 'monthly':
            $dayOfWeek.hide();
            $daysOfMonth.show(200);
            break;
        default:
            $dayOfWeek.hide();
            $daysOfMonth.hide();
            break;
    }
}).trigger('change');