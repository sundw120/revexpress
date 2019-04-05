
var h = $('#headTable td').height();
$('.arrow-up').css({
    'margin-top': h
});

var flag = false;
$('#headTable td').unbind("mousedown");
$('#headTable td').mousedown(function () {
    let startIndex = $(this).index();
    let endIndex;
    flag = true;
    $('#info').css({
        display: 'block'
    });
    //$('#triangle').css('display', 'block');
    $('body').addClass('no-select-text');
    $('#info').html($(this).html());
    $(document).mousemove(function (e) {
        if (flag) {
            var e = e || window.event;
            var x = e.clientX + 5 + 'px';
            var y = e.clientY + 5 + 'px';
            $('#info').css({
                left: x,
                top: y
            });
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }

    });

    $('table td').mouseenter(function () {
        endIndex = $(this).index();
        if (endIndex == startIndex) {
            $('#triangle').css('display', 'none');
        } else {
            $('#triangle').css('display', 'block');
        }
        var offsetW = 0;
        var preTd = $(this).prevAll();
        $.each(preTd, function (id, item) {
            offsetW += item.offsetWidth;
        })
        if (endIndex > startIndex) {
            offsetW += $(this)["0"].offsetWidth;
        }
        $('#triangle').css({
            'top': 0,
            'left': offsetW + 4
        });
    });
    $(document).mouseup(function () {
        flag = false;
        $('#triangle').css('display', 'none');
        $('#info').css({
            display: 'none'
        });
        if (endIndex < startIndex) {
            $("#headTable tr").each(function (i) {
                $('#headTable tr:eq(' + i + ') td:eq(' + endIndex + ')').before($('#headTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                $('#headTable tr:eq(' + i + ') td:eq(' + (startIndex + 1) + ')').remove();
                $('#headTable tr:eq(' + i + ') td:eq(' + endIndex + ')').before($('#headTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                $('#headTable tr:eq(' + i + ') td:eq(' + (startIndex + 1) + ')').remove();
            });

        } else if (endIndex > startIndex) {
            $("#mainTable tr").each(function (i) {
                $('#headTable tr:eq(' + i + ') td:eq(' + endIndex + ')').after($('#headTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                $('#headTable tr:eq(' + i + ') td:eq(' + (startIndex) + ')').remove();
                $('#headTable tr:eq(' + i + ') td:eq(' + endIndex + ')').after($('#headTable tr:eq(' + i + ') td:eq(' + startIndex + ')').clone(true));
                $('#headTable tr:eq(' + i + ') td:eq(' + (startIndex) + ')').remove();
            });

        }
        $(document).unbind("mousemove");
        $(document).unbind("mouseup");
        $('table td').unbind("mouseenter");
    });

});