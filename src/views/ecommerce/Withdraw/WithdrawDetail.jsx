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

export class WithdrawDetail extends Component {
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
    API.get("withdraw/id", { id: this.state.id })
      .then((res) => {
        // alert(JSON.stringify(res.result.result));
        this.setState({ fetch: 1, data: res.result.result });
      })
      .catch(() => {
        this.setState({ fetch: 1 });
      });
  }

  updateTransaction() {
    Swal.fire({
      title: "Verifikasi Sudah Dibayar",
      text:
        "Apakah anda yakin akan verifikasi penarikan dana? Penarikan yg sudah ditandai selesai tidak dapat diubah",
      showCancelButton: true,
      confirmButtonColor: "green",
      showConfirmButton: true,
      denyButtonText: "Batal",
      icon: "question",
      confirmButtonText: "Verifikasi",
    }).then((res) => {
      if (res.isConfirmed) {
        API.patch("withdraw/approve", {
          id: this.state.data.id,
          status: "S",
        })
          .then(() => {
            Swal.fire("Penarikan berhasil diverifikasi", "", "success");
            this.getData();
          })
          .catch((err) => {
            Swal.fire(
              "Penarikan gagal diverifikasi",
              err.error.error_message ? err.error.error_message : "",
              "error"
            );
          });
      }
    });
  }

  render() {
    const { fetch, data, submit } = this.state;
    // return null;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Penarikan</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body content-card">
                  {fetch === 1 && (
                    <Row>
                      <Col md={6}>
                        <div className="detail-group">
                          <label>Penjual</label>
                          <p>{data.seller.company}</p>
                        </div>
                        <div className="detail-group">
                          <label>Tanggal</label>
                          <p>
                            {moment(data.created_at).format("DD MMMM YYYY")}
                          </p>
                        </div>

                        {data.status == "S" && (
                          <div className="detail-group">
                            <label>Tanggal Dikirim</label>
                            <p>
                              {moment(data.withdraw_date).format(
                                "DD MMMM YYYY"
                              )}
                            </p>
                          </div>
                        )}
                        <div className="detail-group">
                          <label className="d-block">Status</label>
                          {data.status === "P" && (
                            <p className="text-warning">Pending</p>
                          )}
                          {data.status === "S" && (
                            <p className="success">Selesai</p>
                          )}
                        </div>

                        {data.status == "P" && (
                          <div className="detail-group mt-3">
                            <label>Verifikasi</label>
                            <div className="d-flex">
                              <Button
                                color="success"
                                size="sm"
                                onClick={() => this.updateTransaction()}
                              >
                                Verifikasi Sudah Dibayar
                              </Button>
                            </div>
                          </div>
                        )}
                      </Col>
                      <Col md={6}>
                        <div className="detail-group">
                          <label className="d-block">Total</label>
                          <h4 className="text-success font-weight-bold">
                            Rp. {IDR_Format(data.amount)}
                          </h4>
                        </div>
                        <div className="detail-group">
                          <label className="d-block">Nama Rekening</label>
                          <p>{data.account_name}</p>
                        </div>
                        <div className="detail-group">
                          <label className="d-block">No Rekening</label>
                          <p className="font-weight-bold">
                            {data.account_number}
                          </p>
                        </div>
                        <div className="detail-group">
                          <label className="d-block">Bank</label>
                          <p>{data.bank_name}</p>
                        </div>
                      </Col>

                      <Col md={12} className="invoice-summary mt-2">
                        <div className="table-responsive">
                          <table className="table table-hover invoice-table">
                            <thead>
                              <tr>
                                <td>
                                  <h4>Order ID</h4>
                                </td>
                                <td className="text-center">
                                  <h4>Total Item</h4>
                                </td>
                                <td className="text-center">
                                  <h4>Pengiriman</h4>
                                </td>
                                <td className="text-right">
                                  <h4>Order Fee</h4>
                                </td>
                                <td className="text-right">
                                  <h4>Payment Fee</h4>
                                </td>
                                <td className="text-right">
                                  <h4>Total</h4>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(data.transactions) &&
                                data.transactions.map((item, i) => (
                                  <tr key={i}>
                                    <td>{item.order.invoice}</td>
                                    <td className="text-center">
                                      Rp. {IDR_Format(item.subtotal)}
                                    </td>
                                    <td className="text-center">
                                      Rp. {IDR_Format(item.shipping)}
                                    </td>
                                    <td className="text-right">
                                      Rp. {IDR_Format(item.order_fee)}
                                    </td>
                                    <td className="text-right">
                                      Rp. {IDR_Format(item.payment_fee)}
                                    </td>
                                    <td className="text-right font-weight-bold">
                                      Rp. {IDR_Format(item.seller_amount)}
                                    </td>
                                  </tr>
                                ))}

                              {/* <tr>
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
                              </tr> */}
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

export default WithdrawDetail;
