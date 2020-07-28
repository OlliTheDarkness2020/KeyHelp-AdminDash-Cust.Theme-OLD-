$('.app-button-with-loading-animation').on('click', function() {
    // Check for invalid fields, before setting the button state to loading,
    // otherwise the button is not clickable any more.

    var $this = $(this);
    var $form = $this.closest('form');
    var $invalidFields = $form.find(':invalid');

    if ($invalidFields.length === 0)
    {
        $this.addClass('is-loading');
    }
});