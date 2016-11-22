function fadeIn(elem) {
    elem.style.opacity = 0;
    elem.style.overflow = "visible";

    (function fade() {
        var val = parseFloat(elem.style.opacity);
        if (!((val += .1) > 1)) {
            elem.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

var baseFond = function() {
    bg.style.bottom = '0px';
    fadeIn(masqueBg);
};

////////////////////////////////////////////////////////
// position de base
////////////////////////////////////////////////////////

var base = function(index, action, sens) {
    masqueBart.style.width = sprite.attente[index].masque.width;
    masqueBart.style.height = sprite.attente[index].masque.height;
    masqueBart.style.bottom = '30px';

    bart.style.left = sprite.attente[index].sprite.left;
    bart.style.top = sprite.attente[index].sprite.top;

    if (sens == 'gauche') {
        bart.style.transform = 'scaleX(-1)';
        bart.style.left = '-534px';
    }
    if (action == 'attente') {
        attenteTimeout = window.setTimeout(function() {
            if (index != 3) {
                fonctAttente(index + 1);
            } else {
                fonctAttente(0);
                attenteTimeout = null;
            }
        }, 250);
    }
};

var fonctAttente = function(index) {
    masqueBart.style.width = sprite.attente[index].masque.width;
    masqueBart.style.height = sprite.attente[index].masque.height;

    bart.style.left = sprite.attente[index].sprite.left;
    bart.style.top = sprite.attente[index].sprite.top;
    attenteTimeout = window.setTimeout(function() {
        if (index != 3) {
            fonctAttente(index + 1);
        } else {
            fonctAttente(0);
            attenteTimeout = null;
        }
    }, 450);
};

var nouvelleHaie = function() {
    var aleatoire = ((Math.random() * 100)).toFixed();
    var windowsize = $(window).width();
    var posx = (Math.random() * (windowsize - aleatoire)).toFixed() + "px";
    var nouvelleDiv = document.createElement("div");
    nouvelleDiv.className = "carre";
    var arrive = window.setTimeout(function() {
        $('.carre').animate({
            height: "65px"
        }, 500);
    });
    document.getElementById('haie').appendChild(nouvelleDiv);
    nouvelleDiv.style.left = posx;
};
