import React, { Component } from 'react'
import {
    Row, Col, Button
} from 'reactstrap'
import { API } from '../../../utils/Api'
import { imageURL } from '../../../config'
import Swal from 'sweetalert2'
import moment from 'moment'

moment.locale('id')

export class DetailVendor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seller: null,
            submit: false
        }

        this.statusUser = this.statusUser.bind(this)
    }

    async componentDidMount() {
        if (this.props.location.search) {
            this.getData(this.props.location.search.substring(1))
        }

        else {
            Swal.fire('Gagal mengambil data penjual', '', 'error')
        }
    }

    async getData(id) {

        let get = await API.get('sellers', { id: id })
        if (!get.success) {
            Swal.fire('Data penjual tidak ditemukan', '', 'info')
            return true
        }
        else {
            this.setState({ seller: get.result.data[0] })
            return false
        }
    }

    async statusUser(id, status) {
        this.setState({ submit: true })
        if (status == 'B') {
            Swal.fire({
                text: 'Apakah anda yakin ingin banned seller?',
                icon: 'warning',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal',
                showCancelButton: true
            })
                .then(async (res) => {
                    if (res.value) {
                        let edit = await API.patch('sellers', { active: status, id: id })
                        if (edit.success) {
                            await this.getData(id).then(() => {
                                Swal.fire('', 'Berhasil memperbarui status penjual', 'success')

                            })
                        }

                        else {
                            Swal.fire('', 'Gagal memperbarui status penjual', 'error')
                        }
                    }

                    else {

                    }
                })
        }

        else {

            Swal.fire({
                text: 'Apakah anda yakin ingin unbanned penjual?',
                icon: 'warning',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal',
                showCancelButton: true
            })
                .then(async (res) => {
                    if (res.value) {
                        let edit = await API.patch('sellers', { active: status, id: id })
                        if (edit.success) {
                            await this.getData(id).then(() => {
                                Swal.fire('', 'Berhasil memperbarui status penjual', 'success')

                            })
                        }

                        else {
                            Swal.fire('', 'Gagal memperbarui status penjual', 'error')
                        }
                    }

                    else {

                    }
                })
        }
        this.setState({ submit: false })
    }
    render() {
        const { seller } = this.state
        if (!seller) return null
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
                                        <h2 className="title float-left">Profil Penjual</h2>

                                    </header>
                                    <div className="content-body">
                                        <div className="row">
                                            <div className="col-lg-12 dt-disp">

                                                <div className="container">
                                                    <div className="main-body">
                                                        {/* /Breadcrumb */}
                                                        <div className="row gutters-sm">
                                                            <div className="col-md-4 mb-3">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div className="d-flex flex-column align-items-center text-center">
                                                                            <img src={imageURL + seller.display_picture} alt="Admin" className="rounded-circle" width={150} />
                                                                            <div className="mt-3">
                                                                                <h4>{seller.name}</h4>
                                                                                <p class="mb-4">{seller.company}</p>
                                                                                {
                                                                                    seller.active == 'Y' &&
                                                                                    <>
                                                                                        <p class="mb-4">Status: <span className="text-success">Aktif</span></p>
                                                                                        <Button
                                                                                            color="danger"
                                                                                            size="sm"
                                                                                            disabled={this.state.submit}
                                                                                            onClick={() => this.statusUser(seller.id, 'B')}
                                                                                        >Banned Penjual</Button>
                                                                                    </>
                                                                                }
                                                                                {
                                                                                    seller.active == 'B' &&
                                                                                    <>
                                                                                        <p class="mb-4">Status: <span className="text-danger">Banned</span></p>
                                                                                        <Button
                                                                                            color="warning"
                                                                                            size="sm"
                                                                                            disabled={this.state.submit}
                                                                                            onClick={() => this.statusUser(seller.id, 'Y')}
                                                                                        >Unbanned Penjual</Button>
                                                                                    </>
                                                                                }
                                                                                <Button
                                                                                    color="warning"
                                                                                    size="sm"
                                                                                    onClick={() => window.location = `/edit-vendor?${seller.id}`}
                                                                                >Edit Penjual</Button>
                                                                                {/* <button className="btn btn-primary">Follow</button>
                                                                                <button className="btn btn-outline-primary">Message</button> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card mt-3 d-none">
                                                                    <ul className="list-group list-group-flush">
                                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx={12} cy={12} r={10} /><line x1={2} y1={12} x2={22} y2={12} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>Website</h6>
                                                                            <span className="text-secondary">https://bootdey.com</span>
                                                                        </li>
                                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>Github</h6>
                                                                            <span className="text-secondary">bootdey</span>
                                                                        </li>
                                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>Twitter</h6>
                                                                            <span className="text-secondary">@bootdey</span>
                                                                        </li>
                                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x={2} y={2} width={20} height={20} rx={5} ry={5} /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>Instagram</h6>
                                                                            <span className="text-secondary">bootdey</span>
                                                                        </li>
                                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>Facebook</h6>
                                                                            <span className="text-secondary">bootdey</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="card mb-3">
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Nama</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.name}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Email</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.email}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">No HP</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.phone}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Perusahaan</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.company}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Profil Perusahaan</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.company_profile ? seller.company_profile : <i>Profil perusahaan belum diisi</i>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Alamat</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.address}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Provinsi</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.province}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Kota</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.city}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Kecamatan</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {seller.subdistrict}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row">
                                                                            <div className="col-sm-3">
                                                                                <h6 className="mb-0">Bergabung</h6>
                                                                            </div>
                                                                            <div className="col-sm-9 text-secondary">
                                                                                {moment(seller.created_at).format('DD MMMM YYYY')}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row gutters-sm d-none">
                                                                    <div className="col-sm-6 mb-3">
                                                                        <div className="card h-100">
                                                                            <div className="card-body">
                                                                                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                                                                <small>Web Design</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>Website Markup</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>One Page</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>Mobile Template</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>Backend API</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6 mb-3">
                                                                        <div className="card h-100">
                                                                            <div className="card-body">
                                                                                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                                                                <small>Web Design</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>Website Markup</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>One Page</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>Mobile Template</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                                <small>Backend API</small>
                                                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>


                                    </div>
                                </section>
                            </div>


                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}

export default DetailVendor
