// Alexandra

// 1/ L'utilisateur choisit.
let userChoice= window.prompt('pierre,feuille ou ciseaux?');
const Options = ["pierre", "feuille", "ciseaux"];
document.write('<p>Vous avez choisi :  ' + userChoice + ". </p>");

// 2/ Le PC choisit en "random" (choix aléatoire).
const cInput = Options[Math.floor(Math.random() * 3)];
document.write('<p>Le PC a choisi :  ' + cInput + ". </p>");

// 3/ Prévoir tous les cas de figure (SI ou SI ou SI...).
if(userChoice==Options[0]||userChoice==Options[1]||userChoice==Options[2]){

    if(userChoice==Options[0]&&cInput==Options[0]){
        document.write('<p> Egalité</p>')}

    if(userChoice==Options[0]&&cInput==Options[1]){
        document.write('<p> Vous avez perdu.</p>')}

    if(userChoice==Options[0]&&cInput==Options[2]){
        document.write('<p> Vous avez gagné.</p>')}

    if(userChoice==Options[1]&&cInput==Options[0]){
        document.write('<p> Vous avez gagné.</p>')}

    if(userChoice==Options[1]&&cInput==Options[1]){
        document.write('<p> Egalité</p>')}

    if(userChoice==Options[1]&&cInput==Options[2]){
        document.write('<p> Vous avez perdu.<p/>')}

    if(userChoice==Options[2]&&cInput==Options[0]){
        document.write('<p> Vous avez perdu.<p/>')}

    if(userChoice==Options[2]&&cInput==Options[1]){
        document.write('<p> Vous avez gagné.<p/>')}

    if(userChoice==Options[2]&&cInput==Options[2]){
        document.write('<p> Egalité<p/>')}
}

// 4/ Prévoir si l'utilisateur fait un autre choix que pierre/feuille/ciseaux (else).

else{
    document.write('<p> Veuillez saisir au choix: pierre, feuille ou ciseaux!</p>')
}