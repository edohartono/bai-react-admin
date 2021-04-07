import React, { Component } from "react";
import { imageURL } from "../../../config";
import { API } from "../../../utils/Api";
import { Row, Col, Button } from "reactstrap";
import moment from "moment";
import DataTable from "react-data-table-component";

export class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],

      columns: [
        {
          name: "Nama Penjual",
          width: "25%",
          cell: (row) => (
            <div className="d-flex flex-row my-3 align-content-start align-items-start w-100">
              <img
                src={imageURL + row.display_picture}
                width="60em"
                height="60em"
                style={{ borderRadius: "50%" }}
              />{" "}
              <h5 className="ml-3">{row.name}</h5>
            </div>
          ),
        },
        {
          name: "Email",
          selector: "email",
        },
        {
          name: "No HP",
          selector: "phone",
        },
        {
          name: "Status",
          cell: (row) => (
            <div>
              <p className={row.active === "Y" ? "text-success" : "text-dark"}>
                {row.active === "Y" ? "Aktif" : "Banned"}
              </p>
            </div>
          ),
        },
        {
          name: "Bergabung",
          cell: (row) => (
            <div>{moment(row.created_at).format("D MMMM YYYY")}</div>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.get("customer/all").then((res) => {
      this.setState({
        customers: res.result.result,
      });
    });
  }

  render() {
    const { customers, fetch } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Semua Customer</h1>
                </div>
              </div>

              <Col md={12}>
                <div className="content-body content-card" id="customer-list">
                  <DataTable
                    title="Semua Customer"
                    columns={this.state.columns}
                    data={customers}
                  />
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UserList;
