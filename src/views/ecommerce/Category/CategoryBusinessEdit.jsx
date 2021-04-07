import React from "react";
import { Row, Col, Label, Input } from "reactstrap";

import ImageUploader from "react-images-upload";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import queryString from "query-string";
import { imageURLTemp, imageURL } from "../../../config";

class CategoryBusinessEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      name: "",
      url: "",
      category: null,
      logoPreview: null,
      logoChange: false,
    };

    this.onDropPicture = this.onDropPicture.bind(this);
    this.submit = this.submit.bind(this);
    this.getData = this.getData.bind(this);
    this.setForm = this.setForm.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  async onDropPicture(picture) {
    if (picture.length === 0) return false;

    let upload = await API.upload(picture[0]);
    if ("fileUrl" in upload) {
      this.setForm("logo", upload.fileUrl);
      this.setState({
        logoChange: true,
        logoPreview: imageURLTemp + upload.fileUrl,
      });
    } else {
      Swal.fire({
        title: "Upload Gagal",
        icon: "warning",
        text: "Upload gambar gagal, silahkan coba lagi",
      });
      return false;
    }
  }

  onEdit() {
    if (!this.state.category.logo) {
      return Swal.fire(
        "Data Belum Lengkap",
        "Upload logo terlebih dahulu",
        "warning"
      );
    }
    let dataToUpdate = {
      id: this.state.category.id,
      name: this.state.category.name,
      url: this.state.category.url,
    };

    if (this.state.logoChange) dataToUpdate.logo = this.state.category.logo;
    API.patch("categories/business", dataToUpdate)
      .then(() => {
        Swal.fire({
          title: "Berhasil memperbarui kategori",
          text: "",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal memperbarui kategori",
          text: err.error.error_message ? err.error.error_message : "",
        });
      });
  }

  async componentDidMount() {
    this.getData();
  }

  setForm(key, value) {
    this.setState((prev) => ({
      category: {
        ...prev.category,
        [key]: value,
      },
    }));
  }

  getData() {
    let queryObj = queryString.parse(this.props.location.search) || {};
    if (!("id" in queryObj))
      return Swal.fire({
        title: "Kategori tidak ditemukan",
        icon: "error",
      });
    API.get("/categories/business/view", { id: queryObj.id }).then((res) => {
      this.setState({
        category: res.result.result,
        logoPreview: imageURL + res.result.result.logo,
      });
    });
  }

  async submit() {
    if (!this.state.logo) {
      return Swal.fire(
        "Data Belum Lengkap",
        "Upload logo terlebih dahulu",
        "warning"
      );
    }

    let submit = await API.post("categories/add", {
      name: this.state.name,
      logo: this.state.logo,
      url: this.state.url,
      type: "B",
    });

    if (submit.success) {
      Swal.fire("", "Data berhasil ditambahkan", "success");
      window.location.reload();
    } else {
      Swal.fire("Gagal menambahkan kategori", submit.error, "error");
    }
  }

  render() {
    const { fetch, category, logoPreview } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Bisnis Unit</h1>
                </div>
              </div>

              <div className="row margin-0">
                <div className="col-12">
                  <section className="box ">
                    <header className="panel_header">
                      <h2 className="title float-left">Edit Kategori</h2>
                    </header>
                    <div
                      className="content-body content-card"
                      id="category-business-edit"
                    >
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              this.onEdit();
                            }}
                          >
                            <div className="form-row">
                              <div className="form-group col-md-12">
                                <label htmlFor="inputname4">
                                  Nama Kategori
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputname4"
                                  placeholder=""
                                  required
                                  value={category ? category.name : ""}
                                  onChange={(e) =>
                                    this.setForm("name", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="inputname4211">URL</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputname4211"
                                  placeholder=""
                                  required
                                  value={category ? category.url : ""}
                                  onChange={(e) =>
                                    this.setForm("url", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <ImageUploader
                                  withIcon={true}
                                  singleImage={true}
                                  accept="accept=image/png, accept=image/jpg"
                                  withPreview={true}
                                  buttonText={`Ganti Logo Kategori`}
                                  onChange={async (e) => {
                                    this.onDropPicture(e);
                                  }}
                                  imgExtension={[".jpg", ".png"]}
                                  maxFileSize={5242880}
                                  singleImage={true}
                                  defaultImages={[
                                    logoPreview ? logoPreview : null,
                                  ]}
                                />
                              </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Perbarui Kategori
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

export default CategoryBusinessEdit;
