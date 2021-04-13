import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Badge,
  Col,
  FormGroup,
  Button,
  Input,
  Form,
} from "reactstrap";

import classnames from "classnames";

//import PerfectScrollbar from 'perfect-scrollbar';

import { ProductList } from "components";

import { search } from "variables/ecommerce/product.jsx";
import { API } from "../../../utils/Api";
import { imageURL } from "../../../config";
import { IDR_Format } from "../../../utils/Currency";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import moment from "moment";
//var ps;

class SellerList extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      sellers: [],
      submit: false,
      filter: {
        limit: 10,
        offset: 0,
        search: "",
      },
      columns: [
        {
          name: "Nama Penjual",
          width: "25%",
          cell: (row) => (
            <div className="d-flex flex-row my-3 align-content-start align-items-start w-100">
              <img
                src={imageURL + row.display_picture}
                width="60em"
                height="60em"
                style={{ borderRadius: "50%" }}
              />{" "}
              <h5 className="ml-3">{row.name}</h5>
            </div>
          ),
        },
        {
          name: "Email",
          selector: "email",
        },
        {
          name: "Perusahaan",
          selector: "company",
        },
        {
          name: "No HP",
          selector: "phone",
        },
        {
          name: "Bergabung",
          cell: (row) => (
            <div>{moment(row.created_at).format("D MMMM YYYY")}</div>
          ),
        },
        {
          name: "Status",
          width: "10%",
          cell: (row) => (
            <div className="d-flex justify-content-center w-100">
              {row.active === "Y" && <Badge color="success">Aktif</Badge>}
              {row.active === "N" && <Badge color="dark">Tidak Aktif</Badge>}
            </div>
          ),
        },
        {
          name: "SIUP",
          width: "5em",
          cell: (row) => {
            let color = {
              V: {
                class: "text-success",
                text: "Terverifikasi",
                icon: "check-square",
              },
              N: {
                class: "text-dark",
                text: "Dokumen belum diupload",
                icon: "times-rectangle",
              },
              R: {
                class: "text-danger",
                text: "Dokumen ditolak",
                icon: "times-rectangle",
              },
              W: {
                class: "text-warning",
                text: "Menunggu verifikasi",
                icon: "question-circle",
              },
            };

            return (
              <div className="justify-content-center d-flex w-100">
                <i
                  style={{ fontSize: "1.5em" }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={color[row.siup_status].text}
                  className={`fa fa-${color[row.siup_status].icon} ${
                    color[row.siup_status].class
                  }`}
                  aria-hidden="true"
                ></i>
              </div>
            );
          },
        },
        {
          name: "NPWP",
          width: "5em",
          cell: (row) => {
            let color = {
              V: {
                class: "text-success",
                text: "Terverifikasi",
                icon: "check-square",
              },
              N: {
                class: "text-dark",
                text: "Dokumen belum diupload",
                icon: "times-rectangle",
              },
              R: {
                class: "text-danger",
                text: "Dokumen ditolak",
                icon: "times-rectangle",
              },
              W: {
                class: "text-warning",
                text: "Menunggu verifikasi",
                icon: "question-circle",
              },
            };

            return (
              <div className="justify-content-center d-flex w-100">
                <i
                  style={{ fontSize: "1.5em" }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={color[row.npwp_status].text}
                  className={`fa fa-${color[row.npwp_status].icon} ${
                    color[row.npwp_status].class
                  }`}
                  aria-hidden="true"
                ></i>
              </div>
            );
          },
        },
        {
          name: "KTP",
          width: "5em",
          cell: (row) => {
            let color = {
              V: {
                class: "text-success",
                text: "Terverifikasi",
                icon: "check-square",
              },
              N: {
                class: "text-dark",
                text: "Dokumen belum diupload",
                icon: "times-rectangle",
              },
              R: {
                class: "text-danger",
                text: "Dokumen ditolak",
                icon: "times-rectangle",
              },
              W: {
                class: "text-warning",
                text: "Menunggu verifikasi",
                icon: "question-circle",
              },
            };

            return (
              <div className="justify-content-center d-flex w-100">
                <i
                  style={{ fontSize: "1.5em" }}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={color[row.ktp_status].text}
                  className={`fa fa-${color[row.ktp_status].icon} ${
                    color[row.ktp_status].class
                  }`}
                  aria-hidden="true"
                ></i>
              </div>
            );
          },
        },
        {
          name: "#",
          // width: "25em",
          cell: (row) => (
            <div className="d-flex flex-column my-1">
              <Button
                className="btn-corner my-1"
                size="sm"
                color="primary"
                onClick={() => {
                  this.props.history.push(`/seller/view?id=${row.id}`);
                }}
              >
                Lihat
              </Button>
              <Button
                className="btn-corner my-1"
                size="sm"
                color="warning"
                onClick={() => {
                  this.props.history.push(`/seller/edit?id=${row.id}`);
                }}
              >
                Edit
              </Button>
              {row.active === "Y" && (
                <Button
                  className="btn-corner my-1"
                  size="sm"
                  color="danger"
                  onClick={() => {
                    // this.props.history.push(`/seller/edit?id=${row.id}`);
                    this.disableSeller(row);
                  }}
                >
                  Nonaktif
                </Button>
              )}
              {row.active === "N" && (
                <Button
                  className="btn-corner my-1"
                  size="sm"
                  color="success"
                  onClick={() => {
                    // this.props.history.push(`/seller/edit?id=${row.id}`);
                    this.activateSeller(row);
                  }}
                >
                  Aktifkan
                </Button>
              )}
            </div>
          ),
        },
      ],
    };

    this.update = this.update.bind(this);
    this.getData = this.getData.bind(this);
    this.disableSeller = this.disableSeller.bind(this);
    this.activateSeller = this.activateSeller.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  async componentDidMount() {
    this.getData();
  }
  update(id, active) {
    this.setState({ submit: true });
    API.patch("seller", {
      id: id,
      data: {
        active: active,
      },
    })
      .then((res) => {
        if (res.success) {
          this.getData();
        }

        this.setState({ submit: false });
      })
      .catch(() => this.setState({ submit: false }));
  }

  async getData() {
    API.get("seller/all", this.state.filter)
      .then((res) => {
        this.setState({ sellers: res.result.result });
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal",
          text: err.error.error_message ? err.error.error_message : "",
        });
      });
  }

  onSearch(value) {
    this.setState(
      (prev) => ({
        filter: {
          ...prev.filter,
          search: value,
        },
      }),
      () => this.getData()
    );
  }

  activateSeller(item) {
    Swal.fire({
      title: `Aktifkan ${item.company}?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Aktifkan",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.value) {
        API.patch("seller/update", {
          id: item.id,
          data: {
            active: "Y",
          },
        })
          .then(() => {
            Swal.fire({
              title: "Berhasil mengaktifkan penjual",
              icon: "success",
            });

            this.getData();
          })
          .catch(() => {
            Swal.fire({
              title: "Gagal mengaktifkan penjual",
              icon: "error",
            });
          });
      }
    });
  }

  disableSeller(item) {
    Swal.fire({
      title: `Nonaktifkan ${item.company}?`,
      text:
        "Setelah dinonaktifkan, penjual tidak bisa bertransaksi dan produk penjual tidak tampil di website. Apakah anda yakin?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Nonaktifkan",
    }).then((result) => {
      if (result.value) {
        API.patch("seller/update", {
          id: item.id,
          data: {
            active: "N",
          },
        })
          .then(() => {
            Swal.fire({
              title: "Berhasil menonaktifkan penjual",
              icon: "success",
            });

            this.getData();
          })
          .catch(() => {
            Swal.fire({
              title: "Gagal menonaktifkan penjual",
              icon: "error",
            });
          });
      }
    });
  }

  render() {
    // return null;
    const { sellers } = this.state;
    return (
      <div>
        <div className="content" id="seller-list">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Penjual</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body">
                  <div className="row">
                    <div className="col-md-6 col-sm-5 col-4 d-none">
                      {/* <div className="input-group primary">
                                                <input type="text" className="form-control search-page-input" placeholder="Enter your search" />
                                            </div> */}
                    </div>

                    {/* <div className="col-md-4 col-sm-4 col-4 d-block">
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Sort By</option>
                          <option>Latest</option>
                          <option>Most viewed</option>
                          <option>Most Rated</option>
                          <option>Trending</option>
                        </Input>
                      </FormGroup>
                    </div>

                    <div className="col-md-2 col-sm-3 col-4 d-block">
                      <button type="button" className="btn btn-primary">
                        Search
                      </button>
                    </div> */}
                    {/* 
                    <div className="clearfix"></div>
                    <br /> */}

                    <div className="col-lg-12 search_data">
                      <div>
                        <Nav
                          tabs
                          className="left-aligned col-lg-12 col-xl-12 col-md-12 col-12"
                        ></Nav>

                        <TabContent
                          activeTab={this.state.activeTab}
                          className="col-lg-12 col-xl-12 col-12"
                        >
                          <TabPane tabId="1">
                            <Row>
                              <Col sm={6}>
                                <Form
                                  className="d-flex flex-row"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    this.onSearch(this.state.filter.search);
                                  }}
                                >
                                  <Input
                                    type="text"
                                    placeholder="Cari penjual..."
                                    onChange={(e) =>
                                      this.onSearch(e.target.value)
                                    }
                                  />
                                  <Button type="submit" color="primary">
                                    Cari
                                  </Button>
                                </Form>
                              </Col>

                              <Col sm={6}>
                                <Button
                                  color="primary"
                                  onClick={() => {
                                    this.props.history.push("/seller/add");
                                  }}
                                >
                                  Tambah Penjual
                                </Button>
                              </Col>
                              <Col sm="12" className="mt-2">
                                <DataTable
                                  title="Semua Penjual"
                                  columns={this.state.columns}
                                  data={this.state.sellers}
                                />
                              </Col>
                            </Row>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default SellerList;
