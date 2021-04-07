import React, { Component } from "react";
import { imageURL } from "../../../config";
import { Row, Col, Button } from "reactstrap";
import { API } from "../../../utils/Api";
import queryString from "query-string";
import Swal from "sweetalert2";
import moment from "moment";

export class SellerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seller: null,
      fetch: 0,
    };

    this.getData = this.getData.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.verifyDocument = this.verifyDocument.bind(this);
    this.rejectDocument = this.rejectDocument.bind(this);
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
        text: "Penjual tidak ditemukan",
      });
    }
    API.get(`seller/id/${queryObj.id}`).then((res) => {
      //   alert(JSON.stringify(res.result));
      this.setState({
        seller: res.result.result,
      });
    });
  }

  updateDocument(key, value) {
    API.patch("seller/update", {
      id: this.state.seller.id,
      data: {
        [key]: value,
      },
    })
      .then(() => {
        this.getData();
        Swal.fire({
          title: "Berhasil memperbarui penjual",
          text: "",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal memperbarui penjual",
          text: err.error.error_message ? err.error.error_message : "",
          icon: "error",
        });
      });
  }

  verifyDocument(key, value) {
    Swal.fire({
      title: "Verifikasi dokumen",
      text: "Apakah anda yakin ingin verifikasi dokumen penjual?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Verifikasi",
      cancelButtonText: "Batal",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.value) {
        this.updateDocument(key, value);
      }
    });
  }

  rejectDocument(key, value) {
    Swal.fire({
      title: "Tolak dokumen",
      text: "Apakah anda yakin ingin menolak/reject dokumen penjual?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Verifikasi",
      cancelButtonText: "Batal",
      confirmButtonColor: "warning",
    }).then((result) => {
      if (result.value) {
        this.updateDocument(key, value);
      }
    });
  }

  render() {
    const { seller, fetch } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Detail Penjual</h1>
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
                        <Col md={4}>
                          <div className="form-group">
                            <label>Nama PIC</label>
                            <p>{seller.name}</p>
                          </div>
                          <div className="form-group">
                            <label>No HP PIC</label>
                            <p>{seller.phone}</p>
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <p>
                              {seller.email} (
                              {seller.email_verified === "Y"
                                ? "Terverifikasi"
                                : "Belum diverifikasi"}
                              )
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Alamat</label>
                            <p>
                              {seller.address} {seller.subdistrict},{" "}
                              {seller.city}, {seller.province}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Bergabung</label>
                            <p>
                              {moment(seller.created_at).format("D MMMM YYYY")}
                            </p>
                          </div>
                        </Col>
                        <Col md={7}>
                          <div className="form-group">
                            <label>Nama Perusahaan</label>
                            <p>{seller.company}</p>
                          </div>
                          <div className="form-group">
                            <label>Profil Perusahaan</label>
                            <p>
                              {seller.company_profile
                                ? seller.company_profile
                                : "Profil perusahaan belum diisi"}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Username</label>
                            <p>{seller.username}</p>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        <Col md={12}>
                          <h4 className="font-weight-bold mb-2">
                            Kelengkapan Dokumen
                          </h4>
                        </Col>

                        <Col md={12}>
                          <Row>
                            <Col md={4}>
                              <h5 className="font-weight-bold mt-3">KTP</h5>
                            </Col>

                            <Col md={8} className="pt-3">
                              {seller.ktp_status === "N" && (
                                <p style={{ fontStyle: "italic" }}>
                                  Penjual belum mengunggah KTP
                                </p>
                              )}

                              {seller.ktp_status === "W" && (
                                <>
                                  <p>
                                    <i className="fa fa-question-circle text-dark mr-1"></i>
                                    KTP menunggu verifikasi
                                  </p>
                                  <div>
                                    <Button
                                      size="sm"
                                      color="success"
                                      onClick={() =>
                                        this.verifyDocument("ktp_status", "V")
                                      }
                                    >
                                      Verifikasi
                                    </Button>
                                    <Button
                                      size="sm"
                                      color="danger"
                                      onClick={() =>
                                        this.rejectDocument("ktp_status", "R")
                                      }
                                    >
                                      Tolak
                                    </Button>
                                  </div>
                                </>
                              )}

                              {seller.ktp_status === "V" && (
                                <>
                                  <p>
                                    <i className="fa fa-check-circle text-success mr-1"></i>
                                    KTP sudah terverifikasi
                                  </p>
                                </>
                              )}
                              {seller.ktp && (
                                <img
                                  style={{ maxWidth: "80%" }}
                                  src={imageURL + seller.ktp}
                                />
                              )}
                            </Col>
                            <Col md={4}>
                              <h5 className="font-weight-bold mt-3">SIUP</h5>
                            </Col>

                            <Col md={8} className="pt-3">
                              {seller.siup_status === "N" && (
                                <p style={{ fontStyle: "italic" }}>
                                  Penjual belum mengunggah SIUP
                                </p>
                              )}

                              {seller.siup_status === "V" && (
                                <>
                                  <p>
                                    <i className="fa fa-check-circle text-success mr-1"></i>
                                    SIUP sudah terverifikasi
                                  </p>
                                </>
                              )}
                              {seller.siup_status === "W" && (
                                <>
                                  <p>
                                    <i className="fa fa-question-circle text-dark mr-1"></i>
                                    SIUP menunggu verifikasi
                                  </p>
                                  <div>
                                    <Button
                                      size="sm"
                                      color="success"
                                      onClick={() =>
                                        this.verifyDocument("siup_status", "V")
                                      }
                                    >
                                      Verifikasi
                                    </Button>
                                    <Button
                                      size="sm"
                                      color="danger"
                                      onClick={() =>
                                        this.rejectDocument("siup_status", "R")
                                      }
                                    >
                                      Tolak
                                    </Button>
                                  </div>
                                </>
                              )}
                              {seller.siup && (
                                <img
                                  style={{ maxWidth: "80%" }}
                                  src={imageURL + seller.siup}
                                />
                              )}
                            </Col>

                            <Col md={4}>
                              <h5 className="font-weight-bold mt-3">NPWP</h5>
                            </Col>

                            <Col md={8} className="pt-3">
                              {seller.npwp_status === "N" && (
                                <p style={{ fontStyle: "italic" }}>
                                  Penjual belum mengunggah NPWP
                                </p>
                              )}

                              {seller.npwp_status === "V" && (
                                <>
                                  <p>
                                    <i className="fa fa-check-circle text-success mr-1"></i>
                                    NPWP sudah terverifikasi
                                  </p>
                                </>
                              )}
                              {seller.npwp_status === "R" && (
                                <>
                                  <p>
                                    <i className="fa fa-times-circle text-danger mr-1"></i>
                                    NPWP ditolak
                                  </p>
                                </>
                              )}
                              {seller.npwp_status === "W" && (
                                <>
                                  <p>
                                    <i className="fa fa-question-circle text-dark mr-1"></i>
                                    NPWP menunggu verifikasi
                                  </p>
                                  <div>
                                    <Button
                                      size="sm"
                                      color="success"
                                      onClick={() =>
                                        this.verifyDocument("npwp_status", "V")
                                      }
                                    >
                                      Verifikasi
                                    </Button>
                                    <Button
                                      size="sm"
                                      color="danger"
                                      onClick={() =>
                                        this.rejectDocument("npwp_status", "R")
                                      }
                                    >
                                      Tolak
                                    </Button>
                                  </div>
                                </>
                              )}
                              {seller.npwp && (
                                <img
                                  style={{ maxWidth: "80%" }}
                                  src={imageURL + seller.npwp}
                                />
                              )}
                            </Col>
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

export default SellerDetail;
