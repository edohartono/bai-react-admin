import React, { Component } from "react";
import { Row, Col, Badge } from "reactstrap";
import DataTable from "react-data-table-component";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import { IDR_Format } from "../../../utils/Currency";
import { imageURL } from "../../../config";
import moment from "moment";

export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "Order ID", selector: "invoice" },
        {
          name: "Total",
          cell: (row) => (
            <div className="font-weight-bold">
              Rp. {IDR_Format(row.payments.payment_data.gross_amount)}
            </div>
          ),
        },
        {
          name: "Tanggal",
          cell: (row) => (
            <div className="font-weight-bold">
              {moment(row.created_at).format("D MMMM YYYY")}
            </div>
          ),
        },
        {
          name: "Penjual",
          cell: (row) => (
            <div className="d-flex flex-row my-3 align-content-center align-items-center">
              <img
                src={imageURL + row.seller_dp}
                width="40em"
                height="40em"
                style={{ borderRadius: "50%" }}
              />{" "}
              <h6 className="ml-3">{row.seller_name}</h6>
            </div>
          ),
        },
        {
          name: "Pembeli",
          cell: (row) => (
            <div className="d-flex flex-row my-3 align-content-center align-items-center">
              <img
                src={imageURL + row.user_dp}
                width="40em"
                height="40em"
                style={{ borderRadius: "50%" }}
              />{" "}
              <h6 className="ml-3">{row.user_name}</h6>
            </div>
          ),
        },

        {
          name: "Status",
          cell: (row) => (
            <div>
              {row.status === "W" && (
                <Badge color="dark">Menunggu Pembayaran</Badge>
              )}
              {row.status === "C" && (
                <Badge color="primary">Pembayaran Diterima</Badge>
              )}
              {row.status === "E" ||
                (row.status === "N" && (
                  <Badge color="danger">
                    {row.status === "E" ? "Expired" : "Penjual Tidak Merespon"}
                  </Badge>
                ))}
              {row.status === "P" && (
                <Badge color="primary">Menunggu Pengiriman</Badge>
              )}
              {row.status === "S" && (
                <Badge color="primary">Dalam Pengiriman</Badge>
              )}
              {row.status === "A" && (
                <Badge color="primary">Sampai Tujuan</Badge>
              )}
              {row.status === "F" && (
                <Badge color="danger">Penjual tidak mengirim pesanan</Badge>
              )}
            </div>
          ),
        },

        {
          name: "Pengiriman",
          width: "20em",
          cell: (row) => (
            <div>
              Dari{" "}
              <strong>
                {row.seller_city}, {row.seller_province}
              </strong>{" "}
              ke{" "}
              <strong>
                {row.city}, {row.province}
              </strong>
            </div>
          ),
        },
      ],

      products: [],
    };
  }

  componentDidMount() {
    API.get("order/all", { type: "U" })
      .then((res) => {
        this.setState({ products: res.result.result });
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal mengambil order",
          text: err.error.error_message ? err.error.error_message : "",
          icon: "error",
        });
      });
  }

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Semua Order</h1>
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

                    <div className="col-md-4 col-sm-4 col-4 d-none">
                      {/* <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Sort By</option>
                          <option>Latest</option>
                          <option>Most viewed</option>
                          <option>Most Rated</option>
                          <option>Trending</option>
                        </Input>
                      </FormGroup> */}
                    </div>

                    <div className="col-md-2 col-sm-3 col-4 d-none">
                      <button type="button" className="btn btn-primary">
                        Search
                      </button>
                    </div>

                    <div className="clearfix"></div>
                    <br />

                    <div className="col-lg-12 search_data">
                      <Row>
                        <Col sm="12">
                          <DataTable
                            title="Semua Order"
                            columns={this.state.columns}
                            data={this.state.products}
                          />
                        </Col>
                      </Row>
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

export default OrderList;
