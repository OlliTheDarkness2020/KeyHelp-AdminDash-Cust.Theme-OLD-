// Show / hide additional fields for selected repository type.
$('select[name="type"]').on('change', function() {
    var $this = $(this);

    // Hide all.
    $('[class^="app-show-with-type-"]').hide(0);
    // Show selected.
    $('.app-show-with-type-' + $this.val()).show(200);
}).trigger('change');