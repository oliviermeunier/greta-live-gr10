let joueur = (prompt("Pierre, Feuille ou Ciseau ?")).toLowerCase();
let shifumi = ["pierre", "feuille", "ciseau"];
if (!shifumi.includes(joueur)){
        document.write("Tricheur !")
}
else{
        let ordi = shifumi[Math.floor(Math.random() * 3)];
        document.write("<p>Vous avez joué " + joueur + "<br>");
        document.write("L'ordinateur a joué " + ordi + "</p>");
        if (joueur == ordi){
                document.write("<p>--> Egalité</p>");
        }
        else if ((joueur == "pierre" && ordi == "ciseau") || (joueur == "feuille" && ordi == "pierre") || (joueur == "ciseau" && ordi == "feuille")){
                document.write("<p>--> Vous avez gagné</p>");
        }
        else{
                document.write("<p>--> Vous avez perdu</p>");
        }
}