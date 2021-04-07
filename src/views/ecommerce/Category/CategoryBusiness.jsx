import React, { Component } from "react";
import { API } from "../../../utils/Api";
import { Row, Col, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { imageURL } from "../../../config";

export class CategoryBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      fetch: 0,
      columns: [
        {
          name: "Logo",
          maxWidth: "10em",
          cell: (row) => (
            <div>
              <img src={imageURL + row.logo} />
            </div>
          ),
        },
        {
          name: "Nama Kategori",
          selector: "name",
        },
        {
          name: "Status",
          width: "5em",
          cell: (row) => (
            <div>
              {row.active === "Y" && <p className="text-success">Aktif</p>}
              {row.active === "N" && <p className="text-dark">Tidak Aktif</p>}
            </div>
          ),
        },
        {
          name: "Teks Judul Halaman",
          cell: (row) => (
            <div>
              {Array.isArray(row.details) && (
                <p>{row.details[0].display_text}</p>
              )}
            </div>
          ),
        },
        {
          name: "Teks Deskripsi Halaman",
          cell: (row) => (
            <div>
              {Array.isArray(row.details) && (
                <p>{row.details[0].description}</p>
              )}
            </div>
          ),
        },
        {
          name: "#",
          cell: (row) => (
            <div>
              <Button
                size="sm"
                color="warning"
                onClick={() => {
                  this.props.history.push(`/bisnis-kategori/edit?id=${row.id}`);
                }}
              >
                Edit Kategori
              </Button>
              <Button
                size="sm"
                color="primary"
                onClick={() => {
                  this.props.history.push(
                    `/bisnis-kategori-landing/edit?id=${row.id}`
                  );
                }}
              >
                Edit Landing Page
              </Button>
            </div>
          ),
        },
      ],
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.get("categories/business/all").then((res) => {
      this.setState({
        fetch: 1,
        categories: res.result.result,
      });
    });
  }

  render() {
    const { categories, fetch } = this.state;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Semua Kategori</h1>
                </div>
              </div>

              <Col md={12}>
                <div className="content-body content-card" id="category-list">
                  <DataTable
                    title="Semua Kategori"
                    columns={this.state.columns}
                    data={categories}
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

export default CategoryBusiness;
