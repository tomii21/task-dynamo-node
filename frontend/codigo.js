function  Enviar(){
    
  let tituloNota = document.getElementById('titulo').value;
  let nota = document.getElementById('notas').value;
  let objeto ={titulo: tituloNota, notas: nota  }
  EnviarDatos(objeto)
}

function EnviarDatos(objeto){
  
  fetch('http://localhost:3000/notas', {
      method: "POST",
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(objeto),
      
  }).then(res=> res.json())
  .then((data)=>{
      console.log(data)
  })
  .catch((error)=>{
      console.log(error)
  })
  alert("Nota guardada")
}

