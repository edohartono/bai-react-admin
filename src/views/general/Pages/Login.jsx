import React from "react";
import { Row, Col } from "reactstrap";

import {} from "components";
import { API } from "../../../utils/Api";
import Swal from "sweetalert2";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      login: false,
    };

    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin(e) {
    e.preventDefault();
    this.setState({ login: true });
    API.post("login/admin", {
      email: this.state.email,
      password: this.state.password,
    })
      .then((res) => {
        // alert(JSON.stringify(res.result));

        Swal.fire("Login berhasil", "", "success");
        this.setState({ login: false });
        localStorage.setItem("token", res.result.result.token);
        localStorage.setItem(
          "profile",
          JSON.stringify(res.result.result.profile)
        );
        this.props.history.replace("/dashboard");
      })
      .catch((err) => {
        this.setState({ login: false });
        Swal.fire("Login gagal", "Username atau password salah", "error");
      });
  }

  render() {
    return (
      <div>
        <div className="">
          <Row>
            <Col xs={12} md={12}>
              <div className="container-fluid">
                <div className="login-wrapper row">
                  <div
                    id="login"
                    className="login loginpage offset-xl-4 offset-lg-3 offset-md-3 offset-0 col-12 col-md-6 col-xl-4"
                  >
                    <h1>
                      <a title="Login Page" tabIndex="-1">
                        &nbsp;
                      </a>
                    </h1>

                    <form
                      name="loginform"
                      id="loginform"
                      onSubmit={this.onLogin}
                    >
                      <p>
                        <label htmlFor="user_login">
                          Email
                          <br />
                          <input
                            type="text"
                            name="un"
                            id="user_name"
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                            className="form-control"
                          />
                        </label>
                      </p>
                      <p>
                        <label htmlFor="user_pass">
                          Password
                          <br />
                          <input
                            type="password"
                            name="pwd"
                            id="user_pass"
                            className="input"
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                            size="20"
                          />
                        </label>
                      </p>
                      <p className="submit">
                        <input
                          type="button"
                          disabled={this.state.login}
                          name="wp-submit"
                          id="wp-submit"
                          className="btn btn-accent btn-block"
                          value="Sign In"
                          onClick={this.onLogin}
                        />
                      </p>
                    </form>

                    {/* <p id="nav">
                        <a href="#!" title="Password Lost and Found">Forgot password?</a> | <a href="#!" title="Sign Up">Sign Up</a>
                    </p> */}
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

export default Login;
