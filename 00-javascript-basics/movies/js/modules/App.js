import Movie from './Movie.js';

const URL_MOVIES = 'js/data/movies.json';

export default class App {
    
    constructor() {
        this.movies = null;
        this.filteredMovies = null;
        this.init();
    }

    /**
     * Lance une requête AJAX pour récupérer les données des films
     * @param {string} url URL de la requête AJAX
     */
    async fetchMovies(url)
    {
        const response = await fetch(url);
        const movies = response.json();
        return movies;
    }

    /**
     * Fonction appelée au chargement de la page
     */
    async init()
    {
        // On récupère les movies du fichier JSON
        const movies = await this.fetchMovies(URL_MOVIES);
        
        // On crée les objets Movie
        this.movies = movies.map(dataMovie => new Movie(dataMovie));

        // On crée un nouveau tableau pour initialiser les résultats du filtrage 
        this.filteredMovies = [...this.movies];

        // On installe tous les gestionnaires d'événements sur la page
        const selectGenre = document.querySelector('[name="genre"]');
        selectGenre.addEventListener('change', this.onChangeGenre.bind(this));

        const orderByTitleBtn = document.getElementById('order-by-title-button');
        orderByTitleBtn.addEventListener('click', this.onClickOrderByTitle.bind(this));

        const orderByDateBtn = document.getElementById('order-by-date-button');
        orderByDateBtn.addEventListener('click', this.onClickOrderByDate.bind(this));

        const allMoviesBtn = document.getElementById('all-movies-button');
        allMoviesBtn.addEventListener('click', this.onClickAllMovies.bind(this));

        // On affiche tous les films pour commencer
        this.displayMovies(this.filteredMovies);
    }


    /**
     * Affiche les objets Movie contenus dans un tableau
     * @param {Array<Movie>} movies 
     */
    displayMovies(movies){

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
    sortByTitle() {
        this.filteredMovies.sort( function (movie1, movie2) {

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
    sortByReleaseDate() {
        this.filteredMovies.sort( function (movie1, movie2) {
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
    filterByGenre(genre) {
        return this.movies.filter(movie => {
            return movie.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())
        });
    }

    /********************************
     * Gestionnaires d'événements
     ********************************/
    onChangeGenre(event) {

        const genre = event.currentTarget.value; 
        this.filteredMovies = this.filterByGenre(genre);
        this.displayMovies(this.filteredMovies);
    }

    onClickOrderByTitle() {

        // Tri des films par ordre alphabétique du titre
        this.sortByTitle(); 

        console.log(this.filteredMovies)

        // On affiche les films une fois triés par titre
        this.displayMovies(this.filteredMovies);
    }

    onClickOrderByDate() {

        // Tri des films par ordre alphabétique du date
        this.sortByReleaseDate();

        // On affiche les films une fois triés par date
        this.displayMovies(this.filteredMovies);
    }

    onClickAllMovies() {
        this.filteredMovies = [...this.movies];
        this.displayMovies(this.filteredMovies);
        document.querySelector('[name="genre"]').value="-1";

    }
}