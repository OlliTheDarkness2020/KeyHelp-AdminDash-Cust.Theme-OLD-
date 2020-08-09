// disable / enable inout / select fields, when the 'unlimited' checkbox is selected
$('input[type="checkbox"][name$="_ul"]').on('change', function() {
    var $this = $(this);
    var checked = $this.prop('checked');

    $this.closest('.columns').find('input[type!="checkbox"], select').prop('disabled', checked);
}).trigger('change');

// show hide additional input fields if pm is set to 'dynamic'
$('input[name="pm"]').on('change', function () {
    var $this = $(this);
    var $showWithDynamic = $('.app-show-with-pm-dynamic');

    if ($this.prop('checked'))
    {
        if ($this.val() === 'dynamic')
        {
            $showWithDynamic.show(200);
            $showWithDynamic.find('input').prop('min', '1');
        }
        else
        {
            $showWithDynamic.hide(200);
            // If there is a 0 in these fields and the "pm" is later changed to != dynamic,
            // a Browser validation message will be triggered, but not show, due to the hidden input fields.
            $showWithDynamic.find('input').prop('min', '');
        }
    }
}).trigger('change');
