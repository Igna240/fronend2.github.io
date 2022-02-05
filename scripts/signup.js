window.addEventListener("load", function () {
  const form = document.querySelector("form.registrar");

  let errores = [];

  let campoNombre = document.querySelector("input#inputNombre");
  let campoApellido = document.querySelector("input#inputApellido");
  let campoEmail = document.querySelector("input#inputEmail");
  let campoPassword = document.querySelector("input#inputPassword");
  let campoRepPassword = document.querySelector("input#inputRepPassword");

  let errorNombre = document.querySelector("small#errorNombre");
  let errorApellido = document.querySelector("small#errorApellido");
  let errorEmail = document.querySelector("small#errorEmail");
  let errorPassword = document.querySelector("small#errorPassword");
  let errorRepPassword = document.querySelector("small#errorRepPassword");

  let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  let passRegex =
    /(?=^.{8,15}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])$/;

  function validarNombre() {
    if (campoNombre.value == "") {
      errores.push({
        input: "nombre",
        error: "El campo `Nombre` debe estar completo",
      });
    }
  }

  function validarApellido() {
    if (campoApellido.value == "") {
      errores.push({
        input: "apellido",
        error: "El campo `Apellido` debe estar completo",
      });
    }
  }

  function validarEmail() {
    if (campoEmail.value == "") {
      errores.push({
        input: "email",
        error: "El campo 'Email' debe estar completo",
      });
    } else if (emailRegex.test(campoEmail.value) == false) {
      errores.push({
        input: "email",
        error: "En el campo 'Email' se debe colocar un correo electronico",
      });
    }
  }

  function validarPassword() {
    if (campoPassword.value == "") {
      errores.push({
        input: "pass",
        error: "El campo 'Contraseña' debe estar completo",
      });
    } /* else if (passRegex.test(campoPassword) == false) {
      errores.push({
        input: "pass",
        error: `El campo "Contraseña" debe tener: Al menos una letra minuscula y una mayuscula, un número o caracter especial,  mínimo 8 caracteres, máximo 15 caracteres`,
      });
    } */
  }
  function validarRepPassword() {
    if (campoRepPassword.value == "") {
      errores.push({
        input: "repPass",
        error: "El campo `Repetir Contraseña` debe estar completo",
      });
    } else if (campoRepPassword.value != campoPassword.value) {
      errores.push({
        input: "repPass",
        error: "Las contraseñas deben coincidir",
      });
    }
  }
  
  function agregarErrores() {
    errores.forEach(function (error) {
      switch (error.input) {
        case "nombre":
          errorNombre.innerText = error.error;
          break;

        case "apellido":
          errorApellido.innerText = error.error;
          break;

        case "email":
          errorEmail.innerText = error.error;
          break;

        case "pass":
          errorPassword.innerText = error.error;
          break;

        case "repPass":
          errorRepPassword.innerText = error.error;
          break;
      }
    });
  }

  function agregarUsuario() {
    let datos = {
      firstName: campoNombre.value,
      lastName: campoApellido.value,
      email: campoEmail.value,
      password: campoPassword.value,
    };

    let settings = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datos),
    };

    fetch("https://ctd-fe2-todo.herokuapp.com/v1/users", settings)
      .then(function (response) {
        if (response.status == 200){
          return response.json();
        } else if (response.status == 400){
          errorEmail.innerText = "El usuario ya esta registrado"
        } else if (response.status == 500){
          errorEmail.innerText = "Error del servidor"
        }
      })
      .then(function (token) {
        sessionStorage.setItem("token", token.jwt);
        /* window.location.href = "/proyectoIntegrador/mis-tareas.html"; */
        window.location.href = "http://127.0.0.1:5500/mis-tareas.html";
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    validarNombre();

    validarApellido();

    validarEmail();

    validarPassword();

    validarRepPassword();

    if (errores.length !== 0) {
      agregarErrores();
    } else {
      agregarUsuario();
    }
  });
});
