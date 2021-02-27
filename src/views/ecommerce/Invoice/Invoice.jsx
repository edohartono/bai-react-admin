import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
//import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import {
    Row, Col,
} from 'reactstrap';

const header = [
    { title: 'Invoice', prop: 'id', sortable: true, filterable: true },
    { title: 'Customer', prop: 'customer', sortable: true, filterable: true },
    { title: 'Seller', prop: 'title', sortable: true, filterable: true },
    { title: 'Total', prop: 'email', sortable: true, filterable: true },
    { title: 'Price', prop: 'price', sortable: true, filterable: true },
    { title: 'Order Dibuat', prop: 'date', sortable: true, filterable: true },
    { title: 'Jatuh Tempo', prop: 'status', sortable: true, filterable: true },
];



const body = [
];

const onSortFunction = {
    date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, 'Do MMMM YYYY').valueOf();
    },
};

const customLabels = {
    first: '<<',
    last: '>>',
    prev: '<',
    next: '>',
    show: 'Display ',
    entries: ' rows',
    noResults: 'There is no data to be displayed',
};

class Invoice extends React.Component {


    render() {

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                            <div className="page-title">
                                <div className="float-left">
                                    <h1 className="title">Invoice</h1>
                                </div>
                            </div>




                            <div className="col-12">
                                <section className="box ">
                                    <header className="panel_header">
                                        <h2 className="title float-left">Semua Invoice</h2>

                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-lg-12 dt-disp">

                                                <Datatable
                                                    tableHeader={header}
                                                    tableBody={body}
                                                    keyName="userTable"
                                                    tableClass="striped table-hover table-responsive"
                                                    rowsPerPage={10}
                                                    rowsPerPageOption={[5, 10, 15, 20]}
                                                    initialSort={{ prop: "id", isAscending: true }}
                                                    onSort={onSortFunction}
                                                    labels={customLabels}
                                                />



                                            </div>
                                        </div>


                                    </div>
                                </section>
                            </div>


                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}

export default Invoice;
