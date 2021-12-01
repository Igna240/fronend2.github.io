window.addEventListener("load", function () {
    
    const form = document.querySelector("form.ingresar");
    
    form.addEventListener("submit", function (e) {
        

        let errores = []
        
        let campoEmail = document.querySelector("input#inputEmail");
        
        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        
        if (campoEmail.value == ""){
            errores.push("El campo 'Email' debe estar completo")
        } else if(emailRegex.test(campoEmail.value) == false){
            errores.push("En el campo 'Email' se debe colocar un correo electronico");
        }
        
        
        let campoPassword = document.querySelector("input#inputPassword");
        if (campoPassword.value == ""){
            errores.push("El campo 'Contraseña' debe estar completo")
        }
        
        if(errores.length >0){
            
            e.preventDefault();
            
            let ulErrores = document.querySelector("div.error ul")
            
            for (let i = 0; i < errores.length; i++) {
                
                ulErrores.innerHTML += `<li>${errores[i]}</li>`
                
            }
        }
    })
    
})






