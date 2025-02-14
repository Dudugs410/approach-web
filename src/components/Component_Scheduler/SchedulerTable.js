import React, { useState, useEffect } from 'react';
import { FiTrash2, FiSkipBack, FiChevronLeft, FiChevronRight, FiSkipForward } from 'react-icons/fi';

import './schedulerTable.scss'

const SchedulerTable = ({ array, deleteBooking }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const totalPages = Math.ceil(array.length / itemsPerPage);
    // If the current page has no items, move to the previous page
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [array, currentPage, itemsPerPage]);

  const goToPrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(array.length / itemsPerPage)));
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(Math.ceil(array.length / itemsPerPage));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = array.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="dropShadow vendas-view">
        <div className="table-wrapper">
          <table className="table table-striped table-hover det-table-global">
            <thead>
              <tr className="det-tr-top-global">
                <th className="det-th-global" scope="col">Data</th>
                <th className="det-th-global" scope="col">Horário</th>
                <th className="det-th-global" scope="col">Local</th>
                <th className="det-th-global" scope="col">Quadra</th>
                <th className="det-th-global" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index} className="det-tr-global">
                    <td className="det-td-vendas-global" data-label="Data">{item.data}</td>
                    <td className="det-td-vendas-global" data-label="Horário">{item.hora}</td>
                    <td className="det-td-vendas-global" data-label="Local">{item.local}</td>
                    <td className="det-td-vendas-global" data-label="Quadra">{item.quadra}</td>
                    <td className="det-td-vendas-global" data-label="Ação">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteBooking(index)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

		{/* Pagination */}
		{array.length > itemsPerPage && (
		  <div className="container-btn-pagina">
			<button className="btn btn-primary btn-global btn-skip btn-schedule-table" onClick={goToFirstPage} disabled={currentPage === 1}>
			  <FiSkipBack />
			</button>
			<button className="btn btn-primary btn-global btn-navigate btn-schedule-table" onClick={goToPrevPage} disabled={currentPage === 1}>
			  <FiChevronLeft />
			</button>
			<div className="pagina-atual">
			  <span className="texto-paginacao">Página </span>
			  <span className="texto-paginacao">{currentPage}</span>
			</div>
			<button className="btn btn-primary btn-global btn-navigate btn-schedule-table" onClick={goToNextPage} disabled={currentPage === Math.ceil(array.length / itemsPerPage)}>
			  <FiChevronRight />
			</button>
			<button className="btn btn-primary btn-global btn-skip btn-schedule-table" onClick={goToLastPage} disabled={currentPage === Math.ceil(array.length / itemsPerPage)}>
			  <FiSkipForward />
			</button>
		  </div>
      )}
    </>
  );
};

export default SchedulerTable;
