
Drupal.behaviors.form_styler = function (context) {
  $('form.form-styler', context).each(function () {
    $(this).jqTransform({imgPath: Drupal.settings.imgPath});
  });
};
