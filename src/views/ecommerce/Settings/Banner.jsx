import React, { Component } from "react";
import { Row, Col, Badge, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import { IDR_Format } from "../../../utils/Currency";
import { imageURL, imageURLTemp } from "../../../config";
import moment from "moment";
import ImageUploader from "react-images-upload";

export class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banners: [],
      data: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    API.get("option/name", { name: "featured_image" })
      .then((res) => {
        this.setState({
          banners: JSON.parse(res.result.result.value),
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

  onDrop(picture, index) {
    let _data = this.state.data;
    let _banners = this.state.banners;

    API.upload(picture[0]).then((res) => {
      //   alert(JSON.stringify(res));
      _data[index] = imageURLTemp + res.fileUrl;
      _banners[index] = imageURLTemp + res.fileUrl;

      this.setState({
        banners: _banners,
        data: _data,
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
                  <h1 className="title">Banner</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body content-card">
                  <Row>
                    {Array.isArray(this.state.banners) &&
                      this.state.banners.map((b, i) => (
                        <Col md={12}>
                          <img src={b} />
                          {/* {b} */}
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

export default Banner;
