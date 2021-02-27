import React from 'react';
import {
    Row, Col, Label, Input,
} from 'reactstrap';

//import InputMask from 'react-input-mask';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { API } from '../../../utils/Api';
import ImageUploader from 'react-images-upload';
import Swal from 'sweetalert2'

class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            categories: [],
            gambarList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onDropPicture = this.onDropPicture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    async onDropPicture(picture) {
        let upload = await API.upload(picture[0])
        if ('fileUrl' in upload) {
            this.state.gambarList.push(upload.fileUrl)
        }

        else {
            Swal.fire({
                title: 'Upload Gagal',
                icon: 'warning',
                text: 'Upload gambar gagal, silahkan coba lagi'
            })
            return false
        }
    }

    componentDidMount = async () => {
        let categories = await API.get('categories', { type: 'B' })
        // console.log(categories)
        this.setState({ categories: categories.result.data })
    }
    getProduct(url) {
        return API.get('products', { url: url })
            .then(res => {
                return res
            })
    }

    onSubmit = async () => {
        let { nama, deskripsi, harga, kategori_id, sku, berat, gambarList, stok } = this.state
        if (!deskripsi) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'Deskripsi harus diisi'
            })
            return false
        }
        if (!nama) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'Nama produk harus diisi'
            })
            return false
        }
        if (!kategori_id) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'Kategori produk harus diisi'
            })
            return false
        }
        if (!harga) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'Harga produk harus diisi'
            })
            return false
        }
        if (!sku) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'sku harus diisi'
            })
            return false
        }
        if (!berat) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'berat harus diisi'
            })
            return false
        }
        if (!stok) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'Stok harus diisi'
            })
            return false
        }
        if (gambarList.length == 0) {
            Swal.fire({
                title: 'Data Belum Lengkap',
                icon: 'warning',
                text: 'Gambar produk belum ada'
            })
            return false
        }

        let url = nama.replace(/ /g, "-").toLowerCase()
        let urlcheck = await this.getProduct(url)
        let profile = JSON.parse(localStorage.getItem('profile')).id
        if (!('result' in urlcheck)) url += `-${profile}`


        let submit = await API.post('products/add', {
            name: nama,
            url: url,
            images: gambarList,
            price: harga,
            category_id: kategori_id,
            description: deskripsi,
            sku: sku,
            weight: berat,
            stok: stok,
            active: 'Y'
        })


        if (submit.success) {
            Swal.fire({
                title: 'Produk Berhasil Ditambahkan',
                icon: 'success'
            })

            return { success: true }

        }
        else {
            Swal.fire({
                title: 'Produk gagal ditambahkan',
                icon: 'error',
                text: submit.error.message
            })
            return { success: true }
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
                                    <h1 className="title">Tambah Produk</h1>
                                </div>
                            </div>





                            <div className="row margin-0">
                                <div className="col-12">
                                    <section className="box ">
                                        <header className="panel_header">
                                            {/* <h2 className="title float-left">Basic Info</h2> */}

                                        </header>
                                        <div className="content-body">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">

                                                    <form onSubmit={(e) => {
                                                        e.preventDefault()
                                                        this.onSubmit()
                                                    }}>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputname4">Nama Produk</label>
                                                                <input type="text" className="form-control" id="inputname4" placeholder="" onChange={(e) => this.setState({ nama: e.target.value })} />
                                                            </div>

                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputname74">Deskripsi</label>
                                                                <input type="textarea" className="form-control" id="inputname74" placeholder="" onChange={(e) => this.setState({ deskripsi: e.target.value })} />
                                                            </div>

                                                            <div className="form-group col-md-12">
                                                                <ImageUploader
                                                                    withIcon={true}
                                                                    accept="accept=image/png, accept=image/jpg"
                                                                    withPreview={true}
                                                                    buttonText='Pilih Gambar Produk'
                                                                    onChange={async (e) => {

                                                                        let upload = await this.onDropPicture(e)
                                                                        if (upload) {
                                                                            this.state.gambarList.push(upload)
                                                                        }
                                                                    }}
                                                                    imgExtension={['.jpg', '.png']}
                                                                    maxFileSize={5242880}
                                                                />
                                                            </div>
                                                            {/* <div className="form-group col-md-12">
                                                                <label>Date of Creation</label>
                                                                <div className="controls">
                                                                    <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
                                                                </div>
                                                            </div> */}


                                                            <div className="form-group col-md-12">
                                                                <Label htmlFor="exampleSelect">Kategori</Label>
                                                                <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.setState({ kategori_id: e.target.value })}>
                                                                    <option>Pilih Kategori</option>
                                                                    {this.state.categories.map(c => (
                                                                        <option value={c.id}>{c.name}</option>
                                                                    ))}
                                                                </Input>
                                                            </div>

                                                            {/* <div className="form-group col-md-12">
                                                                <Label htmlFor="exampleFile">Product Image</Label>
                                                                <Input type="file" name="file" id="exampleFile" />
                                                            </div> */}



                                                            {/* <div className="form-group col-md-12">
                                                                <label htmlFor="inputname51">Quantity</label>
                                                                <input type="text" className="form-control" id="inputname51" placeholder="" />
                                                            </div> */}


                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputname411">Harga</label>
                                                                <input type="number" className="form-control" id="inputname411" placeholder="" onChange={(e) => this.setState({ harga: e.target.value })} />
                                                            </div>


                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputname411">Berat</label>
                                                                <input type="number" className="form-control" id="inputname411" placeholder="" onChange={(e) => this.setState({ berat: e.target.value })} />
                                                            </div>


                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputname4121">SKU</label>
                                                                <input type="text" className="form-control" id="inputname4121" placeholder="" onChange={(e) => this.setState({ sku: e.target.value })} />
                                                            </div>

                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputname4131">Stok</label>
                                                                <input type="number" className="form-control" id="inputname4131" placeholder="" onChange={(e) => this.setState({ stok: e.target.value })} />
                                                            </div>

                                                            {/* <div className="form-group col-md-12">
                                                                <label htmlFor="inputname4151">Vendor</label>
                                                                <input type="text" className="form-control" id="inputname4151" placeholder="" />
                                                            </div> */}

                                                            {/* <div className="form-group col-md-12">
                                                                <Label htmlFor="exampleText">Brief</Label>
                                                                <Input type="textarea" name="text" id="exampleText" />
                                                            </div> */}

                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Publish</button>
                                                    </form>

                                                </div>
                                            </div>

                                        </div>
                                    </section></div>





                            </div>







                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}

export default AddProduct;
