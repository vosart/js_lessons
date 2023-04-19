const gameElements = document.getElementById("mygame").children
const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]

const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}

const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const getTask = () => {
    const randomNum1 = getRandomNumInRange(0, 100)
    const randomNum2 = getRandomNumInRange(0, 100)
    const symbol = (Math.random() > 0.5) ? "+" : "-"
    const task = `${randomNum1} ${symbol} ${randomNum2}`
    gameState.rightAnswer = eval(task) 
    return task
}

const changeBtnText = (text) => {
    btnGame.innerText = text
}

const startGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = "Game starts!"
        userAnswer.value = null
        userTask.innerText = getTask()
        userAnswer.hidden = false
        changeBtnText("Check")
        gameState.taskInProcess = true
    } else {
        const isRight = gameState.rightAnswer == userAnswer.value
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        title.innerText = (isRight) ? "You win!" : "You lose!"
        changeBtnText("Start")
        gameState.taskInProcess = false
    }
}
btnGame.addEventListener('click', startGameFunc)
userAnswer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        startGameFunc()
    } else if (e.key === 'Escape') {
        userAnswer.blur()
    }
})

const choose1 = document.querySelectorAll(".choosed_block-container > div")
const counter = document.querySelector(".choosed_block span")

const choosedState = {
    countElems: 0,
    setCountValue(value) {
        this.countElems += value
        counter.innerText = this.countElems
    }
}

const eventFunc = (e) => {
    if (e.target.className === "") {
        e.target.className = "choosed_element"
        choosedState.setCountValue(1)
    } else {
        e.target.className = ""
        choosedState.setCountValue(-1)
    }
}

for (let i = 0; i < choose1.length; i++) {
    choose1[i].addEventListener("click", eventFunc)
}


//////////////////////
const postBlock = document.querySelector('.posts_block-container')
const showPostsBTN = document.querySelector('.posts_block button') 

function addPost(title, body) {
    const postTitle = document.createElement('h3')
    const postBody = document.createElement('span')
    const postItem = document.createElement('p')
    
    postItem.append(postTitle, postBody)
    postBlock.append(postItem)
    
    postTitle.innerText = title
    postBody.innerText = body
}

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        for (item of data) {
            addPost(item.title, item.body)
        } 
    })
    .catch(err => console.log(err.message))
}


// showPostsBTN.onclick = () => {getPosts()}
getPosts()



// function createPost(title, body, userId) {
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: 'POST',
//         body: JSON.stringify({
//             // title: title,
//             // body: body,
//             // userId: userId,
//             title,
//             body,
//             userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//         .then(res => {
//             console.log(res)
//         })
//         .catch(err => console.log(err.message))
// }
// createPost('title', 'body', 17)