// const collapseElementList = document.querySelectorAll('.collapse')
// const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl))

let words = ['Frontend', 'Backend'],
    wordWrapper = document.getElementById('word'),
    wordWrapperContent = wordWrapper.innerHTML,
    addingWord = false,
    counter = 1;
setInterval(function(){
  if(wordWrapperContent.length > 0 && !addingWord ) {
    wordWrapper.innerHTML = wordWrapperContent.slice(0, -1);
    wordWrapperContent = wordWrapper.innerHTML;
  } else {
    addingWord = true;
  } // if else
  if( addingWord ){
    if( wordWrapperContent.length < words[counter].length  ) {
      wordWrapper.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1);
      wordWrapperContent = wordWrapper.innerHTML;
    } else {
      if( counter < words.length) {
        counter ++
      }
      addingWord = false;
    } // if else
  } // if addingWord
  if( counter == words.length) {
    counter = 0;
  } // if
}, 150);

const element = document.querySelector(".fotito");
const keyframes = [
    { transform: "translate(0, 0)", offset: 0 },
    { transform: "translate(200px, 0)", offset: 0.40 },
    { transform: "translate(200px, 200px)", offset: 0.60 },
    { transform: "translate(0, 200px)", offset: 0.80 }
];
const options = {
    duration: 4000,
    direction: "alternate",
    fill: "forwards",
    // iterations: Infity
};
const animation = element.animate(keyframes, options);

// formulario
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(?!.*(\d)\1{4})\d{10}$/,
}
const campos = {
	nombre: false,
	correo: false,
	teléfono: false,
	mensaje: false,
}
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, "telefono")
	}
}
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
const btn = document.getElementById('button');

document.getElementById('formulario')
 .addEventListener('submit', function(event) {
   event.preventDefault();
   btn.value = 'Enviando...';
   console.log(this);
   const serviceID = 'service_983v66l';
   const templateID = 'template_tmy2qf5';
   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'ENVIAR';
      appendAlert('Mensaje enviado correctamente', "success");
    }, (err) => {
      btn.value = 'ENVIAR';
      alert(JSON.stringify(err));
    });
});