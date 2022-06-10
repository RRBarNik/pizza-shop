import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PropsType = {
    onChangePage: (number: number) => void;
}

const Pagination: React.FC<PropsType> = ({ onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected)}
            pageRangeDisplayed={4}
            pageCount={3}
            renderOnZeroPageCount={null as any}
        />
    );
}

export default Pagination;