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
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import { IDR_Format } from "../../../utils/Currency";
import { imageURL, imageURLTemp } from "../../../config";
import moment from "moment";
import ImageUploader from "react-images-upload";
import queryString from "query-string";

export class TransactionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      data: {},
      fetch: 0,
    };

    this.updateTransaction = this.updateTransaction.bind(this);
  }

  UNSAFE_componentWillMount() {
    let queryObj = queryString.parse(this.props.location.search) || {};

    if (typeof queryObj !== "object" || !("id" in queryObj)) {
      Swal.fire("Transaksi tidak ditemukan", "", "warning");
      return false;
    }
    // alert(JSON.stringify(queryObj));
    this.setState({ id: queryObj.id });
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.get("transactions", { id: this.state.id })
      .then((res) => {
        // alert(JSON.stringify(res.result.result));
        this.setState({ fetch: 1, data: res.result.result });
      })
      .catch(() => {
        this.setState({ fetch: 1 });
      });
  }

  updateTransaction(title, message) {
    Swal.fire({
      title: title,
      message: message,
      showCancelButton: true,
      confirmButtonColor: "green",
      showConfirmButton: true,
      denyButtonText: "Batal",
      icon: "question",
      confirmButtonText: "Verifikasi",
    }).then((res) => {
      if (res.isConfirmed) {
        API.patch("transaction/update", {
          id: this.state.id,
          data: { status: "V" },
        })
          .then(() => {
            Swal.fire("Transaksi berhasil diverifikasi", "", "success");
            this.getData();
          })
          .catch((err) => {
            Swal.fire(
              "Transaksi gagal diverifikasi",
              err.error.error_message ? err.error.error_message : "",
              "error"
            );
          });
      }
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
                  <h1 className="title">Detail Transaksi</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body content-card">
                  {fetch === 1 && (
                    <Row>
                      <Col md={6}>
                        <div className="detail-group">
                          <label>Order ID</label>
                          <p>{data.order.invoice}</p>
                        </div>
                        <div className="detail-group">
                          <label>Penjual</label>
                          <p>{data.seller.company}</p>
                        </div>
                        <div className="detail-group">
                          <label>Customer</label>
                          <p>{data.customer.name}</p>
                        </div>
                        <div className="detail-group">
                          <label>Tanggal Dibuat</label>
                          <p>
                            {moment(data.order.created_at).format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="detail-group">
                          <label>Dikirim ke</label>
                          <p>
                            {data.order.address}, {data.order.subdistrict}
                            <br />
                            {data.order.city}, {data.order.province}
                          </p>
                        </div>
                        <div className="detail-group">
                          <label>No Resi</label>
                          <p>{data.order.awb ? data.order.awb : "-"}</p>
                        </div>
                        <div className="detail-group">
                          <label className="d-block">Status</label>
                          {data.status === "W" && (
                            <Badge color="dark">Menunggu Verifikasi</Badge>
                          )}
                          {data.status === "V" && (
                            <Badge color="success">Terverifikasi</Badge>
                          )}
                        </div>
                        {data.status === "W" && (
                          <div className="detail-group my-3">
                            <Button
                              color="success"
                              size="sm"
                              onClick={() => {
                                this.updateTransaction(
                                  "Verifikasi Transaksi",
                                  "Apakah anda yakin akan verifikasi transaksi?"
                                );
                              }}
                            >
                              Verifikasi
                            </Button>
                          </div>
                        )}
                      </Col>

                      <Col md={12} className="invoice-summary">
                        <div className="table-responsive">
                          <table className="table table-hover invoice-table">
                            <thead>
                              <tr>
                                <td>
                                  <h4>Produk</h4>
                                </td>
                                <td className="text-center">
                                  <h4>Harga</h4>
                                </td>
                                <td className="text-center">
                                  <h4>Jumlah</h4>
                                </td>
                                <td className="text-right">
                                  <h4>Total</h4>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {data.items.map((item, i) => (
                                <tr key={i}>
                                  <td>{item.name}</td>
                                  <td className="text-center">
                                    Rp. {IDR_Format(item.price)}
                                  </td>
                                  <td className="text-center">
                                    {item.quantity}
                                  </td>
                                  <td className="text-right">
                                    Rp. {IDR_Format(item.price * item.quantity)}
                                  </td>
                                </tr>
                              ))}

                              <tr>
                                <td className="thick-line"></td>
                                <td className="thick-line"></td>
                                <td className="thick-line text-center">
                                  <h4>Subtotal</h4>
                                </td>
                                <td className="thick-line text-right">
                                  <h4>Rp. {IDR_Format(data.subtotal)}</h4>
                                </td>
                              </tr>
                              <tr>
                                <td className="no-line"></td>
                                <td className="no-line"></td>
                                <td className="no-line text-center">
                                  <h4>Pengiriman</h4>
                                </td>
                                <td className="no-line text-right">
                                  <h4>Rp. {IDR_Format(data.shipping)}</h4>
                                </td>
                              </tr>
                              <tr>
                                <td className="no-line"></td>
                                <td className="no-line"></td>
                                <td className="no-line text-center">
                                  <h4>Total</h4>
                                </td>
                                <td className="no-line text-right">
                                  <h4>
                                    Rp.{" "}
                                    {IDR_Format(data.shipping + data.subtotal)}
                                  </h4>
                                </td>
                              </tr>
                              <tr>
                                <td className="no-line"></td>
                                <td className="no-line"></td>
                                <td className="no-line text-center">
                                  <h4>Fee Order</h4>
                                </td>
                                <td className="no-line text-right">
                                  <h4>Rp. {IDR_Format(data.order_fee)}</h4>
                                </td>
                              </tr>
                              <tr>
                                <td className="no-line"></td>
                                <td className="no-line"></td>
                                <td className="no-line text-center">
                                  <h4>Fee Pembayaran</h4>
                                </td>
                                <td className="no-line text-right">
                                  <h4>Rp. {IDR_Format(data.payment_fee)}</h4>
                                </td>
                              </tr>
                              <tr>
                                <td className="no-line"></td>
                                <td className="no-line"></td>
                                <td className="no-line text-center">
                                  <h4>Dibayarkan ke Penjual</h4>
                                </td>
                                <td className="no-line text-right">
                                  <h3
                                    style={{ margin: 0 }}
                                    className="text-primary"
                                  >
                                    Rp. {IDR_Format(data.seller_amount)}
                                  </h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Col>
                    </Row>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TransactionDetail;
