
Drupal.behaviors.form_styler = function (context) {
  $('form.form-styler', context).each(function () {
    $(this).jqTransform(Drupal.settings.form_styler);
  });
};
