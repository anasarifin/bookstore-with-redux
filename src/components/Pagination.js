import React from 'react';
import {Pagination, PaginationItem} from 'reactstrap';

const PaginationComp = (props) => {
    const pageLinks = []

    for(let i=1; i <= props.page + 1; i++){
        let active = props.currentPage == i ? 'active' : '';
        pageLinks.push( <PaginationItem className={`${active}`} key={i} onClick={()=> props.nextPage(i)}><a href='#'>{i}</a></PaginationItem>)
    }
    return (
    <Pagination>
        { props.currentPage > 1 ? <PaginationItem onClick={()=> props.nextPage(props.currentPage - 1)}><a href='#'>Prev</a></PaginationItem>: ''}
        { pageLinks }
        { props.currentPage + 1 ? <PaginationItem onClick={()=> props.nextPage(props.currentPage + 1)}><a href='#'>Next</a></PaginationItem>: ''}
    </Pagination>
    )
}
export default PaginationComp;
