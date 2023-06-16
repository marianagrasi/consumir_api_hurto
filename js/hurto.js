//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'http://localhost:8084/api/hurto'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url,{
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp)=> resp.json())
    .then(function(data){
        let listaHurtos = data.hurtos
        return listaHurtos.map(function(hurto){
            respuesta+=`<tr><td>${hurto.direccion}</td>`+
            `<td>${hurto.latitud}</td>`+
            `<td>${hurto.longitud}</td>`+
            `<td>${hurto.descripcion}</td>`+
            `<td>${hurto.fecha}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(hurto)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(hurto)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}

const registrar = async() =>{
    const validarDireccionRespuesta = validarDireccion();
    const validarLatitudRespuesta = validarLatitud();
    const validarLongitudRespuesta = validarLongitud();
    const validarDescripcionRespuesta = validarDescripcion();

    if (validarDireccionRespuesta && validarLatitudRespuesta && validarLongitudRespuesta && validarDescripcionRespuesta){
        let _direccion = document.getElementById('direccion').value
        let _latitud = document.getElementById('latitud').value
        let _longitud = document.getElementById('longitud').value
        let _descripcion = document.getElementById('descripcion').value

        let hurto = {
            direccion : _direccion,
            latitud : _latitud,
            longitud : _longitud,
            descripcion : _descripcion
        }
        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(hurto),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'El hurto ha sido creado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'hurto.html';
            },1000);  
        })
    }
    
}

validarDireccion = () => {
    let direccion = document.getElementById('direccion').value.trim();
    let texto;
    let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
  
    if (!direccion) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia.</span>';
        document.getElementById('errorDireccion').innerHTML = texto;
        return false;
    } else if (direccion.length < 5) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
        document.getElementById('errorDireccion').innerHTML = texto;
        return false;
    } else if (!expresion.test(direccion)) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
        document.getElementById('errorDireccion').innerHTML = texto;
        return false;
    }else{
      document.getElementById('errorDireccion').innerHTML = '';
      return true;
    } 
  };


validarDescripcion = () => {
    let descripcion = document.getElementById('descripcion').value
    let texto;
    
  
    if (descripcion === null || descripcion === '' || descripcion.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la descripción del hurto</span>';
      document.getElementById('errorDescripcion').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorDescripcion').innerHTML = '';
      return true;
    }
  }

  validarLatitud = () => {
    let latitud = document.getElementById('latitud').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (latitud === null || latitud === '' || latitud.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la latitud</span   >';
      document.getElementById('errorLatitud').innerHTML = texto;
      return false;
    } else if (!expresion.test(latitud)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorLatitud').innerHTML = texto;
      return false;
    } else if (latitud <= 6.13) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de latitud tiene que ser mayor o igual a 6.13</span>';
      document.getElementById('errorLatitud').innerHTML = texto;
      return false;
    } else if (latitud >= 6.217 ) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de latitud tiene que ser menor o igual a 6.217</span>';
      document.getElementById('errorLatitud').innerHTML = texto;
      return false;    
    }else{
      document.getElementById('errorLatitud').innerHTML = '';
      return true;
    } 
  }

  validarLongitud = () => {
    let longitud = document.getElementById('longitud').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (longitud === null || longitud === '' || longitud.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la longitud</span   >';
      document.getElementById('errorLongitud').innerHTML = texto;
      return false;
    } else if (!expresion.test(longitud)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorLongitud').innerHTML = texto;
      return false;
    } else if (longitud <= -75.567) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de longitud tiene que ser mayor o igual a 75.34</span>';
      document.getElementById('errorLongitud').innerHTML = texto;
      return false;
    } else if (longitud >= -75.34 ) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de longitud tiene que ser menor o igual a 75.567</span>';
      document.getElementById('errorLongitud').innerHTML = texto;
      return false;    
    }else{
      document.getElementById('errorLongitud').innerHTML = '';
      return true;
    } 
  }


  const ActualizarRegistro = async() =>{
    const validarDireccionRespuesta = validarDireccion1();
    const validarLatitudRespuesta = validarLatitud1();
    const validarLongitudRespuesta = validarLongitud1();
    const validarDescripcionRespuesta = validarDescripcion1();

    if (validarDireccionRespuesta && validarLatitudRespuesta && validarLongitudRespuesta && validarDescripcionRespuesta){
        let _direccion = document.getElementById('direccion1').value
        let _latitud = document.getElementById('latitud1').value
        let _longitud = document.getElementById('longitud1').value
        let _descripcion = document.getElementById('descripcion1').value

        let hurto = {
            direccion : _direccion,
            latitud : _latitud,
            longitud : _longitud,
            descripcion : _descripcion
        }
        fetch(url,{
            method: 'PUT',
            mode : 'cors',
            body: JSON.stringify(hurto),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'info',
                title: 'El hurto ha sido modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'hurto.html';
            },1000);  
        })
    }
    
}


validarDireccion1 = () => {
    let direccion = document.getElementById('direccion1').value.trim();
    let texto;
    let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
  
    if (!direccion) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia.</span>';
        document.getElementById('errorDireccion1').innerHTML = texto;
        return false;
    } else if (direccion.length < 5) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
        document.getElementById('errorDireccion1').innerHTML = texto;
        return false;
    } else if (!expresion.test(direccion)) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
        document.getElementById('errorDireccion1').innerHTML = texto;
        return false;
    }else{
      document.getElementById('errorDireccion1').innerHTML = '';
      return true;
    } 
  };


validarDescripcion1 = () => {
    let descripcion = document.getElementById('descripcion1').value
    let texto;
    
  
    if (descripcion === null || descripcion === '' || descripcion.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la descripción del hurto</span>';
      document.getElementById('errorDescripcion1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorDescripcion1').innerHTML = '';
      return true;
    }
  }

  validarLatitud1 = () => {
    let latitud = document.getElementById('latitud1').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (latitud === null || latitud === '' || latitud.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la latitud</span   >';
      document.getElementById('errorLatitud1').innerHTML = texto;
      return false;
    } else if (!expresion.test(latitud)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorLatitud1').innerHTML = texto;
      return false;
    } else if (latitud <= 6.13) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de latitud tiene que ser mayor o igual a 6.13</span>';
        document.getElementById('errorLatitud1').innerHTML = texto;
        return false;
    } else if (latitud >= 6.217 ) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de latitud tiene que ser menor o igual a 6.217</span>';
        document.getElementById('errorLatitud1').innerHTML = texto;
        return false;    
    }else{
      document.getElementById('errorLatitud1').innerHTML = '';
      return true;
    } 
  }

  validarLongitud1 = () => {
    let longitud = document.getElementById('longitud1').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (longitud === null || longitud === '' || longitud.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la longitud</span   >';
      document.getElementById('errorLongitud1').innerHTML = texto;
      return false;
    } else if (!expresion.test(longitud)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorLongitud1').innerHTML = texto;
      return false;
    }else if (longitud <= -75.567) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de longitud tiene que ser mayor o igual a 75.34</span>';
        document.getElementById('errorLongitud1').innerHTML = texto;
        return false;
    } else if (longitud >= -75.34 ) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de longitud tiene que ser menor o igual a 75.567</span>';
        document.getElementById('errorLongitud1').innerHTML = texto;
        return false;    
    } else{
      document.getElementById('errorLongitud1').innerHTML = '';
      return true;
    } 
  }

  const editar = (hurto) => {
    document.getElementById('direccion1').value = hurto.direccion;
    document.getElementById('latitud1').value = hurto.latitud;
    document.getElementById('longitud1').value = hurto.longitud;
    document.getElementById('descripcion1').value = hurto.descripcion;
    document.getElementById('fecha1').value = hurto.fecha;     
  }

  const eliminar = (id) =>{

    Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
            let hurto = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(hurto),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() =>{
                Swal.fire(
                    'Eliminado!',
                    'El hurto ha sido eliminado.',
                    'success',
                    );
                setTimeout(() =>{
                    window.location.href = 'hurto.html';
                },1000);  
            })
        }
      })
    }


if(document.querySelector('#btnRegistrar')){
        document.querySelector('#btnRegistrar')
        .addEventListener('click',registrar)
}
  
if(document.querySelector('#btnActualizar')){
        document.querySelector('#btnActualizar')
        .addEventListener('click',ActualizarRegistro)
}