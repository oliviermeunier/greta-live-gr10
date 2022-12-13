export default class Movie {
    constructor({
        title, 
        duration, 
        releaseDate, 
        casting, 
        genres, 
        director, 
        nationality, 
        poster, 
        imdbLink
    }) {
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