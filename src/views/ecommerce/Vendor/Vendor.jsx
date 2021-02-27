import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
import Swal from 'sweetalert2'
//import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import {
    Row, Col, Button
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { imageURL } from '../../../config'
import { API } from '../../../utils/Api';

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

class Vendor extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            body: [],
            fetch: 0,
            header: [
                { title: '#', prop: 'display_picture', cell: row => <img width="60px" src={imageURL + row.display_picture} /> },
                { title: 'Nama', prop: 'name', sortable: true, filterable: true },
                { title: 'Email', prop: 'email', sortable: true, filterable: true },
                { title: 'No HP', prop: 'phone', sortable: true, filterable: true },
                { title: 'Perusahaan', prop: 'company', sortable: true, filterable: true },
                { title: 'Kota', prop: 'city', sortable: true, filterable: true },
                {
                    title: 'Status', cell: row => {
                        if (row.active == 'Y') {
                            return <p className="text-success">Aktif</p>
                        }

                        else {
                            return <p className="text-warning">Banned</p>
                        }
                    }
                },
                { title: 'Bergabung', prop: 'created_at', cell: row => (moment(row.created_at).format('dddd, DD MMMM YYYY')) },
                {
                    title: 'Action', prop: 'created_at', cell: row => (
                        <>
                            <Link to={`/detail-vendor?${row.id}`}><Button color="primary" size="sm">Lihat</Button></Link>
                            <Link to={`/edit-vendor?${row.id}`}><Button color="warning" size="sm">Edit</Button></Link>
                            {/* <Button color="danger" size="sm">Banned</Button> */}
                        </>
                    )
                },

            ]
        }
    }

    async componentDidMount() {
        let get = await API.get('sellers')
        if (!get.success) {
            Swal.fire('', 'Gagal mengambil data penjual', 'error')
        }

        else {
            this.setState({
                fetch: 1,
                body: get.result.data
            })
        }
    }
    render() {

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                            <div className="page-title">
                                <div className="float-left">
                                    <h1 className="title">Penjual</h1>
                                </div>
                            </div>




                            <div className="col-12">
                                <section className="box ">
                                    <header className="panel_header">
                                        <h2 className="title float-left">Semua Penjual</h2>

                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-lg-12 dt-disp">

                                                <Datatable
                                                    tableHeader={this.state.header}
                                                    tableBody={this.state.body}
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

export default Vendor;
