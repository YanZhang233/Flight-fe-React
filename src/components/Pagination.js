import React from "react";

class Pagination extends React.Component {

    handleClick = (pageIndex) => {
        if(pageIndex>=0 && pageIndex<this.props.totalPages) {
            this.props.handlePagination(pageIndex);
        }
    }

    render() {
        
        const currentPage = this.props.currentPage;

        var current = currentPage;
        var previous = current - 1;
        var next = current + 1;
        

        if(current === 0) {
            previous = current;
            current = previous + 1;
            next = current + 1;
        } else if(current === this.props.totalPages - 1) {
            next = current;
            current = next - 1;
            previous = current - 1;
        }


        return (
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a 
                    className="page-link" 
                    aria-label="Previous" 
                    onClick={() => this.handleClick(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                {previous >= 0?
                    <li className={`page-item ${previous===currentPage?"active":""}`}><a className="page-link" onClick={() => this.handleClick(previous)}>{previous + 1}</a></li>
                    :
                    ""
                }
                <li className={`page-item ${current===currentPage?"active":""}`}><a className="page-link" onClick={() => this.handleClick(current)}>{current + 1}</a></li>
                {next < this.props.totalPages?
                    <li className={`page-item ${next===currentPage?"active":""}`}><a className="page-link" onClick={() => this.handleClick(next)}>{next + 1}</a></li>
                    :
                    ""
                }
                <li className="page-item">
                  <a 
                    className="page-link" 
                    aria-label="Next" 
                    onClick={() => this.handleClick(currentPage + 1)}
                >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
        );
        
    }
}

export default Pagination;
