import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
//import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import {
    Row, Col, Button
} from 'reactstrap';
import { API } from '../../../utils/Api';
import { imageURL } from '../../../config';

const header = [
    {
        title: '#',
        prop: 'thumbnail',
        sortable: false,
        cell: row => <img width="60px" height="60px" src={imageURL + row.logo} />
    },

    {
        title: 'Nama',
        prop: 'name',
        sortable: true,
    },

    {
        title: 'Url',
        prop: 'url',
        sortable: true,
    },

    {
        title: 'Deskripsi',
        prop: 'description',
        sortable: false
    },

    {
        title: '#',
        cell: row => <Button size="sm" color="warning" onClick={() => window.location = `/bisnis-edit-kategori?${row.id}`}>Edit</Button>
    }
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

class Category extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        let get = await API.get('categories', { type: 'B' })
        this.setState({ data: get.result.data })
    }

    render() {

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                            <div className="page-title">
                                <div className="float-left">
                                    <h1 className="title">Kategori Bisnis Unit</h1>
                                </div>
                            </div>




                            <div className="col-12">
                                <section className="box ">
                                    <header className="panel_header">
                                        <h2 className="title float-left">Semua Kategori</h2>

                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-lg-12 dt-disp">

                                                <Datatable
                                                    tableHeader={header}
                                                    tableBody={this.state.data}
                                                    keyName="userTable"
                                                    tableClass="striped table-hover table-responsive d-table"
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

export default Category;
