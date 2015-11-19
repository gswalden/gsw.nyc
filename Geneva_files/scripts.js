!(function(window) {
  var Fuse = window.Fuse;

  var char = 65;
  $('.row').each(function() {
    var num = 1;
    $(this).find('.sq').each(function() {
      var id = String.fromCharCode(char) + num;
      this.id = id;
      this.dataset.name = id;
      num++;
    });
    char++;
  });

  var origColors = [
    "#1ABC9C",
    "#16A085",
    "#2ECC71",
    "#27AE60",
    "#3498DB",
    "#2980B9",
    "#9B59B6",
    "#8E44AD",
    "#34495E",
    "#2C3E50",
    "#F1C40F",
    "#F39C12",
    "#E67E22",
    "#D35400",
    "#E74C3C",
    "#C0392B",
  ];
  var colors;
  function setColors() {
    colors = _.shuffle(origColors);
  }

  function addDesks(desks) {
    desks.forEach(function(desk) {
      var elem = $('#' + desk);
      elem.addClass('desk');
    });
  }
  addDesks(window.desks);

  function addPersons(persons) {
    persons.forEach(function(person) {
      person.elems = $();
      // var color = random(colors);
      if (!colors || colors.length === 0) {
        setColors();
      }
      person.color = colors.pop();
      person.seats.forEach(function(seat) {
        var $elem = $('#' + seat);
        person.elems = person.elems.add($elem);
        $elem.css('background', person.color)
          .addClass('person');
        $elem[0].dataset.name = person.name;
      });
      person.elems.hover(function() {
        person.elems.addClass('active');
      }, function() {
        if (!person.elems.hasClass('searched'))
          person.elems.removeClass('active');
      });
    });
  }
  addPersons(persons);

  var fuse = new Fuse(persons, {
    keys: ['name'],
    threshold: 0.4
  });

  var lastVal;
  $('#search').on('keyup change', function() {
    var val = this.value.toLowerCase().trim();
    if (val === lastVal) return;
    lastVal = val;

    var matches = fuse.search(val);
    $('.active').removeClass('active searched');
    matches.forEach(function(person) {
      // var bool = Boolean(val && person.name.toLowerCase().match(val));
      person.elems.addClass('active searched');
    });
    $('#matches').html(val ? list({
      persons: matches.reverse()
    }) : '');
    $('#matches tr').on('click', function() {
      $('#search').val(this.dataset.name).change();
    });
  });


  $('.sq').click(function() {
    $(this).toggleClass('selected');
  }).hover(function() {
    var $elem = $(this);
    var pos = $elem.offset();
    var width = $elem.width();
    $tooltip.text(this.dataset.name)
      .css({
        top: pos.top + width,
        left: pos.left + width
      }).show();
  }, function() {
    $tooltip.text('').hide();
  });

  var $tooltip = $('.tooltip');

  $('#desk').click(function() {
    var obj = {
      on: [],
      off: []
    };
    $('.selected').each(function() {
      var id = this.id;
      var $elem = $(this);
      var isDesk = $elem.hasClass('desk');
      if (isDesk) {
        obj.off.push(id);
      } else {
        obj.on.push(id);
      }
      $elem.toggleClass('desk');
    });
    $.ajax({
      url: '/desks',
      method: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      }
    });
  });

  $('#person-form').submit(function() {
    var email = $('#email').val().toLowerCase().trim();
    var desks = [];
    $('.selected').each(function() {
      var id = this.id;
      var $elem = $(this);
      desks.push({
        email,
        id
      });
    });
    $.ajax({
      url: '/persons',
      method: 'POST',
      data: JSON.stringify(desks),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      }
    });
  });

  $('#deselect').click(function() {
    $('.sq.selected').removeClass('selected');
  });

  $('form').submit(function(e) {
    e.preventDefault();
    return false;
  });

  function getSeat(seat) {
    return seat.row + seat.col;
  }

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  function get(id) {
    return document.getElementById(id);
  }

  var list = _.template(
    '<table class="pure-table pure-table-striped">'
      + '<% var i = persons.length; while (i--) { %>'
        + '<tr data-name="<%= persons[i].name %>">'
          + '<td class="name"><%= persons[i].name %></td>'
          + '<td style="background:<%= persons[i].color %>"></td>'
        + '</tr>'
      + '<% } %>'
    + '</table>'
  );

  var tooltip = _.template('<div class="tooltip"><%= name %></div>');

})(window);
