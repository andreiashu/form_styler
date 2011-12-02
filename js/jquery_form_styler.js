
Drupal.behaviors.jquery_form_styler = function (context) {
  $('form.form-styler', context).each(function () {
    $(this).jqTransform({imgPath: '/sites/all/modules/custom/jquery_form_styler/js/jqTransform/jqtransformplugin/img/'});
  });
};
