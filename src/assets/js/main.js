(function ($) {
    "use strict";

    // Fonction qui renvoie une promesse lorsqu'un élément est trouvé
    var waitForElement = function (selector) {
        return new Promise(function (resolve) {
            var checkElement = function () {
                if ($(selector).length > 0) {
                    resolve();
                } else {
                    setTimeout(checkElement, 100);
                }
            };
            checkElement();
        });
    };

    // Fonction pour retirer la classe une fois que l'élément est trouvé
    var removeSpinner = function () {
        waitForElement('#spinner').then(function () {
            $('#spinner').removeClass('show');
        });
    };

    // Appel de la fonction
    removeSpinner();

    // ... Autres scripts jQuery ...
})(jQuery);
