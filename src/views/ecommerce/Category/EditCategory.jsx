import React from 'react';
import {
    Row, Col, Label, Input,
} from 'reactstrap';
import { API } from '../../../utils/Api'
import Swal from 'sweetalert2'
import ImageUploader from 'react-images-upload';
import { imageURL } from '../../../config';
//import InputMask from 'react-input-mask';

//import 'react-datepicker/dist/react-datepicker.css';
//import DatePicker from 'react-datepicker';
//import moment from 'moment';

class EditCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: null
        };

        this.onDropPicture = this.onDropPicture.bind(this)
    }

    async onDropPicture(picture) {
        let upload = await API.upload(picture[0])
        if ('fileUrl' in upload) {
            this.setState({ logo: upload.fileUrl })
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

    async componentDidMount() {
        // console.log(this.props)
        // alert(this.props.location.search.substring(1))
        let category = await API.get(`categories`, { id: this.props.location.search.substring(1) })
        // console.log(category)
        if (category.success) {
            this.setState({
                category: category.result.data[0]
            })
        }
    }

    async submit() {
        if (!this.state.logo) {
            return Swal.fire('Data Belum Lengkap', 'Upload logo terlebih dahulu', 'warning')
        }

        let submit = await API.patch('categories', {
            name: this.state.category.name,
            logo: this.state.category.logo,
            url: this.state.category.url,
            type: 'B'
        })

        if (submit.success) {
            Swal.fire('Data berhasil diperbarui', '', 'success')
        }

        else {
            Swal.fire('Gagal menambahkan kategori', submit.error, 'error')
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
                                    <h1 className="title">KATEGORI BISNIS UNIT</h1>
                                </div>
                            </div>

                            {this.state.category &&
                                <div className="row margin-0">
                                    <div className="col-12">
                                        <section className="box ">
                                            <header className="panel_header">
                                                <h2 className="title float-left">Edit Kategori</h2>

                                            </header>
                                            <div className="content-body">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">

                                                        <form>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-12">
                                                                    <label htmlFor="inputname4">Nama Kategori</label>
                                                                    <input type="text" className="form-control" id="inputname4" placeholder="" value={this.state.category.name} />
                                                                </div>


                                                                <div className="form-group col-md-12">
                                                                    <label htmlFor="inputname4211">Url</label>
                                                                    <input type="text" className="form-control" id="inputname4211" placeholder="" value={this.state.category.url} />
                                                                </div>

                                                                <div className="form-group col-md-12">
                                                                    <ImageUploader
                                                                        withIcon={true}
                                                                        singleImage={true}
                                                                        accept="accept=image/png, accept=image/jpg"
                                                                        withPreview={true}
                                                                        defaultValue={[imageURL + this.state.category.logo]}
                                                                        buttonText='Pilih Logo Kategori'
                                                                        onChange={async (e) => {

                                                                            this.onDropPicture(e)
                                                                        }}

                                                                        imgExtension={['.jpg', '.png']}
                                                                        maxFileSize={5242880}

                                                                    />
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary">Save</button>
                                                        </form>

                                                    </div>
                                                </div>

                                            </div>
                                        </section></div>





                                </div>
                            }






                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}

export default EditCategory;
