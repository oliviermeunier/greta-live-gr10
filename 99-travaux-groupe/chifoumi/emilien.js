let joueur = prompt("Shifoumi ?");
joueur = joueur.toLocaleLowerCase();


const sign = ['pierre', 'ciseaux', 'papier']

let aleatoire = Math.floor(Math.random() * 3);
let random = sign[aleatoire];



if (joueur == random) {
    document.getElementById('test').innerHTML =
    'EGALITE !'
    document.getElementById('test2').innerHTML =
    "j'ai joué " + random;

}  else if ( random == 'pierre' && joueur == 'papier'|| random == 'papier' && joueur == 'ciseaux' || random == 'ciseaux' && joueur == 'pierre' ) {
            document.getElementById('test').innerHTML =
            "t'as gagné"
            document.getElementById('test2').innerHTML =
            "j'ai joué " + random;

}   else if ( random == 'papier' && joueur == 'pierre' ||random == 'ciseaux' && joueur == 'papier' || random == 'pierre' && joueur == 'ciseaux') {
            document.getElementById('test').innerHTML =
            "t'as perdu"
            document.getElementById('test2').innerHTML =
            "j'ai joué " + random;

}   else {
    document.getElementById('test').innerHTML =
    "Apprends à jouer"
}