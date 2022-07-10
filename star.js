const star = document.querySelector('#star')
const ul = document.querySelector('#ul')
let stars = []

star.addEventListener('click', () => {
    x = player.getMusic()
    if(!stars.includes(player.index)){

        if(x.starred == false){
            stars.push(player.index)
            star.style.color = '#077e81'
            createFavourite()
            x.starred = true
            listFollowage()
            if(ul.children.length >=14){
                ul.style.overflowY = 'auto'
            }

        }
        else{ // it triggers after click on favourite list + star icon
            x.starred = false
            star.style.color = '#a89898'
            for(let i =0;i< ul.children.length; i++){
                if(ul.children[i].getAttribute('index') == player.index){
                    ul.removeChild(ul.children[i])
                    stars.splice(i,1)
                }
            }
        }
    }

    else{
        if(x.starred == true){
            let a = stars.indexOf(player.index)
            stars.splice(a, 1)
            ul.removeChild(ul.children[a])
            x.starred = false
            star.style.color = '#a89898'
        }
    }
})

createFavourite = () => {
    const li = document.createElement('li')
    li.classList = 'd-flex justify-content-between p-2 list'
    li.setAttribute('index',`${player.index}`)
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    span.innerText = `${player.getMusic().getName()}`
    span2.innerText = `${calculateDuration(audio.duration)}`

    li.appendChild(span)
    li.appendChild(span2)
    ul.appendChild(li)

    li.addEventListener('click', (e) => {
        player.index = li.getAttribute('index')
        let x = player.getMusic()
        audio.src = 'mp3/' + x.mp3
    })
}
