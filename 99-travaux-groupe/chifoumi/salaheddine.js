
//-------SalahEddine-----------//
//################ JEU DE PIERRE-FEULLE-CISEU #########

//-----Partie JOUEUR-----

let actionJ = window.prompt("Choisissez entre : pierre, feuille, ciseau");

//----Partie PC---------
const min = 0;
const max = 3; // [0,3[
let action = ["pierre","feuille","ciseau"];

//--illustration des différentes possibilités--- 

let gagne = ["pierre-ciseau","feuille-pierre","ciseau-feuille"];
let perdu = ["pierre-feuille","ciseau-pierre","feuille-ciseau"];
let egalite = ["pierre-pierre","ciseau-ciseau","feuille-feuille"];

//-------Le choix du PC--------
const randomInt = Math.random() * (max - min) + min;
let coupPC = action[randomInt.toFixed(0)];

// ------traitement-------------
let coupActuel = actionJ+"-"+coupPC;
if (gagne.includes(coupActuel)){
    document.write("gagné");
} 
else if (perdu.includes(coupActuel)){
    document.write("perdu");
} 
else if (egalite.includes(coupActuel)){
    document.write("egalité");
} else {
  document.write("tricheur !");
}

//----affichage de résultat-------
document.write("<br>"+coupActuel);