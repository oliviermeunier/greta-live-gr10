
//Exo 10
let joueur= (window.prompt('Choisi entre Pierre, Feuille ou Ciseaux')).toLowerCase();

//Tableau avec les 3 possibilités
let chifumi= ['pierre','feuille','ciseaux'];

  // Formule pour choisir au hasard l'une des 3 valeurs du tableau ci-dessus
let ordi=chifumi[Math.floor(Math.random() * 3)];

//information sur le vainqueur
  document.write("L'ordinateur a jouer: "+ ordi+'<br>'+'<br>');
  document.write("Vous avez jouer: "+ joueur+'<br>'+'<br>');

   //si il y a égalité
if (joueur==ordi){
  document.write('Egalité!');            
} 

//si le joueur choisi ciseaux
else if (joueur=='ciseaux'){         
  if (ordi=='feuille'){
      document.write('Vous avez gagné!');
  }
  else{
      document.write('Vous avez perdu!');
  }
}

//si le joueur choisi pierre
else if (joueur=='pierre'){               
  if (ordi=='feuille'){
      document.write('Vous avez perdu!');
  }
  else{
      document.write('Vous avez gagné!');
  }
}

//si le joueur choisi feuille
else if (joueur=='feuille'){
  if (ordi=='ciseaux'){
      document.write('Vous avez perdu!');
  }
  else{
      document.write('Vous avez gagné!');
  }
}

//si le joueur choisi d'écrire n'importe quoi
else if(joueur!='ciseaux','pierre','feuille'){
  document.write('Tricheur!')
}