window.addEventListener("load", function () {
//obtenerTareas();
//VALIDO QUE ESTE LOGEADO
//const token = sessionStorage.getItem("token")
//if(!token){
//  window.location.href = "./index.html";
//}

const form = document.querySelector(".nueva-tarea");

let nuevasTareas = document.querySelector("#skeleton");

let inputTarea = document.querySelector("#nuevaTarea");

let tareas = []

function agregarTarea() {
  tareas.push(inputTarea.value)
}

function obtenerTareas() {
  let settings = {
    headers: {
      "Content-type": "application/json",
      "Authorization": sessionStorage.getItem("token"),
    }
  };
  fetch("https://ctd-fe2-todo.herokuapp.com/v1/tasks", settings)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (tasks) {
    console.log(tasks);
    tasks.forEach((task) =>{
      nuevasTareas.innerHTML += `<li class="tarea">
      <div class="not-done"></div>
      <div class="descripcion">
      <p class="nombre">${task.description}</p>
      <p class="timestamp">Creada el  xxxxxx  horas</p>
      </div>
      </li>`
    })
    
    
  })
  .catch(function (e) {
    console.log(e);
  });
}

function cargarTarea() {
  
  let datos = {
    description: inputTarea.value,
    completed: false
  }
  let settings = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify(datos),
  };

  fetch("https://ctd-fe2-todo.herokuapp.com/v1/tasks", settings)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (token) {
    console.log(token);
    sessionStorage.setItem("token", token.jwt);
    let date = new Date();
    tareas.forEach((tarea) =>{
      nuevasTareas.innerHTML += `<li class="tarea">
      <div class="not-done"></div>
      <div class="descripcion">
      <p class="nombre">${tarea}</p>
      <p class="timestamp">Creada el ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()} horas</p>
      </div>
      </li>`
    })
    
    
  })
  .catch(function (e) {
    console.log(e);
  });


}


form.addEventListener("submit", function (e) {
  e.preventDefault();
  nuevasTareas.innerHTML = "";

  agregarTarea();
  cargarTarea();

})

function terminarTarea() {
  
}

})

