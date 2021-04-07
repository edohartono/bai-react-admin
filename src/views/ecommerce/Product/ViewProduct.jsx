import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import queryString from "query-string";
import { API } from "../../../utils/Api";
import { imageURL } from "../../../config";

class ViewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      product: false,
      submit: false,
    };

    this.getData = this.getData.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  UNSAFE_componentWillMount() {
    let queryStr = queryString.parse(this.props.location.search) || {};
    if ("id" in queryStr) this.setState({ id: queryStr.id });
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ submit: true });
    API.get(`product/id`, { id: this.state.id })
      .then((res) => {
        this.setState({ product: res.result.result, submit: false });
      })
      .catch(() => this.setState({ submit: false }));
  }

  editProduct(active) {
    API.patch("product", {
      id: this.state.product.id,
      data: {
        active: active,
      },
    }).then((res) => {
      if (res.success) {
        this.getData();
      }
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Detail Produk</h1>
                </div>
              </div>

              <Col md={12}>
                <div className="content-body content-card" id="product-single">
                  {this.state.product && (
                    <>
                      <Row>
                        <Col md={5}>
                          <div className="img-responsive">
                            <img
                              src={
                                Array.isArray(product.images)
                                  ? imageURL + product.images[0]
                                  : null
                              }
                            />
                          </div>

                          {this.state.product &&
                            this.state.product.seller_id !== 1 && (
                              <div className="btn-actions">
                                {product.active === "N" && (
                                  <Button
                                    className="btn-corner"
                                    size="sm"
                                    color="warning"
                                    onClick={() => this.editProduct("Y")}
                                    disabled={this.state.submit}
                                  >
                                    Verifikasi Produk
                                  </Button>
                                )}
                                {product.active !== "B" && (
                                  <Button
                                    className="btn-corner"
                                    size="sm"
                                    color="danger"
                                    onClick={() => this.editProduct("B")}
                                    disabled={this.state.submit}
                                  >
                                    Banned Produk
                                  </Button>
                                )}
                                {product.active === "B" && (
                                  <Button
                                    className="btn-corner"
                                    size="sm"
                                    color="success"
                                    onClick={() => this.editProduct("Y")}
                                    disabled={this.state.submit}
                                  >
                                    Unbanned Produk
                                  </Button>
                                )}
                              </div>
                            )}
                        </Col>
                        <Col md={7}>
                          <div className="col-group">
                            <label className="font-weight-bold mb-0">
                              Nama Produk
                            </label>
                            <h4 className="mt-0">{product.name}</h4>
                          </div>
                          <div className="col-group">
                            <label className="font-weight-bold mb-0">
                              Status
                            </label>
                            {product.active === "Y" && (
                              <p className="text-success mt-0">Aktif</p>
                            )}
                            {product.active === "N" && (
                              <p className="text-warning mt-0">
                                Menunggu Verifikasi
                              </p>
                            )}
                            {product.active === "B" && (
                              <p className="text-danger mt-0">Banned</p>
                            )}
                          </div>
                          <div className="col-group">
                            <label className="font-weight-bold mb-0">
                              Deskripsi
                            </label>
                            <p className="mt-0">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: product.description,
                                }}
                              ></div>
                            </p>
                          </div>
                          <div className="col-group">
                            <label className="font-weight-bold mb-0">
                              Penjual
                            </label>
                            <p className="mt-0">{product.company}</p>
                          </div>
                          <div className="col-group">
                            <label className="font-weight-bold mb-0">
                              Kategori
                            </label>
                            <p className="mt-0">{product.category}</p>
                          </div>
                          <div className="col-group">
                            <label className="font-weight-bold mb-0">
                              Tipe Produk
                            </label>
                            {product.type === "C" && (
                              <p className="mt-0">
                                Produk dapat dibeli melalui keranjang belanja
                                dan permintaan penawaran
                              </p>
                            )}
                            {product.type === "Q" && (
                              <p className="mt-0">
                                Produk hanya dapat dibeli melalui permintaan
                                penawaran
                              </p>
                            )}
                          </div>
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

export default ViewProduct;
