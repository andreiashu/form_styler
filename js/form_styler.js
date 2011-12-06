
Drupal.behaviors.form_styler = function (context) {
  $('form.form-styler:visible', context).each(function () {
    $(this).jqTransform(Drupal.settings.form_styler);
  });
};
