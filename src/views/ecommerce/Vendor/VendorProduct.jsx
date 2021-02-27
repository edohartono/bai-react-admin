import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
//import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import {
    Row, Col, ButtonGroup, Button
} from 'reactstrap';
import { API } from '../../../utils/Api'
import { IDR_Format } from '../../../utils/Currency'

import Swal from 'sweetalert2'


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

class VendorProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            header: [
                {
                    title: '#',
                    prop: 'thumbnail',
                    sortable: false,
                    cell: row => {
                        let thumbnail = JSON.parse(row.gambar)
                        return (
                            <img width="60px" height="60px" src={thumbnail[0]} />
                        )
                    }
                },

                {
                    title: 'Nama Produk',
                    prop: 'nama',
                    sortable: true,
                },

                {
                    title: 'Kategori',
                    prop: 'kategori',
                    sortable: true
                },

                {
                    title: 'Perusahaan',
                    prop: 'perusahaan',
                    sortable: true
                },

                {
                    title: 'Harga',
                    prop: 'harga',
                    sortable: true,
                    cell: row => <span>Rp. {IDR_Format(row.harga)}</span>
                },
                {
                    title: 'Status',
                    prop: 'verified',
                    sortable: true,
                    cell: row => {
                        if (row.verified == 1) {
                            return <span class="badge badge-success">Terverifikasi</span>
                        }
                        if (row.verified == 0) {
                            return <span class="badge badge-warning">Perlu Verifikasi</span>
                        }
                        if (row.verified == 2) {
                            return <span class="badge badge-danger">Banned</span>
                        }
                    }
                },


                {
                    title: 'Action',
                    // button: true,
                    cell: row => {
                        if (row.verified == 1) {
                            return (
                                <ButtonGroup>
                                    <Button color="primary">Lihat</Button>
                                </ButtonGroup>)
                        }

                        if (row.verified == 0) {
                            return (
                                <ButtonGroup>
                                    <Button color="success" onClick={() => {
                                        this.verifyProduct(row.product_id)
                                    }}>Verifikasi</Button>
                                </ButtonGroup>
                            )
                        }
                    }
                }
            ]
        }

        this.verifyProduct = this.verifyProduct.bind(this)
    }

    componentDidMount = async () => {
        var products = await API.get('admin/product/all', {})


        // let unverifiedProduct = []
        // let verifiedProduct = []
        // let bannedProduct = []

        // await Promise.all(
        //   products.data.result.map((p) => {
        //     console.log(p)
        //     if (p.verified == 0) {
        //       unverifiedProduct.push(p)
        //     }

        //     else if (p.verified == 1) {
        //       verifiedProduct.push(p)
        //     }

        //     else {
        //       bannedProduct.push(p)
        //     }
        //   })
        // )

        this.setState({
            products: products.result
        })
    }
    verifyProduct = async (e) => {
        let verify = await API.post('admin/product/verify', { product_id: e, verified: 1 })
        if (verify.success) {
            Swal.fire('Berhasil verifikasi produk', '', 'success')
            let _products = this.state.products
            let idx = _products.findIndex(v => v.product_id == e)
            _products[idx].verified = 1

            this.setState({
                products: _products
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
                                    <h1 className="title">Vendors</h1>
                                </div>
                            </div>




                            <div className="col-12">
                                <section className="box ">
                                    <header className="panel_header">
                                        <h2 className="title float-left">Produk Penjual</h2>

                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-lg-12 dt-disp">

                                                <Datatable
                                                    tableHeader={this.state.header}
                                                    tableBody={this.state.products}
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

export default VendorProduct;
