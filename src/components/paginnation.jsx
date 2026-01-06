import React from "react";
export default function Paginnation({totalItems, itemsPerPage, currentPage, onPageChange}){
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for(let i=1; i<= totalPages; i++){
        pageNumbers.push(i);
    }

    if(totalPages <= 1) return null;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-items ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                        &laquo;
                    </button>
                </li>
                {
                    pageNumbers.map(number => (
                        <li key={number} className={`page-items ${currentPage === number ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(number)}>
                               {number}
                            </button>
                        </li>
                    ))

                }
                
                <li className={`page-items ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                        &raquo;
                    </button>
                </li>
                
            </ul>
</nav>
    )
}