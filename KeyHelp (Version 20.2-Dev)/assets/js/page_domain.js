tippy('.app-domain-info', $.extend(tippySettingsTooltipMandatory, {
    onShown: function(instance) {
        bindCopyToClipboardEvents();
    }
}));