// Tableau de compétences
var competences = ['html', 'css', 'javascript', 'bootstrap', 'angular', 'jquery', 'nodejs', 'mongodb', 'express', 'meteor', 'sass', 'wordpress'];
var element = [$('#accueil'), $('.button'), $('#parcours'), $('#contact'), $('realisations')];

var masqueBart = window.document.getElementById('masqueBart');
var bart = window.document.getElementById('bart');
var masqueBg = window.document.getElementById('masqueBg');
var bg = window.document.getElementById('bg');

window.onload = function() {
    // masque bart au chargement de la page
    masqueBart.style.position = 'absolute';
    masqueBart.style.overflow = 'hidden';
    bart.style.position = 'absolute';

    // masque le fond au chargement de la page
    masqueBg.style.position = 'absolute';
    masqueBg.style.overflow = 'hidden';
    bg.style.position = 'absolute';
    bg.style.overflow = 'hidden';

    $('#progressbar').hide();
    $('.regles').hide();
    $('.fin').hide();
    $('#haie').hide();
};

$(window).one("click", function() {

    var animDroite;
    var animGauche;
    var attaqueTimeout;
    var delai;


    delai = window.setTimeout(function() {
        $('#titre h1').html(function() {
            this.innerHTML = "<img src='./img/bart-titre.png'>";
            $('.cache').show();
        }).addClass('animated tada');
        base(0);
        $('.regles').fadeIn(1000);
        $('.flou').addClass("blur");
        $('.jouer').one("click", function() {
            $('.flou').removeClass("blur");
            $('.regles').hide();
            baseFond();
            $('#progressbar').show();
            $('#haie').show();
        });
    }, 600, function() {});
    delai;
    $("body").addClass("animation").fadeIn(8000, 'linear');

    ////////////////////////////////////////////////////////
    // mouvements
    ////////////////////////////////////////////////////////

    var mvtDroite = function(index) {
        masqueBart.style.width = sprite.droite[index].masque.width;
        masqueBart.style.height = sprite.droite[index].masque.height;

        if (masqueBart.style.left == '') {
            masqueBart.style.left = '0px';
        }
        if (parseFloat(masqueBart.style.left) > window.innerWidth) {
            masqueBart.style.left = '-4px';
        }
        masqueBart.style.left = (parseFloat(masqueBart.style.left) + 10) + 'px';

        bart.style.left = sprite.droite[index].sprite.left;
        bart.style.top = sprite.droite[index].sprite.top;
        bart.style.transform = 'scaleX(1)';

        animDroite = window.setTimeout(function() {
            if (index != 5) {
                mvtDroite(index + 1);
            } else {
                animDroite = null;
            }
        }, 60);
    };

    var mvtGauche = function(index) {
        masqueBart.style.width = sprite.gauche[index].masque.width;
        masqueBart.style.height = sprite.gauche[index].masque.height;

        if (masqueBart.style.left == '') {
            masqueBart.style.left = '0px';
        }
        if (masqueBart.style.left < '-4px') {
            masqueBart.style.left = window.innerWidth + 50 + 'px';
        }
        masqueBart.style.left = (parseFloat(masqueBart.style.left) - 10) + 'px';

        bart.style.left = sprite.gauche[index].sprite.left;
        bart.style.top = sprite.gauche[index].sprite.top;
        bart.style.transform = 'scaleX(-1)';

        animGauche = window.setTimeout(function() {
            if (index != 5) {
                mvtGauche(index + 1);
            } else {
                bart.style.left = '3px';
                animGauche = null;
            }
        }, 60);
    };

    ////////////////////////////////////////////////////////
    // attaque
    ////////////////////////////////////////////////////////

    var index = 0;
    var attaque = function() {
        masqueBart.style.width = sprite.attaque[index].masque.width;
        masqueBart.style.height = sprite.attaque[index].masque.height;

        bart.style.left = sprite.attaque[index].sprite.left;
        bart.style.top = sprite.attaque[index].sprite.top;
        attaqueTimeout = window.setTimeout(function() {
          index++;
            if (index % 3) {
                attaque();
                if (sprite.attaque[index].masque.width >= '79px') {
                  index = 0;
                }
            } else {
                // attaque(0);
                attaqueTimeout = null;
            }
        }, 120); //90
  };

    var attaqueGauche = function(){
      masqueBart.style.width = sprite.attaqueGauche[index].masque.width;
      masqueBart.style.height = sprite.attaqueGauche[index].masque.height;

      bart.style.left = sprite.attaqueGauche[index].sprite.left;
      bart.style.top = sprite.attaqueGauche[index].sprite.top;
      attaqueTimeout = window.setTimeout(function() {
        index++;
          if (index % 3) {
              attaqueGauche();
              if (sprite.attaqueGauche[index].masque.width >= '79px') {
                index = 0;
              }
          } else {
              // attaque(0);
              attaqueTimeout = null;
          }
      }, 120); //90
  };
    ////////////////////////////////////////////////////////
    // Collision
    ////////////////////////////////////////////////////////

    var coordonneesCube = function() {
        var cube = document.getElementById("carre");

        if (cube.getBoundingClientRect) {
            var point = cube.getBoundingClientRect();
            x = point.left;
            y = point.top;
            xd = point.right;
            w = point.right - point.left;
            h = point.bottom - point.top;
            // console.log(" Left: " + x + "\n Top: " + y + "\n Width: " + w + "\n Height: " + h);
            // console.log(xd);
        }
    };

    nouvelleHaie();

    var cube = document.getElementsByClassName('carre')[0];
    var compteur = 0;
    var collision = function(elem1, elem2, evt) {

        var rect1 = elem1.getBoundingClientRect();
        var rect2 = elem2.getBoundingClientRect();

        if ((rect1.right >= rect2.left && rect1.right <= rect2.right) || rect1.left === rect2.right || (rect2.right >= rect1.left && rect2.right <= rect1.right) || rect2.left === rect1.right) {
            if (evt == 'attaque') {
                if (compteur <= 11) {
                    var effet = window.setTimeout(function() {
                        // animation descente haie
                        $('.carre').animate({
                            height: '0px'
                        }, 500).detach();
                        // Ajout de l'image de la compétence
                        $('#competences').addClass('competences').append('<img src="./img/' + competences[compteur] + '.png" id="' + competences[compteur] + '" />');
                        // Animation suppression du prenom et ajout du ruban Bart
                        $('.title-middle').addClass('animated bounceOut', function() {
                            $('.title-middle').before("<img src='./img/bart_ruban.png' style='width:122px;'>");
                            $('.title-middle').detach();
                        });
                        compteur++;
                        // Ajout d'une nouvelle haie
                        nouvelleHaie();
                        // Animation de disparition d'un élément du site
                        if (element[compteur]) {
                            element[compteur].addClass('animated hinge');
                        }
                        // Progression de la barre
                        $('#barre').css("width", "+=7.7%");
                        cube = document.getElementsByClassName('carre')[0];
                    });
                } else {
                    $('.carre').detach();
                    $(document.body).addClass('flou');
                    $('.fin').show().removeClass('flou');

                }
            }
            if (evt == 'mur') {
                // Stop devant l'objet
                clearTimeout(animDroite);
                clearTimeout(animGauche);
                animDroite == null;
                animGauche == null;
                base(0);
            }
        }
    };

    ////////////////////////////////////////////////////////
    // Déclanchement evts touches
    ////////////////////////////////////////////////////////

    window.onkeydown = function(event) {

        var code = event.keyCode;

        switch (code) {
            case 37: // Gauche
                if (animGauche == null) {
                    mvtGauche(0);
                }
                collision(masqueBart, cube, 'mur');
                break;
            case 39: // Droite
                if (animDroite == null) {
                    mvtDroite(0);
                }
                event.preventDefault();
                collision(masqueBart, cube, 'mur');
                break;
            case 32: // Espace
                if (attaqueTimeout == null) {
                    if (bart.style.transform == 'scaleX(-1)') {
                        attaqueGauche();
                    } else {
                        attaque();
                    }
                }
                collision(masqueBart, cube, 'attaque');
                event.preventDefault();
                break;
        }
    };

    window.onkeyup = function(event) {
        var code = event.keyCode;
        var gauche = false;

        switch (code) {
            case 37: // Gauche
                // Arret de l'animation gauche
                clearTimeout(animGauche);
                animGauche = null;
                base(0, null, 'gauche');
                break;
            case 39: // Droite
                // Arret de l'animation droite
                clearTimeout(animDroite);
                animDroite = null;
                // retour à la position initiale
                base(0);
                break;
            case 32: // Espace
                clearTimeout(attaqueTimeout);
                attaqueTimeout = null;
                base(0);
                if (bart.style.left == '2px') {
                    base(0, null, 'gauche');
                }
                break;
        }
    };
});
