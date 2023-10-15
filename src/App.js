import './App.css';
import { useState } from 'react';
import Axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {

const [nombre, setNombre] = useState("");
const [apellido, setApellido] = useState("");
const [edad, setEdad] = useState();
const [pais, setPais] = useState("");
const [cargo, setCargo] = useState("");
const [anios, setAnios] = useState();
const [id, setId] = useState();

const [editar, setEditar] = useState(false);

const [empleadosList, setEmpleados] = useState([]);

const add = ()=>{
  Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      apellido:apellido,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
  }).then(function(){
    getempleados();
    limpiarCampos();
      Swal.fire({
      title: "<strong>Registro exitoso!!!</strong>",
      html: "<i>El empleado <strong>"+nombre+" "+apellido+"</strong> fue registrado!!!</i>",
      icon: 'success',
      timer: 3000
    })
  }).catch(function(error){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
    })
  });
}
const update = ()=>{
  Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      apellido:apellido,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
  }).then(function(){
    getempleados();
    limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El empleado <strong>"+nombre+" "+apellido+"</strong> fue actualizado con éxito!!!</i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
}
const eliminarEmpleado = (val)=>{
  Swal.fire({
    title: 'Confirmar eliminado?',
    html: "<i>Desea Eliminar a <strong>"+val.nombre+" "+val.apellido+"</strong>?</i>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminado!'
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/delete/${val.id}`).then(function(){
        getempleados();
        limpiarCampos();
        Swal.fire({
          icon: 'success',
          title: val.nombre+" "+val.apellido+' Fue Eliminado.',
          showConfirmButton: false,
          timer: 2000
        });
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido eliminar el Empleado!',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        })
      });
    }
  });

}

const editarEmpleado = function(val){
    setEditar(true);

    setNombre(val.nombre);
    setApellido(val.apellido);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
}

const limpiarCampos = ()=>{
  setAnios("");
  setNombre("");
  setApellido("");
  setCargo("");
  setEdad("");
  setPais("");
  setId("");
  setEditar(false);
}

const getempleados = ()=>{
  Axios.get("http://localhost:3001/empleados").then(function(response){
      setEmpleados(response.data);
  });
}
getempleados();



  return (
    <div className="App">
        <div className='botones'>
        </div>
        <div className="Card">
        <div className="card_header">
            <h2>Gestión Empleados</h2> 
        </div>
        <div className="card_body">
          <div className="form">
            <h4>Nombre: </h4>
              <input onChange={(event) =>{
                  setNombre(event.target.value);
                }} 
              type="Text" id="nombre"
              className="input_form" value={nombre} autoComplete="off" placeholder=" "></input>
              <label className="label_form">Ingrese Nombre</label>
          </div>
          <div className="form">
          <h4>Apellido: </h4>
              <input onChange={(event) =>{
                setApellido(event.target.value);
              }}
              type="text" id="apellido"
              className="input_form" value={apellido} autoComplete="off" placeholder=" " />
              <label className="label_form">Ingrese Apellido</label>
          </div>
          <div className="form">
          <h4>Edad: </h4>
              <input 
              onChange={(event) =>{
                setEdad(event.target.value);
              }}
              type="number" id="edad"
              className="input_form" value={edad} autoComplete="off" placeholder=" " />
              <label  className="label_form">Ingrese Edad </label>
          </div>
          <div className="form">
          <h4>País: </h4>
              <input 
              onChange={(event) =>{
                setPais(event.target.value);
              }}
              type="text" id="pais"
              className="input_form" value={pais} autoComplete="off" placeholder=" " />
              <label  className="label_form">Ingrese su país</label>
          </div>
          <div className="form">
          <h4>Cargo: </h4>
              <input 
              onChange={(event) =>{
                setCargo(event.target.value);
              }}
              type="text" id="cargo"
              className="input_form" value={cargo} autoComplete="off" placeholder=" " />
              <label  className="label_form">Ingrese su cargo</label>
          </div>
          <div className="form">
          <h4>Años: </h4>
              <input 
              onChange={(event) =>{
                setAnios(event.target.value);
              }}
              type="number" id=""
              className="input_form" value={anios} autoComplete="off" placeholder=" " />
              <label  className="label_form">Ingrese años en el cargo</label>
          </div>
        </div>
        <div className="card_footer">
          <div className='registrar'>
                {
                  editar?
                  <div>
                  <button onClick={update} className="btn_Actualizar-cancelar">Actualizar</button> 
                  <button onClick={limpiarCampos} className="btn_Actualizar-cancelar">Cancelar</button>
                  </div>
                  :<button onClick={add} className="btn_registrar">Registrar</button>
                }  
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Edad</th>
              <th scope="col">País</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
      </thead>
      <tbody>
          {
            empleadosList.map(function(val, key){
              return <tr key={val.id}>
                      <th scope="row">{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.apellido}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>
                        <div className='btn-group'>
                          <button onClick={()=>{
                            editarEmpleado(val);
                          }}
                             className="btn_editar">Editar
                          </button>
                          <button onClick={()=>{
                             eliminarEmpleado(val);
                          }} className="btn_eliminar">Eliminar</button>
                        </div>
                      
                      </td>
                    </tr>
            })
          }
      </tbody>
      </table>
    </div>
  );
}
export default App;
