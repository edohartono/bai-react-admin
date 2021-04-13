import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Badge,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import { IDR_Format } from "../../../utils/Currency";
import { imageURL, imageURLTemp } from "../../../config";
import moment from "moment";
import ImageUploader from "react-images-upload";

export class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fetch: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.get("transactions")
      .then((res) => {
        //   alert(JSON.stringify(res.result.result));
        this.setState({ fetch: 1, data: res.result.result });
      })
      .catch(() => {
        this.setState({ fetch: 1 });
      });
  }

  render() {
    const { fetch, data, submit } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Transaksi</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body content-card">
                  <Row>
                    <Col md={12}>
                      <DataTable
                        title="Semua Transaksi"
                        data={data}
                        columns={[
                          {
                            name: "Order ID",
                            cell: (row) => (
                              <div className="d-flex justify-content-center flex-column">
                                <p className="text-center w-100">
                                  {row.order.invoice}
                                </p>
                                <Badge
                                  color={
                                    row.status === "V" ? "success" : "warning"
                                  }
                                >
                                  {row.status === "V"
                                    ? "Terverifikasi"
                                    : "Belum diverifikasi"}
                                </Badge>
                              </div>
                            ),
                          },
                          {
                            name: "Penjual",
                            cell: (row) => <div>{row.seller.company}</div>,
                          },
                          //   {
                          //     name: "Subtotal",
                          //     cell: (row) => (
                          //       <div>Rp. {IDR_Format(row.subtotal)}</div>
                          //     ),
                          //   },
                          //   {
                          //     name: "Pengiriman",
                          //     cell: (row) => (
                          //       <div>Rp. {IDR_Format(row.shipping)}</div>
                          //     ),
                          //   },
                          {
                            name: "Total",
                            cell: (row) => (
                              <div>
                                Rp. {IDR_Format(row.subtotal + row.shipping)}
                              </div>
                            ),
                          },

                          {
                            name: "Fee Order",
                            cell: (row) => (
                              <div className="text-center">
                                Rp. {IDR_Format(row.order_fee)}
                              </div>
                            ),
                          },
                          {
                            name: "Fee Pembayaran",
                            cell: (row) => (
                              <div>Rp. {IDR_Format(row.payment_fee)}</div>
                            ),
                          },
                          {
                            name: "Diterma Penjual",
                            cell: (row) => (
                              <div>Rp. {IDR_Format(row.seller_amount)}</div>
                            ),
                          },

                          {
                            name: "#",
                            minWidth: "100px",
                            cell: (row) => (
                              <div className="d-flex flex-column my-1 justify-content-around">
                                <Button
                                  className="my-1"
                                  disabled={submit}
                                  color="primary"
                                  size="sm"
                                >
                                  Lihat
                                </Button>
                                {row.status !== "V" && (
                                  <Button
                                    className="my-1"
                                    disabled={submit}
                                    color="warning"
                                    size="sm"
                                  >
                                    Edit
                                  </Button>
                                )}
                                {row.status !== "V" && (
                                  <Button
                                    className="my-1"
                                    disabled={submit}
                                    color="success"
                                    size="sm"
                                  >
                                    Verifikasi
                                  </Button>
                                )}
                              </div>
                            ),
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TransactionList;
