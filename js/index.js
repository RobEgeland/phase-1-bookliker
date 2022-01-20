let list = document.querySelector('#list')
let description = document.createElement('div')
let userList = document.createElement('ul')
let button = document.createElement('button')
let myObj = {
    id: 11,
    username: 'RobE'
}
let myUserName = document.createElement('li')
myUserName.innerText = 'RobE'

document.addEventListener("DOMContentLoaded", getTitles);

function getTitles() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => data.forEach(data => renderTitles(data)))
}

function renderTitles(data) {
    let title = document.createElement('li')
    title.innerText = data.title
    title.id = data.id
    list.appendChild(title)
}

list.addEventListener('click', getInfo);

function getInfo(e) {
    fetch(`http://localhost:3000/books/${e.target.id}`)
    .then(res => res.json())
    .then(data => renderInfo(data))
}

function renderInfo(data) {
    userList.innerHTML = ' '
    let userArray = data.users
    userArray.forEach((element) => {
        let users = document.createElement('li')
        users.innerText = element.username
        userList.appendChild(users)
    })
    description.innerHTML = `
        <img src= ${data.img_url}/>
        <h2>${data.title}</h2>
        <h2>${data.subtitle}</h2>
        <h2>${data.author}</h2>
        <p>${data.description}</p>
    `
    button.innerText = 'Like'
    button.id = data.id
    document.querySelector('#show-panel').innerHTML = ''
    document.querySelector('#show-panel').appendChild(description)
    document.querySelector('#show-panel').appendChild(userList)
    document.querySelector('#show-panel').appendChild(button)

}

document.querySelector('#show-panel').addEventListener('click', getUser)

let newArray = undefined;

function getUser(e) {
    fetch(`http://localhost:3000/books/${e.target.id}`)
    .then(res => res.json())
    .then(data => {
        patchBook(data)
        postbook(e)
    })
        
}

 function patchBook(data) {
    newArray = data.users
    newArray.push(myObj)
    console.log(newArray)
    
}   

function postbook(e) {
    console.log(newArray)
    fetch(`http://localhost:3000/books/${e.target.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
       },
        body: JSON.stringify({'users': newArray})
   })
   .then(res => res.json())
   .then(data => renderInfo(data))
}
    
 
    

   