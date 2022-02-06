window.addEventListener("load", function () {
  const form = document.querySelector("form.ingresar");

  let errores = [];
  let errorEmail = document.querySelector("small#errorEmail");
  let errorPassword = document.querySelector("small#errorPassword");

  let campoEmail = document.querySelector("input#inputEmail");
  let campoPassword = document.querySelector("input#inputPassword");


  function validarEmail() {
    if (campoEmail.value == "") {
      errores.push({
        input: "email",
        error: "El campo 'Email' debe estar completo",
      });
    }
  }

  function validarPassword() {
    if (campoPassword.value == "") {
      errores.push({
        input: "pass",
        error: "El campo 'Contraseña' debe estar completo",
      });
    }
  }

  function agregarErrores() {
    errores.forEach(function (error) {
      switch (error.input) {
        case "email":
          errorEmail.innerText = error.error;
          break;
        case "pass":
          errorPassword.innerText = error.error;
          break;
      }
    });
  }
  function agregarUsuario() {
    {
      let datos = {
        email: campoEmail.value,
        password: campoPassword.value
      };
    
      let settings = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(datos),
      };
    
      fetch("https://ctd-fe2-todo.herokuapp.com/v1/users/login", settings)
        .then(function (response) {
          console.log(response);
          if(response.status == 201){
            
            return response.json();
          } else if(response.status == 404){
            errorEmail.innerText ="El usuario no existse"
          } else if(response.status == 400){
            errorEmail.innerText = ""
            errorPassword.innerText = "Contraseña invalida"
          } else if(response.status == 500){
            errorEmail.innerText = "Error del servidor"
          }
        })
        .then(function (token) {
          localStorage.setItem("token", token.jwt);
          window.location.href = "http://127.0.0.1:5500/mis-tareas.html";
          /* window.location.href = "/proyectoIntegrador/mis-tareas.html"; */
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  }

  form.addEventListener("submit", function (e) {

    e.preventDefault();
    validarEmail();
    validarPassword();

    if (errores.length > 0) {
      agregarErrores();
    } else {
      agregarUsuario();
    }
  });
});
