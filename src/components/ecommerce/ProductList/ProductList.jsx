import React from 'react';
import { NavLink } from 'react-router-dom';
// used for making the prop types of this component
import PropTypes from 'prop-types';
import { IDR_Format } from '../../../utils/Currency'
import { imageURL } from '../../../config'

class ProductList extends React.Component {
    render() {
        var productList = [];
        for (var i = 0; i < this.props.products.length; i++) {
            // var thumbnail = JSON.parse(this.props.products[i].gambar)
            productList.push(

                <div className="search_result col-12 col-sm-12 col-md-6" key={i}>
                    <div className="float-left col-md-4 col-sm-3 col-5">
                        <img alt="search-result" className="img-fluid" src={imageURL + this.props.products[i].images[0]} />
                    </div>
                    <div className="float-left col-md-8 col-sm-9 col-7">
                        <h4 className="searchtitle"><NavLink to=''>{this.props.products[i].name}</NavLink></h4>
                        <p className="searchauthor"><a href="">{this.props.products[i].category_id[0].name}</a></p>
                        <p>Rp. {IDR_Format(this.props.products[i].price)}</p>
                        <p
                            style={{
                                lineHeight: 1.5,
                                height: '4.5em',
                                overflow: 'hidden'
                            }}
                            dangerouslySetInnerHTML={{ __html: this.props.products[i].description }}
                        ></p>
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                { productList}
            </div>
        );
    }
}

ProductList.propTypes = {
    search: PropTypes.arrayOf(PropTypes.object)
}

export default ProductList;
