const addBtn = document.querySelector(".add")
const notes = JSON.parse(localStorage.getItem("notes"))
const light = document.querySelector(".light")
const container = document.querySelector(".notes-container")
const navbar = document.querySelector(".navbar")

const addNote = (text = "") => {
  const note = document.createElement("div")
  note.classList.add("note")
  let noteClass = ""
  if(container.classList.value.includes("container-light")){
    noteClass = "content content-light"
  } else {
    noteClass = "content content-dark"
  }

  note.innerHTML = `
    <div class="bar">
      <button class="copy" readonly><i class="fas fa-clipboard"></i></button>    
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <textarea class="${noteClass}" name="text"></textarea>
  `
  container.appendChild(note)

  const deleteBtn = note.querySelector(".delete")
  const copyBtn = note.querySelector(".copy")
  const textArea = note.querySelector("textarea")

  textArea.value = text;

  deleteBtn.addEventListener("click", () => {
    note.remove()
    updateLocalStorage()
  })

  copyBtn.addEventListener("click", (event) => {
    event.preventDefault
    copyToClipboard(textArea)
  })

  textArea.addEventListener("input", () => {
    updateLocalStorage()
  })
};

const updateLocalStorage = () => {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach(note => {
    if(note.value != ""){
      notes.push(note.value)
    };
  })

  localStorage.setItem("notes", JSON.stringify(notes))
};

const switchMode = () => {
  container.classList.toggle("container-dark")
  container.classList.toggle("container-light")
  navbar.classList.toggle("nav-dark")
  navbar.classList.toggle("nav-light")
  light.classList.toggle("sun")
  light.classList.toggle("moon")
  const textAreas = document.querySelectorAll("textarea")
  if(container.classList.value.includes("container-light")){
    light.innerHTML = `<i class="far fa-moon"></i>`
    textAreas.forEach(area => {
      area.classList.remove("content-dark")
      area.classList.add("content-light")
    })
  } else {
    light.innerHTML = `<i class="fas fa-sun">`
    textAreas.forEach(area => {
      area.classList.remove("content-light")
      area.classList.add("content-dark")
    })
  }
}

const copyToClipboard = (textArea) => {
  textArea.select();
  textArea.setSelectionRange(0, 99999)
  document.execCommand("copy");
  window.getSelection().removeAllRanges()
}

if(notes) {
  notes.forEach(note => addNote(note))
};

addBtn.addEventListener("click", () => {
  addNote()
});

light.addEventListener("click", () => {
  switchMode()
})