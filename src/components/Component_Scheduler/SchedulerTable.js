
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiSkipBack, FiSkipForward } from 'react-icons/fi'

import './schedulerTable.scss'

const SchedulerTable = ({array}) =>{

	//adicionando páginas à tabela:

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(15) // Number of items per page

	useEffect(() => {
		setCurrentPage(1) // Reset page to 1 when data changes
	}, [array])

	// Change page functions
	const goToPrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)) // Decrease page by 1, minimum page is 1
	}

	const goToNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(array.length / itemsPerPage))) // Increase page by 1, maximum page is calculated based on array length
	}

	const goToFirstPage = () => {
		setCurrentPage(1) // Go to the first page
	}
    
	const goToLastPage = () => {
		setCurrentPage(Math.ceil(array.length / itemsPerPage)) // Go to the last page
	}
  
	// Calculate indexes for pagination
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = array.slice(indexOfFirstItem, indexOfLastItem)
  
	// Change page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	// // // // // // // // // // // // // // // // // // // // // // // // // // //

	return(
		<>
			<div className='dropShadow vendas-view'>
				<div className='table-wrapper'>
					<table className='table table-striped table-hover det-table-global'>
						<thead>
							<tr className='det-tr-top-global'>
								<th className='det-th-global'scope="col">Data</th>
								<th className='det-th-global'scope="col">Horário</th>
								<th className='det-th-global'scope="col">Local</th>
							</tr>
						</thead>
						<tbody>
							{array.length > 0 && currentItems.map((array, index)=>{
								return(
									<tr key={index} className='det-tr-global'>
										<td className='det-td-vendas-global'data-label="Data">{array.date}</td>
										<td className='det-td-vendas-global'data-label="Horário">{array.time}</td>
										<td className='det-td-vendas-global'data-label="Local">{array.local}</td>
									</tr>
								)
							})}
						</tbody>
					</table> 
				</div>
			</div>
			<hr className='hr-global'/>
			{array.length > itemsPerPage && (
				<div className="container-btn-pagina">
					<button
						className='btn btn-primary btn-global btn-skip btn-schedule-table'
						onClick={goToFirstPage}
						disabled={currentPage === 1} // Disable if already on the first page
					>
						<FiSkipBack />
					</button>
					<button
						className='btn btn-primary btn-global btn-navigate btn-schedule-table'
						onClick={goToPrevPage}
						disabled={currentPage === 1} // Disable if it's the first page
					>
						<FiChevronLeft/> {/* Left arrow */}
					</button>
					<div className='pagina-atual'>
						<span className='texto-paginacao'>Página </span>
						<span className='texto-paginacao'>{currentPage}</span>
					</div>
					<button
						className='btn btn-primary btn-global btn-navigate btn-schedule-table'
						onClick={goToNextPage}
						disabled={currentPage === Math.ceil(array.length / itemsPerPage)} // Disable if it's the last page
					>
						<FiChevronRight/> {/* Right arrow */}
					</button>
					<button
						className='btn btn-primary btn-global btn-skip btn-schedule-table'
						onClick={goToLastPage}
						disabled={currentPage === Math.ceil(array.length / itemsPerPage)} // Disable if already on the last page
					>
						<FiSkipForward />
					</button>
				</div>
			)}
		</>
	)
}

export default SchedulerTable