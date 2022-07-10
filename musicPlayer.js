class Music{
    constructor(title, singer, mp3, image) {
        this.title = title
        this.singer = singer
        this.mp3 = mp3
        this.image = image
        this.starred = false
    }
    getName(){
        return this.title + ' - ' + this.singer
    }
}

class MusicPlayer{
    constructor(musicList) {
        this.musicList = musicList
        this.index = Math.floor(Math.random()*musicList.length)
    }

    getMusic(){
        return this.musicList[this.index]
    }

    next(){
        if(this.index < musicList.length - 1){
            this.index++
        }
        else{
            this.index = 0
        }
    }

    previous(){
        if(this.index != 0){
            this.index--
        }
        else{
            this.index = musicList.length - 1
        }
    }
}

let musicList = [
    new Music("He's a pirate", "Hans Zimmer", "apirate.mp3", "apirate.jpg"),
    new Music("Hymn For The Weekend", "Coldplay", "Hymn For The Weekend.mp3", "Hymn For The Weekend.jpg"),
    new Music("Safe and Sound", "Capital Cities", "Safe and Sound.mp3", "Safe and Sound.jpg"),
    new Music("Pink Panther", "Henry Mancini", "pink panther.mp3", "pink panther.jpg"),
    new Music("Battle of the Heroes", "John Williams", "battle of the heroes.mp3", "battle of the heroes.jpg"),
    new Music("Kaer Morhen", "Marcin Przybyłowicz", "kaer morhen.mp3", "kaer morhen.jpg"),
    new Music("Crash Course Moon", "Sean Kiner", "crash course moon.mp3", "crash course moon.jpg"),
    new Music("Break for the Shuttle", "Dean Kiner & Nolan Markey", "Break for the Shuttle.mp3", "Break for the Shuttle.jpg"),
    new Music("The Mandalorian", "Ludwig Goransson", "mandalorian.mp3", "mandalorian.jpg"),
]