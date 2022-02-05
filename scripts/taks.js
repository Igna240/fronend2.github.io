window.addEventListener("load", function () {
  obtenerTareas();
  //VALIDO QUE ESTE LOGEADO
  /* const token = sessionStorage.getItem("token")
if(!token){
  window.location.href = "./index.html";
} */

  const form = document.querySelector(".nueva-tarea");

  let nuevasTareas = document.querySelector("#skeleton");
  let terminadasTareas = document.querySelector(".tareas-terminadas");

  let inputTarea = document.querySelector("#nuevaTarea");

  function obtenerTareas() {
    let settings = {
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
    };
    fetch("https://ctd-fe2-todo.herokuapp.com/v1/tasks", settings)
      .then(function (response) {
        return response.json();
      })
      .then(function (tasks) {
        console.log(tasks);
        nuevasTareas.innerHTML = "";
        terminadasTareas.innerHTML = "";
        imprimirTareas(tasks);
        actualizarTarea();
        eliminar();
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  function actualizarTarea() {
    let finish = document.querySelectorAll(".not-done");
    finish.forEach(function (element) {
      element.addEventListener("click", function () {
        console.log(element.parentElement.parentElement);
        let elemento = element.parentElement;
        console.log(elemento.dataset.tareaId);
        let datos = {
          completed: true,
        };
        let dato = {
          completed: true,
        };
        let settings = {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify(dato),
        };

        fetch(
          `https://ctd-fe2-todo.herokuapp.com/v1/tasks/${elemento.dataset.tareaId}`,
          settings
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (task) {
            console.log(task);
            obtenerTareas();
          });
      });
    });
  }

  function eliminar() {
    let delet = document.querySelectorAll(".fas");
    delet.forEach(function (element) {
      element.addEventListener("click", function () {
        console.log(element.parentElement.parentElement);
        let elemento = element.parentElement.parentElement;
        console.log(elemento.dataset.tareaId);
        settings = {
          method: "DELETE",
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        };

        fetch(
          `https://ctd-fe2-todo.herokuapp.com/v1/tasks/${elemento.dataset.tareaId}`,
          settings
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (task) {
            console.log(task);
            obtenerTareas();
          });
      });
    });
  }

  function imprimirTareas(tasks) {
    tasks.reverse().forEach((task) => {
      if (task.completed == false) {
        nuevasTareas.innerHTML += `<li class="tarea" data-tarea-id="${task.id}">
        <div class="not-done"></div>
        <div class="descripcion">
        <p class="nombre">${task.description}</p>
        <p class="timestamp">Creada ${task.createdAt}</p>
        </div>
        <div class="actions">
        <i class="fas fa-trash-alt"></i>
        </div>
        </li>`;
      } else if (task.completed == true) {
        tareasCompletas = [task]
        console.log(tareasCompletas);
        terminadasTareas.innerHTML += `<li class="tarea" data-tarea-id="${task.id}">
        <div class="not-done-2"></div>
        <div class="descripcion">
        <p class="nombre">${task.description}</p>
        <p class="timestamp">Creada ${task.createdAt}</p>
        </div>
        <div class="actions">
        
        </div>
        </li>`;
      }
    });
  }
  function cargarTarea() {
    let datos = {
      description: inputTarea.value,
      completed: false,
    };
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
        return response.json();
      })
      .then()
      .catch(function (e) {
        console.log(e);
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    nuevasTareas.innerHTML = "";

    /*  agregarTarea(); */
    cargarTarea();
    obtenerTareas();
  });
});
