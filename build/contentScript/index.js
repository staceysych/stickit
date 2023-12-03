/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((data) => {
    const { type, content } = data

    if (type === "NEW_NOTE") {
        createNote({content})
    }
})

function createNote({content}) {
    const body = document.body

    const note = document.createElement('div')

    note.classList.add('note_container')
    
    const noteHeader = document.createElement('div')
    noteHeader.classList.add('note_header')
    
    const noteBody = document.createElement('div')
    noteBody.classList.add('note_body')
    noteBody.setAttribute("contenteditable", "true");
    noteBody.innerHTML = content

    note.append(noteHeader, noteBody)

   

    body.appendChild(note)
}