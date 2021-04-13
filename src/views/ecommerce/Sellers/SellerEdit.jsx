import React, { Component } from "react";
import { imageURL } from "../../../config";
import { Row, Col, Button, Input, Form } from "reactstrap";
import { API } from "../../../utils/Api";
import queryString from "query-string";
import Swal from "sweetalert2";
import moment from "moment";

export class SellerEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seller: null,
      submit: false,
      fetch: 0,
      provinceList: [],
      cityList: [],
      subdistrictList: [],
    };

    this.getData = this.getData.bind(this);
    this.setForm = this.setForm.bind(this);
    this.getProvince = this.getProvince.bind(this);
    this.getCity = this.getCity.bind(this);
    this.getSubdistrict = this.getSubdistrict.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    // alert(JSON.stringify(queryObj));
    this.getData();
  }

  setForm(key, value) {
    this.setState((prev) => ({
      seller: {
        ...prev.seller,
        [key]: value,
      },
    }));
  }

  getData() {
    let queryObj = queryString.parse(this.props.location.search) || {};
    if (!("id" in queryObj)) {
      return Swal.fire({
        title: "Error",
        text: "Penjual tidak ditemukan",
      });
    }
    API.get(`seller/id/${queryObj.id}`).then((res) => {
      this.getProvince();
      this.getCity(res.result.result.province_id);
      this.getSubdistrict(res.result.result.city_id);
      this.setState({
        seller: res.result.result,
      });
    });
  }

  getProvince() {
    API.get("province").then((res) => {
      this.setState({ provinceList: res.result.result });
    });
  }

  getCity(provinceId) {
    API.get("city", { province_id: provinceId }).then((res) => {
      this.setState({ cityList: res.result.result });
    });
  }
  getSubdistrict(cityId) {
    API.get("subdistrict", { city_id: cityId }).then((res) => {
      this.setState({ subdistrictList: res.result.result });
    });
  }

  submit() {
    this.setState({ submit: true });
    API.patch("seller/update", {
      id: this.state.seller.id,
      data: this.state.seller,
    })
      .then((res) => {
        Swal.fire({
          title: "Berhasil",
          text: "Data penjual berhasil diperbarui",
          icon: "success",
        });
        this.setState({ submit: false });
      })

      .catch((err) => {
        Swal.fire({
          title: "Gagal",
          text: err.error.error_message || "",
          icon: "error",
        });
        this.setState({ submit: false });
      });
  }

  //   updateDocument(key, value) {
  //     API.patch("seller/update", {
  //       id: this.state.seller.id,
  //       data: {
  //         [key]: value,
  //       },
  //     })
  //       .then(() => {
  //         this.getData();
  //         Swal.fire({
  //           title: "Berhasil memperbarui penjual",
  //           text: "",
  //           icon: "success",
  //         });
  //       })
  //       .catch((err) => {
  //         Swal.fire({
  //           title: "Gagal memperbarui penjual",
  //           text: err.error.error_message ? err.error.error_message : "",
  //           icon: "error",
  //         });
  //       });
  //   }

  //   verifyDocument(key, value) {
  //     Swal.fire({
  //       title: "Verifikasi dokumen",
  //       text: "Apakah anda yakin ingin verifikasi dokumen penjual?",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonText: "Verifikasi",
  //       cancelButtonText: "Batal",
  //       confirmButtonColor: "green",
  //     }).then((result) => {
  //       if (result.value) {
  //         this.updateDocument(key, value);
  //       }
  //     });
  //   }

  //   rejectDocument(key, value) {
  //     Swal.fire({
  //       title: "Tolak dokumen",
  //       text: "Apakah anda yakin ingin menolak/reject dokumen penjual?",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonText: "Verifikasi",
  //       cancelButtonText: "Batal",
  //       confirmButtonColor: "warning",
  //     }).then((result) => {
  //       if (result.value) {
  //         this.updateDocument(key, value);
  //       }
  //     });
  //   }

  render() {
    const {
      seller,
      fetch,
      provinceList,
      cityList,
      subdistrictList,
    } = this.state;
    return (
      <div>
        <div className="content">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              this.submit();
            }}
          >
            <Row>
              <Col xs={12} md={12}>
                <div className="page-title">
                  <div className="float-left">
                    <h1 className="title">Edit Penjual</h1>
                  </div>
                </div>

                <Col md={12}>
                  <div className="content-body content-card" id="seller-single">
                    {seller && (
                      <>
                        <Row
                          style={{
                            borderBottom: "1px solid rgba(172,172,172,.3)",
                          }}
                        >
                          <Col md={6}>
                            <div className="form-group">
                              <label>Nama PIC</label>
                              <Input
                                type="text"
                                onChange={(e) =>
                                  this.setForm("name", e.target.value)
                                }
                                required
                                value={seller.name}
                              />
                            </div>
                            <div className="form-group">
                              <label>Jabatan</label>
                              <Input
                                type="text"
                                required
                                onChange={(e) =>
                                  this.setForm("position", e.target.value)
                                }
                                value={seller.position}
                              />
                            </div>
                            <div className="form-group">
                              <label>No HP PIC</label>
                              <Input
                                required
                                type="tel"
                                onChange={(e) =>
                                  this.setForm("phone", e.target.value)
                                }
                                value={seller.phone}
                              />
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <Input
                                type="email"
                                required
                                onChange={(e) =>
                                  this.setForm("email", e.target.value)
                                }
                                value={seller.email}
                              />
                            </div>
                            <div className="form-group">
                              <label>Password</label>
                              <Input
                                type="text"
                                disabled
                                value={seller.password}
                              />
                            </div>
                            <div className="form-group">
                              <label>Buat Password Baru</label>
                              <Input
                                type="text"
                                onChange={(e) =>
                                  this.setForm("new_password", e.target.value)
                                }
                                value={seller.new_password}
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>Nama Perusahaan</label>
                              <Input
                                type="text"
                                onChange={(e) =>
                                  this.setForm("company", e.target.value)
                                }
                                value={seller.company}
                              />
                            </div>
                            <div className="form-group">
                              <label>Username</label>
                              <Input
                                type="text"
                                onChange={(e) =>
                                  this.setForm("username", e.target.value)
                                }
                                value={seller.username}
                              />
                            </div>
                            <div className="form-group">
                              <label>Profil Perusahaan</label>
                              <Input
                                type="textarea"
                                onChange={(e) =>
                                  this.setForm(
                                    "company_profile",
                                    e.target.value
                                  )
                                }
                                value={seller.company_profile}
                              />
                            </div>
                            <div className="form-group">
                              <label>Alamat</label>
                              <Input
                                type="textarea"
                                onChange={(e) =>
                                  this.setForm("address", e.target.value)
                                }
                                value={seller.address}
                              />
                            </div>

                            <div className="form-group row">
                              <Col md={6}>
                                <label>Provinsi</label>
                                <Input
                                  type="select"
                                  onChange={(e) => {
                                    this.setForm("province_id", e.target.value);
                                    let iProvince = this.state.provinceList.findIndex(
                                      (v) => v.province_id == e.target.value
                                    );
                                    this.setForm(
                                      "province",
                                      this.state.provinceList[iProvince]
                                        .province
                                    );
                                    this.setForm("city_id", "");
                                    this.setForm("city", "");
                                    this.setForm("subdistrict_id", "");
                                    this.setForm("subdistrict", "");
                                    this.getCity(e.target.value);
                                  }}
                                  value={seller.province_id}
                                >
                                  <option name="">Pilih Provinsi</option>
                                  {Array.isArray(provinceList) &&
                                    provinceList.map((p) => (
                                      <option
                                        value={p.province_id}
                                        key={p.province_id}
                                      >
                                        {p.province}
                                      </option>
                                    ))}
                                </Input>
                              </Col>
                              <Col md={6}>
                                <label>Kota</label>
                                <Input
                                  type="select"
                                  onChange={(e) => {
                                    this.setForm("city_id", e.target.value);
                                    let iCity = this.state.cityList.findIndex(
                                      (v) => v.city_id == e.target.value
                                    );
                                    this.setForm(
                                      "city",
                                      this.state.cityList[iCity].city_name
                                    );
                                    this.setForm("subdistrict_id", "");
                                    this.setForm("subdistrict", "");
                                    this.getSubdistrict(e.target.value);
                                  }}
                                  value={seller.city_id}
                                >
                                  <option name="">Pilih Kota</option>
                                  {Array.isArray(cityList) &&
                                    cityList.map((p) => (
                                      <option value={p.city_id} key={p.city_id}>
                                        {p.city_name}
                                      </option>
                                    ))}
                                </Input>
                              </Col>
                            </div>
                            <div className="form-group row">
                              <Col md={6}>
                                <label>Kecamatan</label>
                                <Input
                                  type="select"
                                  onChange={(e) => {
                                    this.setForm(
                                      "subdistrict_id",
                                      e.target.value
                                    );
                                    let iSubdistrict = this.state.subdistrictList.findIndex(
                                      (v) => v.subdistrict_id == e.target.value
                                    );
                                    this.setForm(
                                      "subdistrict",
                                      this.state.subdistrictList[iSubdistrict]
                                        .subdistrict_name
                                    );
                                  }}
                                  value={seller.subdistrict_id}
                                >
                                  <option name="">Pilih Kecamatan</option>
                                  {Array.isArray(subdistrictList) &&
                                    subdistrictList.map((p) => (
                                      <option
                                        value={p.subdistrict_id}
                                        key={p.subdistrict_id}
                                      >
                                        {p.subdistrict_name}
                                      </option>
                                    ))}
                                </Input>
                              </Col>
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-2 mt-4">
                          <Col md={12} className="justify-content-end d-flex">
                            <Button
                              type="button"
                              color="light"
                              onClick={() => this.props.navigation.pop()}
                              disabled={this.state.submit}
                            >
                              Batal
                            </Button>

                            <Button
                              type="submit"
                              color="warning"
                              disabled={this.state.submit}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                </Col>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default SellerEdit;
