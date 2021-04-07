import React from "react";
import { Row, Col, Label, Input } from "reactstrap";

import ImageUploader from "react-images-upload";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import queryString from "query-string";
import { imageURLTemp, imageURL } from "../../../config";

class CategoryBusinessLandingEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      logoPreview: null,
      logoChange: false,
      bannerPreview: null,
      bannerChanged: false,
    };

    this.onDropPicture = this.onDropPicture.bind(this);
    this.submit = this.submit.bind(this);
    this.getData = this.getData.bind(this);
    this.setForm = this.setForm.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.setFormObj = this.setFormObj.bind(this);
  }

  async onDropPicture(picture) {
    if (picture.length === 0) return false;

    let upload = await API.upload(picture[0]);
    if ("fileUrl" in upload) {
      this.setForm("display_image", upload.fileUrl);
      this.setState({
        bannerChanged: true,
        bannerPreview: imageURLTemp + upload.fileUrl,
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
    let category = this.state.category;
    category.featured_text = JSON.stringify(category.featured_text);
    if (!category.display_image) {
      return Swal.fire(
        "Data Belum Lengkap",
        "Upload Banner terlebih dahulu",
        "warning"
      );
    }
    let dataToUpdate = {
      id: category.category_id,
      description: category.description,
      featured_title: category.featured_title,
      featured_text: category.featured_text,
      display_text: category.display_text,
    };

    if (this.state.bannerChanged)
      dataToUpdate.display_image = category.display_image;
    API.patch("categories/business/detail", dataToUpdate)
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
    API.get("categories/business/view", { id: queryObj.id }).then((res) => {
      if (Array.isArray(res.result.result.details)) {
        res.result.result.details[0].featured_text = JSON.parse(
          res.result.result.details[0].featured_text
        );
        this.setState({
          category: res.result.result.details[0],
          bannerPreview: imageURL + res.result.result.details[0].display_image,
        });
      }
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

  setFormObj(key, i, value) {
    let existingFeatured = this.state.category.featured_text;
    existingFeatured[i][key] = value;

    this.setState((prev) => ({
      category: {
        ...prev.category,
        featured_text: existingFeatured,
      },
    }));
  }

  render() {
    const { fetch, category, bannerPreview, logoPreview } = this.state;
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
                      <h2 className="title float-left">
                        Edit Halaman Kategori
                      </h2>
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
                                <label htmlFor="inputname4">Deskripsi</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputname4"
                                  placeholder=""
                                  required
                                  value={category ? category.description : ""}
                                  onChange={(e) =>
                                    this.setForm("description", e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <ImageUploader
                                  withIcon={true}
                                  singleImage={true}
                                  accept="accept=image/png, accept=image/jpg"
                                  withPreview={true}
                                  buttonText={`Ganti Banner`}
                                  onChange={async (e) => {
                                    this.onDropPicture(e);
                                  }}
                                  imgExtension={[".jpg", ".png"]}
                                  maxFileSize={5242880}
                                  singleImage={true}
                                  defaultImages={[
                                    bannerPreview ? bannerPreview : null,
                                  ]}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="inputname4">Judul Fitur</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputname4"
                                  placeholder=""
                                  required
                                  value={
                                    category ? category.featured_title : ""
                                  }
                                  onChange={(e) =>
                                    this.setForm(
                                      "featured_title",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {category &&
                                Array.isArray(category.featured_text) &&
                                category.featured_text.map((featured, i) => {
                                  return (
                                    <>
                                      <div className="form-group col-md-12">
                                        <label htmlFor="inputname4">
                                          Title Fitur {i + 1}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="inputname4"
                                          placeholder=""
                                          required
                                          value={featured.title}
                                          onChange={(e) =>
                                            this.setFormObj(
                                              "title",
                                              i,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-md-12">
                                        <label htmlFor="inputname4">
                                          Deskripsi Fitur {i + 1}
                                        </label>
                                        <textarea
                                          type="text"
                                          className="form-control"
                                          id="inputname4"
                                          placeholder=""
                                          required
                                          value={featured.subtitle}
                                          onChange={(e) =>
                                            this.setFormObj(
                                              "subtitle",
                                              i,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </>
                                  );
                                })}
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

export default CategoryBusinessLandingEdit;
