import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/actions';
import { FaEdit, FaTrash } from 'react-icons/fa'
import style from './EditUsers.module.css';

export const EditUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.copyState);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className={style.editUsersContainer}>
      <div className={style.tableContainer}>
        <table className={style.usersTable}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Name</th>
              <th className={style.tableHeader}>Gender</th>
              <th className={style.tableHeader}>Price</th>
              <th className={style.tableHeader} >Edit or Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.slice(0, 6).map((e) => (
              <tr key={e.id} className={style.tableRow}>
                <td className={style.tableData}>{e.name}</td>
                <td className={`${style.tableData} ${style.gender}`}>{e.Gender?.name}</td>
                <td className={style.tableData}>
                  <p className={style.price}>${e.price}</p>
                </td>
                <td className={`${style.tableData} ${style.actions}`}>
                    <button className={style.editButton}><FaEdit /></button>
                    <button className={style.deleteButton}> <FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditUsers;