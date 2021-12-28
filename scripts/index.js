window.addEventListener("load", function () {
  const form = document.querySelector("form.ingresar");

  let errores = [];
  let errorEmail = document.querySelector("small#errorEmail");
  let errorPassword = document.querySelector("small#errorPassword");

  let campoEmail = document.querySelector("input#inputEmail");
  let campoPassword = document.querySelector("input#inputPassword");

  let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  let passRegex =
    /(?=^.{8,15}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])$/;

  function validarEmail() {
    if (campoEmail.value == "") {
      errores.push({
        input: "email",
        error: "El campo 'Email' debe estar completo",
      });
    } /* else if (emailRegex.test(campoEmail.value) == false) {
      errores.push({
        input: "email",
        error: "En el campo 'Email' se debe colocar un correo electronico",
      });
    } */
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
          if(response.status == 200 || response.status == 201){
            
            return response.json();
          } else if(response.status == 404){
            errorEmail.innerText ="El usuario no existse"
          } else if(response.status == 400){
            errorEmail.innerText = ""
            errorPassword.innerText = "Contraseña invalida"
          }
        })
        .then(function (token) {
          sessionStorage.setItem("token", token.jwt);
          window.location.href = "http://127.0.0.1:5500/mis-tareas.html";
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
