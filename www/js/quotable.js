var $text = null;
var $save = null;
var $poster = null;
var $themeButtons = null;
var $aspectRatioButtons = null;
var $quote = null;
var $fontSize = null;
var $show = null;
var $source = null;
var $quote = null;
var $logoWrapper = null;

var quotes = [
    {
        "quote": "Não vamos colocar meta. Vamos deixar a meta aberta, mas quando atingirmos a meta, vamos dobrar a meta.",
        "source": "Dilma Rousseff",
        "size": 40
    },
    {
        "quote": "Nunca antes na história deste país",
        "source": "Lula"
    },
    {
        "quote": "Nunca fumei maconha, bebi álcool ou usei daime. Só Biotônico Fontoura",
        "source": "Marina Silva",
        "size": 45
    },
    {
        "quote": "Pior que tá não fica",
        "source": "Tiririca",
        "size": 90
    },
    {
        "quote": "Não entendo mesmo de economia",
        "source": "Jair Bolsonaro",
        "size": 65
    },
    {
        "quote": "Na economia também a mulher tem grande participação. Ninguém mais é capaz de indicar os desajustes de preços no supermercado do que a mulher.",
        "source": "Michel Temer",
        "size": 40
    }
];


// Change straight quotes to curly and double hyphens to em-dashes.
//function smarten(a) {
//  a = a.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018");       // opening singles
//  a = a.replace(/'/g, "\u2019");                            // closing singles & apostrophes
//  a = a.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
//  a = a.replace(/"/g, "\u201d");                            // closing doubles
//  a = a.replace(/--/g, "\u2014");                           // em-dashes
//  a = a.replace(/"/g, "\u201d");                            // closing doubles
//  a = a.replace(/--/g, "\u2014");                           // em-dashes
// a = a.replace(/ \u2014 /g, "\u2009\u2014\u2009");         // full spaces wrapping em dash
// return a;
//}

function smarten(a) {
  a = a.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018");       // opening singles
  a = a.replace(/'/g, "\u2019");                            // closing singles & apostrophes
  a = a.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
  a = a.replace(/"/g, "\u201d");                            // closing doubles
  a = a.replace(/--/g, "\u2014");                           // em-dashes
  a = a.replace(/ \u2014 /g, "\u2009\u2014\u2009");         // full spaces wrapping em dash
  return a;
}

function convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}

function processText() {
    $text = $('.poster blockquote p, .source');
    $text.each(function() {
        var rawText = $.trim($(this).html());
        $(this).html(smarten(rawText)).find('br').remove();
    });
}

function saveImage() {
    // first check if the quote actually fits
    if (($source.offset().top + $source.height()) > $logoWrapper.offset().top) {
        alert("Your quote doesn't quite fit. Shorten the text or choose a smaller font-size.");
        return;
    }

    // don't print placeholder text if source is empty
    if ($source.text() === '') {
        alert("A source is required.");
        return;
    }

    // make sure source begins with em dash
    if (!$source.text().match(/^[\u2014]/g)) {
        $source.html('&mdash;&thinsp;' + $source.text());
    }

    $('canvas').remove();
    processText();

    html2canvas($poster, {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
        window.oCanvas = document.getElementsByTagName("canvas");
        window.oCanvas = window.oCanvas[0];
        var strDataURI = window.oCanvas.toDataURL();

        var quote = $('blockquote').text().split(' ', 5);
        var filename = convertToSlug(quote.join(' '));

        var a = $("<a>").attr("href", strDataURI).attr("download", "aosfatos-" + filename + ".png").appendTo("body");

        a[0].click();

        a.remove();

        $('#download').attr('href', strDataURI).attr('target', '_blank');
        $('#download').trigger('click');
      }
    });
}

function adjustFontSize(size) {
    var fontSize = size.toString() + 'px';
    $poster.css('font-size', fontSize);
    if ($fontSize.val() !== size){
        $fontSize.val(size);
    };
}

$(function() {
    $text = $('.poster blockquote p, .source');
    $save = $('#save');
    $poster = $('.poster');
    $themeButtons = $('#theme .btn');
    $aspectRatioButtons = $('#aspect-ratio .btn');
    $fontSize = $('#fontsize');
    $show = $('#show');
    $source = $('.source');
    $showCredit = $('.show-credit');
    $quote = $('#quote');
    $logoWrapper = $('.logo-wrapper');

    var quote = quotes[Math.floor(Math.random()*quotes.length)];
    if (quote.size){
        adjustFontSize(quote.size);
    }
    $('blockquote p').text(quote.quote);
    $source.html('&mdash;&thinsp;' + quote.source);
    processText();

    $save.on('click', saveImage);

    $themeButtons.on('click', function() {
        $themeButtons.removeClass().addClass('btn btn-primary');
        $(this).addClass('active');
        $poster.removeClass('poster-theme1 poster-theme2 poster-theme3 poster-theme4 poster-theme5 poster-theme6 poster-theme7 poster-theme8')
                    .addClass('poster-' + $(this).attr('id'));
    });

    $aspectRatioButtons.on('click', function() {
        $aspectRatioButtons.removeClass().addClass('btn btn-primary');
        $(this).addClass('active');
        $poster.removeClass('square sixteen-by-nine').addClass($(this).attr('id'));

        if ($poster.hasClass('sixteen-by-nine')) {
            adjustFontSize(32);
            $fontSize.val(32);
        } else {
            adjustFontSize(90);
            $fontSize.val(90);
        }
    });

    $quote.on('click', function() {
        $(this).find('button').toggleClass('active');
        $poster.toggleClass('quote');
    });

    $fontSize.on('change', function() {
        adjustFontSize($(this).val());
    });

    $show.on('keyup', function() {
        var inputText = $(this).val();
        $showCredit.text(inputText);
    });

    // // This event is interfering with the medium editor in some browsers
    // $('blockquote').on('keyup', function(){

    //     console.log($(this)[0].selectionStart);
    //     process_text();
    // });


    var quoteEl = document.querySelectorAll('.poster blockquote');
    var sourceEl = document.querySelectorAll('.source');

    var quoteEditor = new MediumEditor(quoteEl, {
        disableToolbar: true,
        placeholder: 'Type your quote here'
    });

    var sourceEditor = new MediumEditor(sourceEl, {
        disableToolbar: true,
        placeholder: 'Type your quote source here'
    });
});
