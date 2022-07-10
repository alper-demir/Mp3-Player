const image = document.querySelector('#image')
const title = document.querySelector('#title')
const singer = document.querySelector('#singer')
const repeat = document.querySelector('#repeat-icon')
const currentTime = document.querySelector('#currentTime')
const duration = document.querySelector('#duration')
const durationBar = document.querySelector('#duration-bar')
const prevMusic = document.querySelector('#prev')
const play = document.querySelector('#play')
const nextMusic = document.querySelector('#next')
const volumeIcon = document.querySelector('#volume-icon')
const volumeBar = document.querySelector('#volume-bar')
const volumeRatio = document.querySelector('#volume-ratio')
const container = document.querySelector('#container')
const audio = document.querySelector('#audio')
const song_list_ul = document.querySelector('#song-list-ul')
const song_list_icon = document.querySelector('#song-list-icon')
const favBar = document.querySelector('#collapse-bar')
const player = new MusicPlayer(musicList)
let x = player.getMusic()

window.addEventListener('load', () =>{ // during the first page load
    container.setAttribute('index', player.index)
    image.src = 'image/' + x.image
    audio.src = 'mp3/' + x.mp3
    displayMusicList(player.musicList)
})

prevMusic.addEventListener('click', () => {
    player.previous()
    x = player.getMusic()
    audio.src = 'mp3/' + x.mp3
    container.setAttribute('index', player.index)
    if(!container.classList.contains('playing')){
        audio.pause()
    }
})

nextMusic.addEventListener('click', () => {
    player.next()
    x = player.getMusic()
    audio.src = 'mp3/' + x.mp3
    container.setAttribute('index', player.index)
    if(!container.classList.contains('playing')){
        audio.pause()
    }
})

play.addEventListener('click', ()=> {
    if(container.classList.contains('playing')){
        container.classList.remove('playing')
        play.classList.remove('fa-play')
        play.classList.add('fa-pause')
        audio.pause()
    }
    else{
        container.classList.add('playing')
        play.classList.add('fa-play')
        play.classList.remove('fa-pause')
        audio.play()
    }
})

calculateDuration = (time) =>{
    let min = Math.trunc(time / 60)
    let sec = Math.floor(time % 60)
    sec < 10 ? sec = '0' + sec : sec
    return min + ':' + sec
}

audio.addEventListener('loadedmetadata', () => { // triggered on every media load

    x = player.getMusic()
    image.src = 'image/' + x.image
    title.innerText = x.getName()
    singer.innerText = x.singer
    duration.innerText = calculateDuration(audio.duration)
    durationBar.max = Math.floor(audio.duration)

    if(x.starred == true){
        star.style.color = '#077e81'
    }
    else {
        star.style.color = '#a89898'
    }
    songListFollawage()
    listFollowage()

    if(!container.classList.contains('playing')){
        play.classList.remove('fa-play')
        play.classList.add('fa-pause')
        audio.pause()
    }

    console.log('Index: ' + player.index)
    console.log('Music: ' + x.getName())
})

durationBar.addEventListener('click', () =>{
    audio.currentTime = durationBar.value
    console.log(durationBar.value)
})

repeat.addEventListener('click', () => {
    if(container.classList.contains('repeat')){
        container.classList.remove('repeat')
        repeat.style.fontSize = '18px'
        repeat.style.color = 'darkseagreen'
    }
    else{
        container.classList.add('repeat')
        repeat.style.fontSize = '20px'
        repeat.style.color = '#0d7c60'
    }
})

audio.addEventListener('timeupdate', () =>{ // triggered on each time change
    currentTime.innerText = calculateDuration(audio.currentTime)
    durationBar.value = audio.currentTime
    repeatCheck()
})

repeatCheck = () => {
    if(duration.innerText === currentTime.innerText){
        if(container.classList.contains('repeat')){
            currentTime.innerText = '0:00'
            audio.currentTime = 0
        }
        else{
            player.next()
            x = player.getMusic()
            audio.src = 'mp3/' + x.mp3
            container.setAttribute('index', player.index)
        }
    }
}

calculateVolume = (volume) =>{
    return volume / 100
}

volumeBar.addEventListener('click', () =>{
    audio.setAttribute('volume', volumeBar.value)
    audio.volume = calculateVolume(volumeBar.value)
    volumeRatio.innerText = '%' +  audio.getAttribute('volume')
    if(volumeBar.value == 0){
        volumeIcon.classList.remove('fa-volume-up')
        volumeIcon.classList.add('fa-volume-mute')
    }
    else{
        volumeIcon.classList.add('fa-volume-up')
        volumeIcon.classList.remove('fa-volume-mute')
    }
    console.log('Volume: ' + audio.getAttribute('volume'))
})

volumeIcon.addEventListener('click', ()=> {
    if(volumeIcon.classList.contains('fa-volume-up')){
        volumeIcon.classList.remove('fa-volume-up')
        volumeIcon.classList.add('fa-volume-mute')
        audio.volume = 0
        volumeBar.value = 0
        volumeRatio.innerText = '%0'
    }
    else{
        volumeIcon.classList.add('fa-volume-up')
        volumeIcon.classList.remove('fa-volume-mute')
        audio.volume = calculateVolume(audio.getAttribute('volume'))
        volumeBar.value = audio.getAttribute('volume')
        volumeRatio.innerText = '%' +  audio.getAttribute('volume')

        if(audio.getAttribute('volume') == 0){
            audio.volume = 1
            volumeRatio.innerText = '%100'
            volumeBar.value = 100
        }
    }
})

displayMusicList = (list) =>{
    for(let i=0; i<list.length;i++){
        let li = `
        <li index="${i}" onclick="selected(this)" class="d-flex justify-content-between p-2 list">
            <span>${list[i].getName()}</span>
            <span id="music-${i}"></span>
            <audio class="music-${i}" src="mp3/${list[i].mp3}"></audio>
        </li>
        `;
        song_list_ul.insertAdjacentHTML("beforeend", li)

        let liDuration = song_list_ul.querySelector(`#music-${i}`)
        let liTag = song_list_ul.querySelector(`.music-${i}`)

        liTag.addEventListener('loadeddata',()=>{
            liDuration.innerText = calculateDuration(liTag.duration)
        })
    }
}

selected = (li) =>{
    player.index = li.getAttribute('index')
    audio.src = "mp3/" + musicList[player.index].mp3
}

song_list_icon.addEventListener('click',()=>{
    if(song_list_ul.children.length >=14){
        song_list_ul.style.overflowY = 'auto'
    }
})

favBar.addEventListener('click',()=>{
    if(ul.children.length >=14){
        ul.style.overflowY = 'auto'
    }
})

listFollowage = () =>{

    for(let i =0;i< ul.children.length; i++){
        if(ul.children[i].getAttribute('index') == player.index){
            ul.children[i].style.background = '#dedcdc'
        }
        else{
            ul.children[i].style.background = ''
        }
    }
}

songListFollawage = () =>{
    for(let i =0;i< song_list_ul.children.length; i++){
        if(song_list_ul.children[i].getAttribute('index') == player.index){
            song_list_ul.children[i].style.background = '#dedcdc'
        }
        else{
            song_list_ul.children[i].style.background = ''
        }
    }
}
