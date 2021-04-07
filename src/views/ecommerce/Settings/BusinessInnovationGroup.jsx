import React, { Component } from "react";
import { Row, Col, Badge, Button, Input } from "reactstrap";
import DataTable from "react-data-table-component";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import { IDR_Format } from "../../../utils/Currency";
import { imageURL, imageURLTemp } from "../../../config";
import moment from "moment";
import ImageUploader from "react-images-upload";

export class BusinessInnovationGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };

    this.onDrop = this.onDrop.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    API.get("option/name", { name: "big" })
      .then((res) => {
        // alert(JSON.stringify(res));
        this.setState({
          data: JSON.parse(res.result.result.value),
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal mengambil data",
          text: err.error.error_message ? err.error.error_message : "",
          icon: "error",
        });
      });
  }

  update() {
    let payload = {
      name: "featured_image",
      data: this.state.banners,
    };

    API.patch("option", payload)
      .then(() => {
        Swal.fire({ title: "Berhasil memperbarui banner", icon: "success" });
      })
      .catch(() => {
        Swal.fire({
          title: "Gagal memperbarui banner",
          icon: "error",
        });
      });
  }

  onChange = (key, value) => {};

  onDrop(picture, index) {
    // let _data = this.state.data;
    // let _banners = this.state.banners;
    // API.upload(picture[0]).then((res) => {
    //   //   alert(JSON.stringify(res));
    //   _data[index] = imageURLTemp + res.fileUrl;
    //   _banners[index] = imageURLTemp + res.fileUrl;
    //   this.setState({
    //     banners: _banners,
    //     data: _data,
    //   });
    // });
  }

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Business Innovation Group</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body content-card">
                  {this.state.data && (
                    <Row>
                      <Col md={12} className="mt-2">
                        <label>Judul</label>
                        <Input type="text" value={this.state.data.label} />
                      </Col>
                      <Col md={12} className="mt-2">
                        <label>Deskripsi</label>
                        <Input
                          type="textarea"
                          value={this.state.data.description}
                        />
                      </Col>

                      <Col md={12} className="mt-2">
                        <label>Background image</label>
                        <img src={this.state.data.background} />
                        <ImageUploader
                          withIcon={false}
                          buttonText="Ganti banner"
                          onChange={(picture) => this.onDrop(picture)}
                          imgExtension={[".jpg", ".png", ".jpeg"]}
                          maxFileSize={5242880}
                          singleImage={true}
                        />
                      </Col>
                      {/* {Array.isArray(this.state.banners) &&
                      this.state.banners.map((b, i) => (
                        <Col md={12}>
                          <img src={b} />
                          <ImageUploader
                            withIcon={false}
                            buttonText="Ganti banner"
                            onChange={(picture) => this.onDrop(picture, i)}
                            imgExtension={[".jpg", ".png", ".jpeg"]}
                            maxFileSize={5242880}
                            singleImage={true}
                          />
                        </Col>
                      ))}

                    <Col md={12} className="d-flex justify-content-center">
                      <Button color="success" onClick={() => this.update()}>
                        Update
                      </Button>
                    </Col> */}
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

export default BusinessInnovationGroup;
