import React, { Component } from "react";
import { imageURL, imageURLResolver } from "../../../config";
import { Row, Col, Button, Input } from "reactstrap";
import { API } from "../../../utils/Api";
import queryString from "query-string";
import Swal from "sweetalert2";
import moment from "moment";
import DataTable from "react-data-table-component";
import ImageUploader from "react-images-upload";

export class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      fetch: 0,
      address: [],
      flgEditImage: false,
    };

    this.getData = this.getData.bind(this);
    this.onDropPicture = this.onDropPicture.bind(this);
    this.activateUser = this.activateUser.bind(this);
    this.disableUser = this.disableUser.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  componentDidMount() {
    // alert(JSON.stringify(queryObj));
    this.getData();
  }

  getData() {
    let queryObj = queryString.parse(this.props.location.search) || {};
    if (!("id" in queryObj)) {
      return Swal.fire({
        title: "Error",
        text: "Customer tidak ditemukan",
      });
    }
    API.get(`customer/id`, { id: queryObj.id }).then((res) => {
      //   alert(JSON.stringify(res.result));
      this.setState({
        user: res.result.result,
      });
    });

    API.get("address/user/id", { id: queryObj.id }).then((res) => {
      this.setState({
        address: res.result.result,
      });
    });
  }

  onDropPicture(pictures) {
    API.upload(pictures[0]).then((res) => {
      this.setState((prev) => ({
        flgEditImage: true,
        user: {
          ...prev.user,
          display_picture: res.fileUrl,
        },
      }));
    });
  }

  activateUser(item) {
    Swal.fire({
      title: `Aktifkan ${item.name}?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Aktifkan",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.value) {
        API.patch("customer/update", {
          id: item.id,
          data: {
            active: "Y",
          },
        })
          .then(() => {
            Swal.fire({
              title: "Berhasil mengaktifkan customer",
              icon: "success",
            });

            this.getData();
          })
          .catch(() => {
            Swal.fire({
              title: "Gagal mengaktifkan customer",
              icon: "error",
            });
          });
      }
    });
  }

  verifyEmail(item) {
    Swal.fire({
      title: `Verifikasi ${item.email}?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Verifikasi",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.value) {
        API.patch("customer/update", {
          id: item.id,
          data: {
            email_verified: "Y",
          },
        })
          .then(() => {
            Swal.fire({
              title: "Berhasil verifikasi email",
              icon: "success",
            });

            this.getData();
          })
          .catch(() => {
            Swal.fire({
              title: "Gagal verifikasi email",
              icon: "error",
            });
          });
      }
    });
  }

  disableUser(item) {
    Swal.fire({
      title: `Nonaktifkan ${item.name}?`,
      text:
        "Setelah dinonaktifkan, Customer tidak bisa login pada website. Apakah anda yakin?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Nonaktifkan",
    }).then((result) => {
      if (result.value) {
        API.patch("customer/update", {
          id: item.id,
          data: {
            active: "N",
          },
        })
          .then(() => {
            Swal.fire({
              title: "Berhasil menonaktifkan customer",
              icon: "success",
            });

            this.getData();
          })
          .catch(() => {
            Swal.fire({
              title: "Gagal menonaktifkan customer",
              icon: "error",
            });
          });
      }
    });
  }

  render() {
    const { user, address, fetch } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Detail Customer</h1>
                </div>
              </div>

              <Col md={12}>
                <div className="content-body content-card" id="seller-single">
                  {user && (
                    <>
                      <Row
                        style={{
                          borderBottom: "1px solid rgba(172,172,172,.3)",
                        }}
                      >
                        <Col md={5}>
                          <div className="form-group">
                            <label>Nama</label>
                            <p>{user.name}</p>
                          </div>
                          <div className="form-group">
                            <label>No HP</label>
                            <p>{user.phone}</p>
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <p>
                              {user.email} (
                              {user.email_verified === "Y"
                                ? "Terverifikasi"
                                : "Belum diverifikasi"}
                              )
                            </p>
                          </div>

                          <div className="form-group">
                            <label>Password</label>
                            <Input type="text" disabled value={user.password} />
                          </div>
                          <div className="form-group">
                            <label>Bergabung</label>
                            <p>
                              {moment(user.created_at).format("D MMMM YYYY")}
                            </p>
                          </div>
                        </Col>

                        <Col md={7}>
                          <div className="form-group">
                            <label>Foto Profil</label>
                            <div className="row d-flex flex-row">
                              <Col md={3}>
                                <img
                                  src={imageURLResolver(
                                    user.display_picture,
                                    this.state.flgEditImage ? "tmp" : "public"
                                  )}
                                  width="100%"
                                />
                              </Col>

                              <Col md={9}>
                                {/* <ImageUploader
                                  withIcon={false}
                                  buttonText="Ganti foto"
                                  onChange={this.onDropPicture}
                                  imgExtension={[
                                    ".jpg",
                                    ".jpeg",
                                    ".gif",
                                    ".png",
                                    ".gif",
                                  ]}
                                  maxFileSize={5242880}
                                /> */}
                              </Col>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Status</label>
                            {user.active == "Y" && (
                              <p className="text-success">Aktif</p>
                            )}
                            {user.active == "N" && (
                              <p className="text-dark">Tidak Aktif</p>
                            )}
                          </div>

                          <div className="form-group">
                            <label>Aksi</label>
                            <div>
                              {user.active === "Y" && (
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.disableUser(user)}
                                >
                                  Nonaktifkan Customer
                                </Button>
                              )}

                              {user.active === "N" && (
                                <Button
                                  size="sm"
                                  color="success"
                                  onClick={() => this.activateUser(user)}
                                >
                                  Aktifkan Customer
                                </Button>
                              )}

                              {user.email_verified === "N" && (
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={() => this.verifyEmail(user)}
                                >
                                  Verifikasi Email
                                </Button>
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        <Col md={12}>
                          <Row>
                            <DataTable
                              title="Alamat"
                              data={address}
                              columns={[
                                {
                                  name: "Nama",
                                  selector: "receiver",
                                },
                                {
                                  name: "No HP",
                                  selector: "phone",
                                },
                                {
                                  name: "Alamat",
                                  selector: "address",
                                },
                                {
                                  name: "Kecamatan",
                                  selector: "subdistrict",
                                },
                                {
                                  name: "Kota",
                                  selector: "city",
                                },
                                {
                                  name: "Provinsi",
                                  selector: "province",
                                },
                                {
                                  name: "Kode Pos",
                                  selector: "postal_code",
                                },
                              ]}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UserDetail;
