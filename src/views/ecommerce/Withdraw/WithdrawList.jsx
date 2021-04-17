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

export class WithdrawList extends Component {
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
    API.get("withdraw", { status: "P" })
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
                  <h1 className="title">Penarikan Dana</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body content-card">
                  <Row>
                    <Col md={12}>
                      <DataTable
                        title="Permintaan Penarikan"
                        data={data}
                        columns={[
                          {
                            name: "Tanggal",
                            cell: (row) => (
                              <div>
                                {moment(row.created_at).format("DD-MM-YYYY")}
                              </div>
                            ),
                          },

                          {
                            name: "Penjual",
                            cell: (row) => (
                              <div className="font-weight-bold">
                                {row.seller[0].company}
                              </div>
                            ),
                          },

                          {
                            name: "Total",
                            cell: (row) => (
                              <div className="font-weight-bold">
                                Rp. {IDR_Format(row.amount)}
                              </div>
                            ),
                          },

                          {
                            name: "Transaksi",
                            cell: (row) => (
                              <div>{row.transactions.length} transaksi</div>
                            ),
                          },

                          {
                            name: "Rekening",
                            cell: (row) => (
                              <div className="mt-3">
                                <p className="text-center mb-2 pb-0">
                                  {row.account_name}
                                </p>
                                <p className="text-center mt-2 mb-0 pb-0">
                                  {row.bank_name}
                                </p>
                                <p className="text-center font-weight-bold mt-2 pt-0">
                                  {row.account_number}
                                </p>
                              </div>
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
                                  onClick={() =>
                                    this.props.history.push(
                                      "detail?id=" + row.id
                                    )
                                  }
                                >
                                  Lihat
                                </Button>
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

export default WithdrawList;
