import React from "react";
import { Row, Col, Label, Input } from "reactstrap";

//import InputMask from 'react-input-mask';
import queryString from "query-string";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { API } from "../../../utils/Api";
import ImageUploader from "react-images-upload";
import Swal from "sweetalert2";
import { imageURL, imageURLTemp } from "../../../config";

class BusinessProductEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      categories: [],
      gambarList: [],
      product: null,
      flgEditImage: false,
      submit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDropPicture = this.onDropPicture.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.setForm = this.setForm.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  setForm(key, value) {
    this.setState((prev) => ({
      product: {
        ...prev.product,
        [key]: value,
      },
    }));
  }

  async onDropPicture(picture) {
    let upload = await API.upload(picture[0]);
    if ("fileUrl" in upload) {
      //   this.state.gambarList.push(upload.fileUrl);
      this.setState((prev) => ({
        flgEditImage: true,
        product: {
          ...prev.product,
          images: [upload.fileUrl],
        },
      }));
    } else {
      Swal.fire({
        title: "Upload Gagal",
        icon: "warning",
        text: "Upload gambar gagal, silahkan coba lagi",
      });
      return false;
    }
  }

  componentDidMount = async () => {
    let params = queryString.parse(this.props.location.search) || {};

    if (!("id" in params))
      return Swal.fire("Produk tidak ditemukan", "", "error");

    API.get("product/id", { id: params.id }).then((res) => {
      //   alert(JSON.stringify(res.result.result));
      this.setState({ product: res.result.result });
    });
    API.get("categories/business/all", { type: "B" }).then((res) => {
      this.setState({ categories: res.result.result });
    });
  };
  getProduct(url) {
    return API.get("products", { url: url }).then((res) => {
      return res;
    });
  }

  onSubmit = async () => {
    let payload = JSON.parse(JSON.stringify(this.state.product));
    this.setState({ submit: true });

    delete payload.id;

    if (this.state.flgEditImage === false) {
      delete payload.images;
    }
    await API.patch("product/business", {
      id: this.state.product.id,
      data: payload,
    })
      .then((res) => {
        Swal.fire({
          title: "Produk Berhasil Ditambahkan",
          icon: "success",
        });
        this.setState({ submit: false });
        return this.props.history.goBack();
      })
      .catch((err) => {
        Swal.fire({
          title: "Produk gagal ditambahkan",
          icon: "error",
          text: err.error.error_message ? err.error.error_message : "",
        });

        this.setState({ submit: false });
      });
  };

  render() {
    let { product, flgEditImage } = this.state;
    if (!product) return null;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Edit Produk</h1>
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
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              this.onSubmit();
                            }}
                          >
                            <div className="form-row">
                              <div className="form-group col-md-12">
                                <label htmlFor="inputname4">Nama Produk</label>
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="inputname4"
                                  placeholder=""
                                  value={product.name}
                                  onChange={(e) =>
                                    this.setForm("name", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="inputname74">Deskripsi</label>
                                <input
                                  type="textarea"
                                  className="form-control"
                                  id="inputname74"
                                  placeholder=""
                                  value={product.description}
                                  onChange={(e) =>
                                    this.setForm("description", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <img
                                  src={
                                    flgEditImage
                                      ? imageURLTemp + product.images[0]
                                      : imageURL + product.images[0]
                                  }
                                />
                                <ImageUploader
                                  withIcon={false}
                                  accept="accept=image/png, accept=image/jpg"
                                  withPreview={false}
                                  buttonText="Ganti Gambar"
                                  onChange={async (e) => {
                                    this.onDropPicture(e);
                                  }}
                                  imgExtension={[".jpg", ".png"]}
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
                                <Input
                                  type="select"
                                  name="select"
                                  id="exampleSelect"
                                  value={product.category_id}
                                  onChange={(e) =>
                                    this.setForm("category_id", e.target.value)
                                  }
                                >
                                  <option>Pilih Kategori</option>
                                  {this.state.categories.map((c) => (
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
                                <input
                                  type="number"
                                  className="form-control"
                                  id="inputname411"
                                  value={product.price}
                                  placeholder=""
                                  onChange={(e) =>
                                    this.setForm("price", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="inputname411">Berat</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="inputname411"
                                  placeholder=""
                                  value={product.weight}
                                  onChange={(e) =>
                                    this.setForm("weight", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="inputname4121">SKU</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputname4121"
                                  placeholder=""
                                  value={product.sku}
                                  onChange={(e) =>
                                    this.setForm("sku", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="inputname4131">Stok</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="inputname4131"
                                  placeholder=""
                                  value={product.stok}
                                  onChange={(e) =>
                                    this.setForm("stok", e.target.value)
                                  }
                                />
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
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={this.state.submit}
                            >
                              Perbarui
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default BusinessProductEdit;
