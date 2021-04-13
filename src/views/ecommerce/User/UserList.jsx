import React, { Component } from "react";
import { imageURL } from "../../../config";
import { API } from "../../../utils/Api";
import { Row, Col, Button } from "reactstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],

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
          name: "No HP",
          selector: "phone",
        },
        {
          name: "Status",
          cell: (row) => (
            <div>
              {row.active === "Y" && <p className="text-success">Aktif</p>}

              {row.active === "N" && <p className="text-dark">Tidak Aktif</p>}
              {row.active === "B" && <p className="text-danger">Dibanned</p>}
            </div>
          ),
        },
        {
          name: "Bergabung",
          cell: (row) => (
            <div>{moment(row.created_at).format("D MMMM YYYY")}</div>
          ),
        },

        {
          name: "#",
          cell: (row) => (
            <div className="d-flex flex-column my-1">
              <Button
                className="btn-corner my-1"
                size="sm"
                color="primary"
                onClick={() => {
                  this.props.history.push(`/customer/view?id=${row.id}`);
                }}
              >
                Lihat
              </Button>
              <Button
                className="btn-corner my-1"
                size="sm"
                color="warning"
                onClick={() => {
                  this.props.history.push(`/customer/edit?id=${row.id}`);
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
                    this.disableUser(row);
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
                    this.activateUser(row);
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

    this.disableUser = this.disableUser.bind(this);
    this.activateUser = this.activateUser.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.get("customer/all").then((res) => {
      this.setState({
        customers: res.result.result,
      });
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
    const { customers, fetch } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Semua Customer</h1>
                </div>
              </div>

              <Col md={12}>
                <div className="content-body content-card" id="customer-list">
                  <DataTable
                    title="Semua Customer"
                    columns={this.state.columns}
                    data={customers}
                  />
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UserList;
