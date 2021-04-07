import React, { Component } from "react";
import { Row, Col, Card } from "reactstrap";
import Chart from "react-apexcharts";
import { API } from "../../../utils/Api";

export class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistic: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.get("admin/dashboard").then((res) => {
      let result = res.result.result;
      result.sellerOptions = {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: result.sellerStatistic.label,
        },
      };

      result.sellerSeries = [
        {
          name: "Total Penjual",
          data: result.sellerStatistic.data,
        },
      ];

      delete result.sellerStatistic;
      result.userOptions = {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: result.userStatistic.label,
        },
      };

      result.userSeries = [
        {
          name: "Total Customer",
          data: result.userStatistic.data,
        },
      ];

      delete result.userStatistic;

      result.orderOptions = {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: result.orderStatistic.label,
        },
      };

      result.orderSeries = [
        {
          name: "Total Customer",
          data: result.orderStatistic.data,
        },
      ];

      delete result.orderStatistic;

      result.quotationOptions = {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: result.quotationStatistic.label,
        },
      };

      result.quotationSeries = [
        {
          name: "Total Customer",
          data: result.quotationStatistic.data,
        },
      ];

      delete result.quotationStatistic;
      //   alert(JSON.stringify(result));
      console.log(result);

      this.setState({ statistic: result });
    });
  }

  render() {
    return (
      <div className="content mt-5 pt-2 mx-2">
        <Row className="mx-3 mt-5 ">
          <Col xs={12} md={12} className="content-card my-2" id="dashboard">
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">DASHBOARD</h1>
              </div>
              <Row className="w-100">
                {this.state.statistic &&
                  Array.isArray(this.state.statistic.headers) &&
                  this.state.statistic.headers.map((s) => (
                    <Col md={3} lg={2} key={s.label}>
                      <Card className="py-2 px-3" className="card-stat">
                        <h4>{s.label}</h4>
                        <h3 className="total">{s.data}</h3>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>

          <Col md={12} className="content-card my-2">
            <Row style={{ backgroundColor: "white", width: "100%" }}>
              {/* <div className="mixed-chart"> */}
              <Col md={6}>
                <h5 className="font-weight-bold">Statistik Penjual</h5>
                {this.state.statistic && (
                  <Chart
                    options={this.state.statistic.sellerOptions}
                    series={this.state.statistic.sellerSeries}
                    type="area"
                    width="600"
                  />
                )}
              </Col>
              <Col md={6}>
                <h5 className="font-weight-bold">Statistik Customer</h5>
                {this.state.statistic && (
                  <Chart
                    options={this.state.statistic.userOptions}
                    series={this.state.statistic.userSeries}
                    type="area"
                    width="600"
                  />
                )}
              </Col>
              <Col md={6}>
                <h5 className="font-weight-bold">Statistik Order</h5>
                {this.state.statistic && (
                  <Chart
                    options={this.state.statistic.orderOptions}
                    series={this.state.statistic.orderSeries}
                    type="area"
                    width="600"
                  />
                )}
              </Col>
              <Col md={6}>
                <h5 className="font-weight-bold">Statistik Quotation</h5>
                {this.state.statistic && (
                  <Chart
                    options={this.state.statistic.quotationOptions}
                    series={this.state.statistic.quotationSeries}
                    type="area"
                    width="600"
                  />
                )}
              </Col>
              {/* </div> */}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardAdmin;
