// Import des modules
import Movie from './modules/Movie.js';


//////////////////////////////////////////////////////
// DEFINITION DE FONCTIONS
/////////////////////////////////////////////////////

/**
 * Lance une requête AJAX pour récupérer les données des films
 * @param {string} url URL de la requête AJAX
 */
async function fetchMovies(url)
{
    const response = await fetch(url);
    const movies = response.json();
    return movies;
}

/**
 * Fonction appelée au chargement de la page
 */
async function init()
{
    // On récupère les movies du fichier JSON
    movies = await fetchMovies('js/data/movies.json');
    
    // On crée les objets Movie
    movies = movies.map(dataMovie => new Movie(dataMovie));

    // On installe tous les gestionnaires d'événements sur la page
    const selectGenre = document.querySelector('[name="genre"]');
    selectGenre.addEventListener('change', onChangeGenre);

    const orderByTitleBtn = document.getElementById('order-by-title-button');
    orderByTitleBtn.addEventListener('click', onClickOrderByTitle);

    const orderByDateBtn = document.getElementById('order-by-date-button');
    orderByDateBtn.addEventListener('click', onClickOrderByDate);

    const allMoviesBtn = document.getElementById('all-movies-button');
    allMoviesBtn.addEventListener('click', onClickAllMovies);

    // On affiche tous les films pour commencer
    displayMovies(movies);
}


/**
 * Affiche les objets Movie contenus dans un tableau
 * @param {Array<Movie>} movies 
 */
function displayMovies(movies)
{
    // Sélection de l'élément du DOM à l'intérieur duquel je veux écrire le HTML
    const list = document.getElementById('film-list');

    // On efface le contenu actuel de la liste
    list.innerHTML = '';

    // Parcours du tableau de films
    for (const movie of movies) {

        // pour chaque film, je récupère le code HTML et je l'ajoute au HTML du conteneur
        list.innerHTML += movie.toHTML();
    }
}

/**
 * Définition de la fonction qui va trier les films par ordre alphabétique du titre
 * Je décide de lui donner en paramètre le tableau de films à trier
 * IMPORTANT : le paramètre movies est un objet de la classe Array.
 * Les objets sont passés en paramètre par référence ! Par défaut les objets d'origine seront modifiés
 */
function sortByTitle(movies) 
{
    movies.sort( function (movie1, movie2) {

        const title1 = movie1.title.toLowerCase();
        const title2 = movie2.title.toLowerCase();

        if (title1 < title2) {
            return -1;
        } else if (title1 > title2) {
            return 1;
        } else {
            return 0;
        }
    });
}

/**
 * Tri un tableau d'objets Movie par date de réalisation croissante
 * @param {Array<Movie>} movies 
 */
function sortByReleaseDate(movies) 
{
    movies.sort( function (movie1, movie2) {
        if (movie1.releaseDate < movie2.releaseDate) {
            return -1;
        } else if (movie1.releaseDate > movie2.releaseDate) {
            return 1;
        } else {
            return 0;
        }
    });
}

/**
 * Retourne un tableau contenant uniquement les films qui possèdent un genre particulier
 * @param {Array<Movie>} movies 
 * @param {string} genre 
 */
function filterByGenre(genre) 
{
    return movies.filter(movie => {
        return movie.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())
    });
}

/********************************
 * Gestionnaires d'événements
 ********************************/
function onChangeGenre(event) 
{
    const genre = event.currentTarget.value; 
    results = filterByGenre(genre);
    displayMovies(results);
}

function onClickOrderByTitle() 
{
    // Tri des films par ordre alphabétique du titre
    sortByTitle(results);

    // On affiche les films une fois triés par titre
    displayMovies(results);
}

function onClickOrderByDate() 
{
    // Tri des films par ordre alphabétique du date
    sortByReleaseDate(results);

    // On affiche les films une fois triés par date
    displayMovies(results);
}

function onClickAllMovies()
{
    displayMovies(movies);
}

/////////////////////////////////////////////
// CODE PRINCIPAL
// Exécuté au chargement de la page 
// (code en dehors de toute fonction)
////////////////////////////////////////

// Variable globales
let movies; // Tous les films 
let results = structuredClone(movies); // Les résultats du filtre par genre

init();