/**
 * Created by mwolff on 19.04.2017.
 */
$(document).ready(function() {

    _selectors = {
        memoryContainer: '[data-controller="memoryContainer"]'
    };

    var buildHtml = function (array) {
        var x = 0;
        console.log('build');
        for (j = 0; j < 4; j++) {
            $(_selectors.memoryContainer).append('<div class = "tileContainer" data-controller = "tileContainer' + j + '"></div>');
            for (i = 0; i < 4; i++) {
                $('[data-controller="tileContainer' + j + '"]').append(array[x]);
                x++;
            }
        }
    };

    var cards = [];
    var colors = ["red", "green", "blue", "DeepPink ", "black", "yellow", "aqua", "coral"];

    var createArray = function () {
        console.log('tests');
        for (x = 0; x < 8; x++) {
            cards.push('<div class="tile noColor" style="background-color:   ' + colors[x] + '" id= "' + x + '"></div>');
            cards.push('<div class="tile noColor" style="background-color:   ' + colors[x] + '" id= "' + x + '"></div>')
        }
    }

    var shuffleArray = function (array) {
        var m = array.length,
            t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
    };

    var hideCards = function ($elem1, $elem2) {
        $elem1.addClass('noColor');
        $elem2.addClass('noColor');
    };


    var click = 0;
    var elem1;
    var elem2;
    var usedCards = [];
    createArray();
    shuffleArray(cards);
    buildHtml(cards);

    $(_selectors.memoryContainer).on('click', '[class = "tile noColor"]', function () {

        switch (click % 2) {
            case 0:
                elem1 = this;
                $(this).removeClass('noColor');
                break;
            case 1:
                elem2 = this;
                $(this).removeClass('noColor');
                break;
        }

        if (click % 2 == 1) {
            if (elem1.id == elem2.id) {
                usedCards.push(elem1.id)
            } else {
                setTimeout(function () {
                    hideCards($(elem1), $(elem2))
                }, 500);
            }
        }

        if (usedCards.length === 8) {
            alert('Sie haben gewonnen!!');
            createArray();
            shuffleArray(cards);
            buildHtml(cards);

        }

        click++;
    });
});
