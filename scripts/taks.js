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
        Authorization: localStorage.getItem("token"),
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
        actualizarTarea();
        imprimirTareas(tasks);
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
            Authorization: localStorage.getItem("token"),
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
            Authorization: localStorage.getItem("token"),
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
    console.log(tasks);    
    let array = []
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
        array.push(task)
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
   eliminarTerminadas(array);
  }
  function eliminarTerminadas(array) {
    array.sort((a, b)=>{
      if (a.createdAt < b.createdAt) {
        return -1;    
      } else if (a.createdAt > b.createdAt) {
        return 1
      }else{
        return 0
      }
    })
    let array1 = array.reverse().slice(10,30);
    console.log(array1);
    array1.forEach((objeto)=>{
      console.log(objeto);
        
        console.log(objeto.id);
        settings = {
          method: "DELETE",
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        };

        fetch(
          `https://ctd-fe2-todo.herokuapp.com/v1/tasks/${objeto.id}`,
          settings
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (task) {
            console.log(task);
            obtenerTareas();
          });
      
    })
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
        Authorization: localStorage.getItem("token"),
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
