$('select[name="year"], select[name="month"]').on('change', function() {
    var $this = $(this);
    var $form = $this.closest('form');
    $form.submit();
});