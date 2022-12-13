/////////////////////////////////////////
// Définition de la classe Movie
// Idéalement dans un fichier à part 
// et importée avec les modules
//////////////////////////////////////
class Movie {
    constructor(
        title, 
        duration, 
        releaseDate, 
        casting, 
        genres, 
        director, 
        nationality, 
        poster, 
        imdbLink
    ) {
        this.title = title;
        this.duration = duration;
        this.releaseDate = new Date(releaseDate);
        this.casting = casting;
        this.genres = genres;
        this.director = director;
        this.nationality = nationality;
        this.poster = poster;
        this.imdbLink = imdbLink;
    }

    formatDuration() {
        const hours = Math.floor(this.duration/60);
        const minutes = this.duration%60;
        let formatedDuration = hours > 0 ? `${hours}h` : '';
        formatedDuration += String(minutes).padStart(2,'0');
        return formatedDuration;
    }

    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
      
    formatDate(date) {
        return [
          this.padTo2Digits(date.getDate()),
          this.padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
    }

    toHTML() {
        return `<article>
            <h3>${this.title}</h3>
            <p>Durée : ${this.formatDuration()}</p>
            <p>Sortie en salles : ${this.formatDate(this.releaseDate)}</p>
            <img src="posters/${this.poster}" alt="${this.title}">
            <p>Casting : ${this.casting.join(', ')}</p>
            <p>Genres : ${this.genres.join(', ')}</p>
            <p>${this.nationality}</p>
            <p><a target="_blank" href="${this.imdbLink}" title="Voir la fiche IMDB">Lien IMDB</a></p>
        </article>`;
    }
}

//////////////////////////////////////////////////////////////////
// DONNEES 
// Création d'un tableau contenant des objets de la classe Movie
// En vrai on ferait appel à une API pour récupérer les données
// des films en JSON grâce à la technique "AJAX". 
/////////////////////////////////////////////////////////////////
const movies = [
    new Movie (
        'Jurassic Park',
        122, 
        '1993-12-01', 
        ['Sam Neill', 'Laura Dern', 'Jeff Goldblum'], 
        ['Aventure', 'Science-fiction'], 
        'Steven Spielberg', 
        'USA', 
        'jurassic-park.png', 
        'https://www.imdb.com/title/tt0107290/'
    ),
    new Movie (
        'District 9',
        112, 
        '2022-11-09', 
        ['Sharlto Copley', 'Jason Cope', 'David James (XLII)'], 
        ['Thriller', 'Action', 'Science-fiction'], 
        'Neill Blomkamp', 
        'USA', 
        'district-9.png', 
        'https://www.imdb.com/title/tt1136608/'
    ),
    new Movie (
        'La guerre des Lulus',
        103, 
        '2023-01-18', 
        ['Isabelle Carré', 'Didier Bourdon', 'François Damiens'], 
        ['Aventure', 'Famille', 'Historique'], 
        'Yann Samuell', 
        'France', 
        'lulus.png', 
        'https://www.imdb.com/title/tt22039496/'
    )
];

//////////////////////////////////////////////////////
// DEFINITION DE FONCTIONS
/////////////////////////////////////////////////////

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
function filterByGenre(movies,genre) 
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
    const filteredMovies = filterByGenre(movies, genre);
    displayMovies(filteredMovies);
}

function onClickOrderByTitle() 
{
    // Tri des films par ordre alphabétique du titre
    sortByTitle(movies);

    // On affiche les films une fois triés par titre
    displayMovies(movies);
}

function onClickOrderByDate() 
{
    // Tri des films par ordre alphabétique du date
    sortByReleaseDate(movies);

    // On affiche les films une fois triés par date
    displayMovies(movies);
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

/**
 * Installation d'un gestion d'événement sur l'événement "change" sur la liste déroulante des genres
 */
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