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
} from "reactstrap";
import DataTable from "react-data-table-component";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";
import { IDR_Format } from "../../../utils/Currency";
import { imageURL, imageURLTemp } from "../../../config";
import moment from "moment";
import ImageUploader from "react-images-upload";

export class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      form: {
        current_password: "",
        password: "",
        new_password: "",
      },
    };

    this.setForm = this.setForm.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {}

  setForm(key, value) {
    this.setState((prev) => ({
      form: {
        ...prev.form,
        [key]: value,
      },
    }));
  }

  submit(e) {
    this.setState({ submit: false });
    e.preventDefault();

    API.post("admin/change-password", this.state.form)
      .then(() => {
        Swal.fire("Password berhasil diperbarui", "", "success");
        this.setState({ submit: true });
      })
      .catch((err) => {
        Swal.fire(
          "Password gagal diperbarui",
          err.error.error_message || "",
          "error"
        );
        this.setState({ submit: true });
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
                  <h1 className="title">Ganti Password</h1>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="content-body content-card">
                  <Row>
                    <Col md={6}>
                      <Form onSubmit={this.submit}>
                        <FormGroup>
                          <Label for="current_password">
                            Password Saat Ini
                          </Label>
                          <Input
                            type="text"
                            id="current_password"
                            required
                            placeholder="Masukkan password saat ini"
                            onChange={(e) =>
                              this.setForm("current_password", e.target.value)
                            }
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="password">Password Baru</Label>
                          <Input
                            type="text"
                            id="password"
                            required
                            placeholder="Masukkan password baru"
                            onChange={(e) =>
                              this.setForm("password", e.target.value)
                            }
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="new_password">
                            Konfirmasi Password baru
                          </Label>
                          <Input
                            type="text"
                            id="new_password"
                            required
                            placeholder="Konfirmasi password baru"
                            onChange={(e) =>
                              this.setForm("new_password", e.target.value)
                            }
                          />
                        </FormGroup>

                        <FormGroup>
                          <Button
                            type="submit"
                            color="success"
                            disabled={this.state.password}
                          >
                            Ganti Password
                          </Button>
                        </FormGroup>
                      </Form>
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

export default ChangePassword;
