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
} from "reactstrap";

import { API } from "../../../utils/Api";
import { imageURL } from "../../../config";
import { IDR_Format } from "../../../utils/Currency";
import DataTable from "react-data-table-component";
//var ps;

class BusinessProduct extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      products: [],
      submit: false,
      columns: [
        {
          name: "Nama Produk",
          width: "30%",
          cell: (row) => (
            <div className="d-flex flex-row my-3 align-content-center align-items-center">
              <img
                src={imageURL + row.images[0]}
                width="60em"
                height="60em"
                style={{ borderRadius: "50%" }}
              />{" "}
              <h5 className="ml-3">{row.name}</h5>
            </div>
          ),
        },
        {
          name: "Kategori",
          selector: "category",
        },
        {
          name: "Penjual",
          selector: "company",
        },
        {
          name: "Harga",
          cell: (row) => (
            <div>
              <div className="font-weight-bold">
                IDR {IDR_Format(row.price)}
              </div>
            </div>
          ),
        },
        {
          name: "Status",
          cell: (row) => (
            <>
              {row.active === "Y" && <Badge color="success">Aktif</Badge>}
              {row.active === "N" && <Badge color="dark">Tidak Aktif</Badge>}
              {/* {row.active === "N" && (
                <Badge color="warning">Menunggu Verifikasi</Badge>
              )} */}
              {/* {row.active === "B" && <Badge color="danger">Banned</Badge>} */}
            </>
          ),
        },
        {
          name: "#",
          cell: (row) => (
            <div className="d-flex flex-column w-100 my-1">
              <Button
                className="btn-corner my-1 w-100"
                size="sm"
                color="primary"
                onClick={() => {
                  this.props.history.push(`/product/view?id=${row.id}`);
                }}
              >
                Lihat
              </Button>
              <Button
                className="btn-corner my-1 w-100"
                size="sm"
                color="warning"
                onClick={() => {
                  this.props.history.push(`/bisnis-edit-produk?id=${row.id}`);
                }}
              >
                Edit
              </Button>
              {row.active !== "N" && (
                <Button
                  className="btn-corner my-1 w-100"
                  size="sm"
                  color="danger"
                  onClick={() => this.update(row.id, "N")}
                  disabled={this.state.submit}
                >
                  Nonaktifkan
                </Button>
              )}
              {row.active === "N" && (
                <Button
                  className="btn-corner my-1 w-100"
                  size="sm"
                  color="success"
                  onClick={() => this.update(row.id, "Y")}
                  disabled={this.state.submit}
                >
                  Aktifkan
                </Button>
              )}
              {/* {row.active === "B" && (
                <Button
                  className="btn-corner my-1"
                  size="sm"
                  color="success"
                  onClick={() => this.update(row.id, "Y")}
                  disabled={this.state.submit}
                >
                  Unbanned
                </Button>
              )} */}
            </div>
          ),
        },
      ],
    };

    this.update = this.update.bind(this);
    this.getData = this.getData.bind(this);
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
    API.patch("product", {
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
    API.get("products/all", { type: "B" }).then((res) => {
      this.setState({ products: res.result.result.products });
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
                  <h1 className="title">Produk</h1>
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

                    <div className="clearfix"></div>
                    <br />

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
                              <Col sm="12">
                                <DataTable
                                  title="Semua Produk"
                                  columns={this.state.columns}
                                  data={this.state.products}
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

export default BusinessProduct;
