// Selector styler from http://www.tuttoaster.com/enhancing-forms-using-jquery-ui/
if ($.ui) {
  $.widget('ui.form', {
    _init:function () {
      var object = this;
      var form = this.element;
      //var inputs = form.find('input , select , textarea ');
      var inputs = form.find('select');

      form.find('fieldset').addClass('ui-widget-content');
      form.find('legend').addClass('ui-widget-header ui-corner-all');
      form.addClass('ui-widget');

      $.each(inputs, function () {
        $(this).addClass('ui-state-default ui-corner-all');
        $(this).wrap('<label />');

        if ($(this).is('select')) object.selector(this);
        //else if ($(this).is(':reset, :submit')) object.buttons(this);
        //else if ($(this).is(':checkbox')) object.checkboxes(this);
        //else if ($(this).is('input[type="text"]') || $(this).is('textarea') || $(this).is('input[type="password"]')) object.textelements(this);
        //else if ($(this).is(':radio')) object.radio(this);

        if ($(this).hasClass('date')) {
          $(this).datepicker();
        }
      });
    },

    selector:function (element) {
      var parent = $(element).parent();
      parent.css({
        'display':'block',
        height:38
      }).addClass('ui-state-default ui-corner-all');

      $(element).addClass('ui-helper-hidden');
      parent.append('<span class="labeltext" style="float:left;"></span><span style="float:right; display:inline-block" class="ui-icon ui-icon-triangle-1-s"></span>');

      // Set position and width according to label
      var setWidth = '';
      if (parent.width() > 0) {
        setWidth = ' width:' + parent.outerWidth() + 'px;';
      }
      var setTop = '', setLeft = '';
      setTop = ' top:' + ( Number(parent.position().top) + Number(parent.outerHeight()) ) + 'px;';
      setLeft = ' left:' + parent.position().left + 'px;';
      parent.after('<ul class="ui-helper-reset ui-widget-content ui-helper-hidden" style="position:absolute; z-index:1024;' + setWidth + setTop + setLeft + '"></ul>');

      // Set the overflow of the container .form-item to visible
      var itemContainer = parent.closest('.form-item');
      itemContainer.css('height', itemContainer.outerHeight() + 'px');
      parent.closest('.form-item').css('overflow', 'visible');


      $.each($(element).find('option'), function () {
        $(parent).next('ul').append('<li class="hover">' + $(this).html() + '</li>');
      });

      $(parent).next('ul').find('li').click(function () {
        $(parent).children('.labeltext').html($(this).html());
        // Sets the chosenItem variable to the list item selected
        chosenItem = $(this).html();
        // Adds attribute selected to the selected option
        $(element).find('option').each(function () {
          if (chosenItem == $(this).text() && $(this).attr('selected') == false) {
            $(this).attr('selected', 'selected');
            $(this).trigger('change').blur(); // force change cross-browser
          }
        });

        $('.current_dropdown').removeClass('current_dropdown').next().hide('fast');

        // Auto-submit on select boxes with class autosubmit
        if ($(element).is('select') && $(element).hasClass('autosubmit')) {
          $(element).change(function () {
            $(this).closest('form').submit();
          });
        }
      });


      $(parent).click(function (event) {
        $(this).next().slideToggle('fast');

        // If current item has the dropdownb class, then set a temp class (as all classes will be removed)
        if (!$(this).hasClass('current_dropdown')) {
          $(this).addClass('current_dropdown_temp');
        }

        // Remove all classes, and hide relevant boxes
        $('.current_dropdown').removeClass('current_dropdown').next().hide('fast');

        // Convert temp class to real class
        $('.current_dropdown_temp').addClass('current_dropdown').removeClass('current_dropdown_temp');

        event.preventDefault();
      });
    }
  });
}
