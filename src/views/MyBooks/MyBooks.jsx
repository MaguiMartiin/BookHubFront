import React, { useEffect } from 'react';
import style from './MyBooks.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBooks } from '../../redux/actions';
import { FaEdit, FaTrash } from 'react-icons/fa'

export const MyBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.copyState);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  return (
    <div className={style.myBooksContainer}>
      <div className={style.tableContainer}>
        <table className={style.booksTable}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Name</th>
              <th className={style.tableHeader}>Gender</th>
              <th className={style.tableHeader}>Price</th>
              <th className={style.tableHeader} >Edit or Delete</th>
            </tr>
          </thead>
          <tbody>
            {books?.slice(0, 6).map((e) => (
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

export default MyBooks;
