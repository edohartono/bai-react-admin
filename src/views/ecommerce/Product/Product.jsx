import React from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
  Row, Col, FormGroup, Input,
} from 'reactstrap';

import classnames from 'classnames';

//import PerfectScrollbar from 'perfect-scrollbar';

import {
  ProductList
} from 'components';

import { search } from 'variables/ecommerce/product.jsx';
import { API } from '../../../utils/Api'
//var ps;


class Product extends React.Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      products: []
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  async componentDidMount() {
    let products = await this.getProduct()
    this.setState({ products: products.result.data })
  }


  getProduct() {
    return API.get('products', { category: 'user' })
      .then(res => {
        return res
      })
  }
  /*componentDidMount(){
      if(navigator.platform.indexOf('Win') > -1){
          ps = new PerfectScrollbar(this.refs.searcharea,{suppressScrollX: true, suppressScrollY: false});
      }
  }
  componentWillUnmount(){
      if(navigator.platform.indexOf('Win') > -1){
          ps.destroy();
      }
  }*/


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

                    <div className="col-md-4 col-sm-4 col-4 d-none">
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Sort By</option>
                          <option>Latest</option>
                          <option>Most viewed</option>
                          <option>Most Rated</option>
                          <option>Trending</option>
                        </Input>
                      </FormGroup>
                    </div>

                    <div className="col-md-2 col-sm-3 col-4 d-none">
                      <button type="button" className="btn btn-primary">Search</button>
                    </div>


                    <div className="clearfix"></div><br />


                    <div className="col-lg-12 search_data">

                      <div>
                        <Nav tabs className="left-aligned col-lg-12 col-xl-12 col-md-12 col-12">
                        </Nav>

                        <TabContent activeTab={this.state.activeTab} className="col-lg-12 col-xl-12 col-12">
                          <TabPane tabId="1">
                            <Row>
                              <Col sm="12">
                                <div /*ref="searcharea" style={{position: 'relative', height: 800+'px'}}*/>
                                  <ProductList search={search} products={this.state.products} />
                                </div>
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
