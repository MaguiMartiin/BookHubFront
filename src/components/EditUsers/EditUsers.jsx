import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, searchUsers, suspenderUsers, quitarSuspenderUsers, eliminarUsers, adminUsers, vendedorUsers, usersVendedor } from '../../redux/actions';
import { FaEdit, FaTrash } from 'react-icons/fa';
import style from './EditUsers.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EditUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [suspender, setSuspender] = useState("");
  const [unSuspender, setUnSuspender] = useState("");
  const [delet, setDelet] = useState("");
  const [admins, setAdmin] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [userVendedor, setUserVendedor] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, suspender, unSuspender, delet, admins, vendedor, userVendedor]);

//busca por email
  const handleSearch = (e) => {
    const { value } = e.target;
    console.log(value);
    setEmail(value)
    setCurrentPage(1)
  };

//suspender user
  const handleSuspender = (id) => {
    console.log(id);
    setSuspender(id)
  };
//quitar suspencion user
  const handleUnSuspender = (id) => {
    setUnSuspender(id)
  };

//eliminar user
  const handleDelete = (id) => {
    setDelet(id)
  };

//convertir adim a user
  const handleAdmin = (id) => {
    setAdmin(id)
  };

//convertir vendedor a user
  const handleVendedor = (id) => {
    setVendedor(id)
  };

//convertir vendedor a user
  const handleUserVendedor = (id) => {
    setUserVendedor(id)
  };

  useEffect(() => {
    dispatch(suspenderUsers(suspender))
    setSuspender("")
    dispatch(quitarSuspenderUsers(unSuspender))
    setUnSuspender("")
    dispatch(eliminarUsers(delet))
    setDelet("")
    dispatch(adminUsers(admins))
    setAdmin("")
    dispatch(vendedorUsers(vendedor))
    setVendedor("")
    dispatch(usersVendedor(userVendedor))
    setUserVendedor("")
    dispatch(getAllUsers());
}, [suspender, unSuspender, delet, admins, vendedor, userVendedor]);

  useEffect(() => {
    dispatch(searchUsers(email));
  }, [email]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const visibleUsers = users?.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className={style.editUsersContainer}>
      
      <div className={style.sidebar}>
        <Link to="/" className={style.titulo1}>
          BookHub
        </Link>
        <Link to="/dashboard">
          <button className={style.titulo2}>Volver</button>
        </Link>
        <button className={style.sidebutton} onClick={() => { navigate("/publicaciones") }}>
            Mis publicaciones
        </button>
        <button className={style.sidebutton} onClick={() => { navigate("/form") }}>
            Realizar una nueva publicación
        </button>
        <button className={location.pathname !== "/" ? style.boton : style.sidebutton}>
          Editar Usuarios
        </button>
        <button className={style.sidebutton} onClick={() => { navigate("/recordSale") }}>
            Registro de Ventas
        </button>
      </div>
      <div className={style.tableContainer}>

      <input 
            type="text" 
            placeholder='Buscar Usuario Por Email' 
            className={style.search}
            onChange={handleSearch} 
            />

        <table className={style.usersTable}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Nombre y Apellido</th>
              <th className={style.tableHeader}>Email</th>
              <th className={style.tableHeader}>Esta Activo</th>
              <th className={style.tableHeader}>Es Vendedor</th>
              <th className={style.tableHeader}>Es Admin</th>
              <th className={style.tableHeader}>Suspender o Quitar suspensión</th>
              <th className={style.tableHeader}>Vendedor o Usuario</th>
              <th className={style.tableHeader}>Administrador</th>
              <th className={style.tableHeader}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers?.map((e) => (
              
              <tr key={e.id} className={style.tableRow}>
                <td className={style.tableData}>{e.name} {e?.lastName}</td>
                <td className={`${style.tableData} ${style.gender}`}>{e?.email}</td>
                <td className={style.tableData}>
                  <p className={style.price}>{e.isActive  ? '🟢 Si': '🔴 No'}</p>
                </td>
                <td className={style.tableData}>
                  <p className={style.price}>{e.vendedor  ? '🟢 Si' : '🔴 No'}</p>
                </td>
                <td className={style.tableData}>
                  <p className={style.price}>{e.admin  ? '🟢 Si' : '🔴 No'}</p>
                </td>
                <td className={`${style.tableData} ${style.actions}`}>
                 {e.isActive? <button className={e.isActive? style.editButton: style.botonIsAdmin} onClick={()=>handleSuspender(e.id)} >
                  Suspender
                  </button>: <button className={style.botonIsAdmin} onClick={()=>handleUnSuspender(e.id)}>
                  Quitar suspensión
                  </button>}
                </td>
                
                <td className={`${style.tableData}`}>
               {e?.vendedor?<button className={style.botonIsAdmin} onClick={()=>handleUserVendedor(e.id)}>
               Usuario
                  </button> : <button className={e.vendedor? style.botonIsAdmin: style.deleteButton} onClick={()=>handleVendedor(e.id)}>
                Vendedor
                  </button>}
                  </td>
                <td className={`${style.tableData}`}>
                <button className={e.admin? style.botonAdmin: style.deleteButton} onClick={()=>handleAdmin(e.id)}>
                Administrador
                  </button>
                  </td>
                <td className={`${style.tableData}`}>
                  <button className={style.deleteBu} onClick={()=>handleDelete(e.id)}>
                    <FaTrash />
                  </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={style.pagination}>
          <button onClick={goToPrevPage} className={style.pageNavigationButton}>
            &lt;
          </button>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={currentPage === index + 1 ? style.activePage : style.pageNumber}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={goToNextPage} className={style.pageNavigationButton}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUsers;