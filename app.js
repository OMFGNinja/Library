const mainButton = document.querySelector('.mainButton')
const formMain = document.querySelector('.form')
const overlay = document.querySelector('.overlayScreen')
const submit = document.querySelector('.submit')
const main = document.querySelector('.main')
const errorMsg = document.querySelector('.errorMsg')

let library = []

submit.addEventListener('click',removeVerify)
formMain.addEventListener('submit',createBook)
mainButton.addEventListener('click', activate)
overlay.addEventListener('click', remove)


function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function activate(){
    const inputs = document.querySelectorAll('.input')
    const checkbox = document.querySelector('.checkbox')
    inputs.forEach((input) => input.value = '')
    checkbox.checked = false
    formMain.classList.add('active')
    overlay.classList.add('overlayActive')
}

function remove(){
    formMain.classList.remove('active')
    overlay.classList.remove('overlayActive')
}

function removeVerify(){
    errorMsg.style.display = 'none'
    const bookTitle = document.querySelector('.title').value
    if (library.some((book) => book.title === bookTitle)){
        errorMsg.style.display = 'block'
        return
    }
    if (document.querySelector('.title').value === '' || document.querySelector('.author').value === '' || document.querySelector('.pages').value === '') return
    else remove()
}

function createBook(e){
    e.preventDefault()
    const bookTitle = document.querySelector('.title').value
    const bookAuthor = document.querySelector('.author').value
    const bookPages = document.querySelector('.pages').value
    const bookRead = document.querySelector('.checkbox').checked
    if (library.some((book) => book.title === bookTitle)){
        errorMsg.style.display = 'block'
        return
    }
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead)
    addBookToLibrary(newBook)
}

function addBookToLibrary(book){
    library.push(book)
    updateMain()
}

function updateMain(){
    resetMain()
    for (let obj in library){
        createCard(library[obj])
    }
}

function resetMain(){
    main.innerHTML = ''
}

function createCard(newBook){
    errorMsg.style.display = 'none'

    const card = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const readButton = document.createElement('button')
    const removeButton = document.createElement('button')

    card.classList.add('card')
    readButton.onclick = changeRead
    removeButton.onclick = removeBook
    buttonGroup.classList.add('buttonGroup')
    readButton.classList.add('btn')
    removeButton.classList.add('btn')

    title.textContent = `"${newBook.title}"`
    author.textContent = `Author: ${newBook.author}`
    pages.textContent = `Pages: ${newBook.pages}`
    removeButton.textContent = 'Remove'

    if (newBook.read){
        readButton.textContent = 'Read'
        readButton.classList.add('btnRead')
    } else{
        readButton.textContent = 'Not read'
        readButton.classList.add('btnNotRead')
    }

    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    buttonGroup.appendChild(readButton)
    buttonGroup.appendChild(removeButton)
    card.appendChild(buttonGroup)
    main.appendChild(card)
}

function removeBook(e){
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '')
    library = library.filter(book => book.title !== title)
    updateMain()
}

function changeRead(e){
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '')
    const newLibrary = library.find(book => book.title === title)
    newLibrary.read = !newLibrary.read
    updateMain()
}