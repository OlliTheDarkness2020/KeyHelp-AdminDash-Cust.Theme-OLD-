// Read the settings from the items table row and assign them to the modal.
$('.app-kill-process').on('click', function() {
    var $this = $(this);
    var $modal = $('#app-modal-kill-process-id');
    var $form = $modal.closest('form');
    var $tr = $this.closest('tr');

    // Update ID.
    $form.find('input[name="process_id"]').val($tr.find('input[name="process_id"]').val());

    // Update values in modal table.
    $form.find('.app-kill-process-id').html($tr.find('input[name="process_id"]').val());
    $form.find('.app-kill-username').html($tr.find('input[name="username"]').val());
    $form.find('.app-kill-command').html($tr.find('input[name="command"]').val());

    $modal.addClass('is-active');
});

$('.app-kill-processes-by-username').on('click', function() {
    var $this = $(this);
    var $modal = $('#app-modal-kill-processes-by-username');
    var $form = $modal.closest('form');
    var $tr = $this.closest('tr');

    // Update username.
    $form.find('input[name="username"]').val($tr.find('input[name="username"]').val());

    // Update values in modal table.
    $form.find('.app-kill-username').html($tr.find('input[name="username"]').val());
    $form.find('.app-kill-process-count').html($tr.find('input[name="process_count"]').val());

    $modal.addClass('is-active');
});

// Scrolling into view
$('.app-scroll-to-processes-by-users').click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#app-anchor-processes-by-users').offset().top - 75
    }, 1000);
});

$('.app-scroll-to-complete-process-list').click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#app-anchor-complete-process-list').offset().top - 75
    }, 1000);
});