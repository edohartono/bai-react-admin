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

import classnames from "classnames";

//import PerfectScrollbar from 'perfect-scrollbar';

import { ProductList } from "components";

import { search } from "variables/ecommerce/product.jsx";
import { API } from "../../../utils/Api";
import { imageURL } from "../../../config";
import { IDR_Format } from "../../../utils/Currency";
import DataTable from "react-data-table-component";
//var ps;

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      products: [],
      submit: false,
      filter: {
        search: "",
        limit: 10000,
        offset: 0,
        active: "",
        type: "U",
      },
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
              {row.active === "N" && (
                <Badge color="warning">Menunggu Verifikasi</Badge>
              )}
              {row.active === "B" && <Badge color="danger">Banned</Badge>}
            </>
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
                  this.props.history.push(`/product/view?id=${row.id}`);
                }}
              >
                Lihat
              </Button>
              {row.active !== "B" && (
                <Button
                  className="btn-corner my-1"
                  size="sm"
                  color="danger"
                  onClick={() => this.update(row.id, "B")}
                  disabled={this.state.submit}
                >
                  Banned
                </Button>
              )}
              {row.active === "N" && (
                <Button
                  className="btn-corner my-1"
                  size="sm"
                  color="warning"
                  onClick={() => this.update(row.id, "Y")}
                  disabled={this.state.submit}
                >
                  Verifikasi
                </Button>
              )}
              {row.active === "B" && (
                <Button
                  className="btn-corner my-1"
                  size="sm"
                  color="success"
                  onClick={() => this.update(row.id, "Y")}
                  disabled={this.state.submit}
                >
                  Unbanned
                </Button>
              )}
            </div>
          ),
        },
      ],
    };

    this.update = this.update.bind(this);
    this.getData = this.getData.bind(this);
    this.setFilter = this.setFilter.bind(this);
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
    API.get("products/all", this.state.filter).then((res) => {
      this.setState({ products: res.result.result.products });
    });
  }

  setFilter(key, value) {
    this.setState(
      (prev) => ({
        filter: {
          ...prev.filter,
          [key]: value,
        },
      }),
      () => this.getData()
    );
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
                              <Col sm={12}>
                                <Row>
                                  <div className="col-md-4 col-sm-4 col-4">
                                    <FormGroup>
                                      <Input
                                        type="select"
                                        name="select"
                                        id="exampleSelect"
                                        onChange={(e) =>
                                          this.setFilter(
                                            "active",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="">Semua Status</option>
                                        <option value="Y">Aktif</option>
                                        <option value="N">Moderasi</option>
                                        <option value="B">Banned</option>
                                      </Input>
                                    </FormGroup>
                                  </div>
                                  <div className="col-md-4 col-sm-4 col-4">
                                    <FormGroup>
                                      <Input
                                        type="text"
                                        name="search"
                                        id="exampleSelect"
                                        placeholder="Cari Produk"
                                        onChange={(e) =>
                                          this.setFilter(
                                            "search",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </FormGroup>
                                  </div>

                                  <div className="col-md-2 col-sm-3 col-4">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => this.getData()}
                                    >
                                      Search
                                    </button>
                                  </div>
                                </Row>
                              </Col>
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

export default Product;
