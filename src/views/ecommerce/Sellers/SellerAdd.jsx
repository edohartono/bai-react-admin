import React, { Component } from "react";
import { imageURL, imageURLResolver } from "../../../config";
import { Row, Col, Button, Input, Form } from "reactstrap";
import { API } from "../../../utils/Api";
import queryString from "query-string";
import Swal from "sweetalert2";
import moment from "moment";
import DataTable from "react-data-table-component";
import ImageUploader from "react-images-upload";

export class SellerAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      fetch: 0,
      provinceList: [],
      cityList: [],
      subdistrictList: [],
      submit: false,
    };

    this.setForm = this.setForm.bind(this);
    this.getProvince = this.getProvince.bind(this);
    this.getCity = this.getCity.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.getProvince();
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

  getSubdsitrict(cityId) {
    API.get("subdistrict", { city_id: cityId }).then((res) => {
      this.setState({ subdistrictList: res.result.result });
    });
  }

  setForm(key, value) {
    this.setState((prev) => ({
      data: {
        ...prev.data,
        [key]: value,
      },
    }));
  }

  submit() {
    this.setState({ submit: true });
    let data = this.state.data;
    API.post("seller/add", data)
      .then(() => {
        this.setState({ submit: false });

        Swal.fire("Berhasil menambah penjual", "", "success");
        this.props.history.goBack();
      })

      .catch((err) => {
        this.setState({ submit: false });

        Swal.fire(
          "Gagal menambah penjual",
          err.error && err.error.error_message ? err.error.error_message : "",
          "error"
        );
      });
  }

  render() {
    const {
      data,
      address,
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
                    <h1 className="title">Tambah Penjual</h1>
                  </div>
                </div>

                <Col md={12}>
                  <div className="content-body content-card" id="seller-single">
                    <>
                      <Row
                        style={{
                          borderBottom: "1px solid rgba(172,172,172,.3)",
                        }}
                      >
                        <Col md={5}>
                          <div className="form-group">
                            <label>Nama</label>
                            <Input
                              type="text"
                              value={data.name}
                              required
                              onChange={(e) =>
                                this.setForm("name", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>No HP</label>

                            <Input
                              type="tel"
                              required
                              value={data.phone}
                              onChange={(e) =>
                                this.setForm("phone", e.target.value)
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label>Jabatan</label>

                            <Input
                              type="text"
                              required
                              value={data.position}
                              onChange={(e) =>
                                this.setForm("position", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Email</label>

                            <Input
                              type="email"
                              required
                              value={data.email}
                              onChange={(e) =>
                                this.setForm("email", e.target.value)
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label>Password</label>
                            <Input
                              type="text"
                              required
                              value={data.password ? data.password : ""}
                              onChange={(e) =>
                                this.setForm("password", e.target.value)
                              }
                            />
                          </div>
                        </Col>

                        <Col md={7}>
                          <div className="form-group">
                            <label>Perusahaan</label>

                            <Input
                              type="text"
                              required
                              value={data.company}
                              onChange={(e) =>
                                this.setForm("company", e.target.value)
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label>Username</label>

                            <Input
                              type="text"
                              required
                              value={data.username}
                              onChange={(e) =>
                                this.setForm("username", e.target.value)
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label>Tipe Perusahaan</label>

                            <Input
                              type="select"
                              required
                              value={data.company_type}
                              onChange={(e) =>
                                this.setForm("company_type", e.target.value)
                              }
                            >
                              <option value="">Pilih Tipe Perusahaan</option>
                              <option value="PKP">PKP</option>
                              <option value="Non PKP">Non PKP</option>
                            </Input>
                          </div>

                          <div className="form-group">
                            <label>Alamat</label>

                            <Input
                              type="textarea"
                              required
                              value={data.address}
                              onChange={(e) =>
                                this.setForm("address", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label>Provinsi</label>
                            <Input
                              type="select"
                              value={data.province_id}
                              required
                              onChange={(e) => {
                                // this.setForm("active", e.target.value)
                                this.setForm("province_id", e.target.value);
                                this.setForm("city_id", null);
                                this.setForm("subdistrict_id", null);
                                let idx = provinceList.findIndex(
                                  (v) => v.province_id === e.target.value
                                );
                                this.setForm(
                                  "province",
                                  provinceList[idx].province
                                );
                                this.getCity(e.target.value);
                              }}
                            >
                              <option value="">Pilih Provinsi</option>
                              {Array.isArray(provinceList) &&
                                provinceList.map((p, i) => (
                                  <option value={p.province_id} key={i}>
                                    {p.province}
                                  </option>
                                ))}
                            </Input>
                          </div>

                          <div className="form-group">
                            <label>Kota</label>
                            <Input
                              type="select"
                              value={data.city_id}
                              required
                              onChange={(e) => {
                                this.setForm("city_id", e.target.value);
                                this.setForm("subdistrict_id", null);
                                let idx = cityList.findIndex(
                                  (v) => v.city_id === e.target.value
                                );
                                this.setForm("city", cityList[idx].city_name);
                                this.getSubdsitrict(e.target.value);
                              }}
                            >
                              <option value="">Pilih Kota</option>
                              {Array.isArray(cityList) &&
                                cityList.map((p, i) => (
                                  <option value={p.city_id} key={i}>
                                    {p.type} {p.city_name}
                                  </option>
                                ))}
                            </Input>
                          </div>

                          <div className="form-group">
                            <label>Kecamatan</label>
                            <Input
                              type="select"
                              value={data.subdistrict_id}
                              required
                              onChange={(e) => {
                                this.setForm("subdistrict_id", e.target.value);
                                let idx = subdistrictList.findIndex(
                                  (v) => v.subdistrict_id === e.target.value
                                );
                                this.setForm(
                                  "subdistrict",
                                  subdistrictList[idx].subdistrict_name
                                );
                              }}
                            >
                              <option value="">Pilih Kecamatan</option>
                              {Array.isArray(subdistrictList) &&
                                subdistrictList.map((p, i) => (
                                  <option value={p.subdistrict_id} key={i}>
                                    {p.subdistrict_name}
                                  </option>
                                ))}
                            </Input>
                          </div>
                          {/* 
                          <div className="form-group">
                            <label>Aksi</label>
                            <div>
                              {data.active === "Y" && (
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.disabledata(data)}
                                >
                                  Nonaktifkan Customer
                                </Button>
                              )}

                              {data.active === "N" && (
                                <Button
                                  size="sm"
                                  color="success"
                                  onClick={() => this.activatedata(data)}
                                >
                                  Aktifkan Customer
                                </Button>
                              )}

                              {data.email_verified === "N" && (
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={() => this.verifyEmail(data)}
                                >
                                  Verifikasi Email
                                </Button>
                              )}
                            </div>
                          </div> */}

                          <div className="form-group d-flex justify-content-end">
                            <Button
                              color="success"
                              type="submit"
                              //   onClick={() => this.submit()}
                            >
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </>
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

export default SellerAdd;
