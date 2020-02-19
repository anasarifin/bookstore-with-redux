import React, { Component } from 'react'
import axios from 'axios'
import '../assets/style/product.css'
import {Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Button} from 'reactstrap';
import { connect } from "react-redux";
import { categories } from "../Redux/Actions/categories";
// const URL_STRING = 'http://ec2-54-90-79-234.compute-1.amazonaws.com:3333';
// const URL_STRING = 'https://serene-everglades-64554.herokuapp.com';
let URL_STRING = "http://localhost:3333"

class Product extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      description: this.props.description,
      id_category: this.props.category,
      image: "",
      qty: this.props.quantity,
      qtyInCart: 0,
      warningFile: false
    }
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.checkSelected = this.checkSelected.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    // this.getCategories = this.getCategories.bind(this)
    this.handleEditImg = this.handleEditImg.bind(this) 
    // console.log(this.props.allCategory)
  }

  componentDidMount(){
    this.getCategories()
  }

  async getCategories(){
        await this.props.dispatch(categories());
        this.setState({ categories: this.props.data.categories });
  }

  handleChangeName(e){
    let val = e.target.value
    this.setState({
      name: val
    })
  }

  handleChangeQuantity(e){
    let val = e.target.value
    this.setState({
      qty: val
    })
  }
  handleEditImg(e){
       //eslint-disable-next-line
        let checkImg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
        let extImg = e.target.files[0].name
        if(e.target.files[0].size > 1000000){
            this.setState({ warningFile: true })
            e.target.value = null
        }
        if(!extImg.match(checkImg)){
            this.setState({ warningFile: true })
            e.target.value = null
        }
    }

  handleChangeDesc(e){
    let val = e.target.value
    this.setState({
      description: val
    })
  }

  handleChangePrice(e){
    let val = e.target.value
    this.setState({
      price: val
    })
  }

  handleUpdate(e){
    e.preventDefault()
    const data = new FormData(e.target)

    let url = `${URL_STRING}/api/products/${this.props.id}`

    axios({
      method: 'put',
      url: url,
      data: data,
      config: { headers: {'Content-Type': 'multipart/form-data', 'Authorization': localStorage.getItem('keyToken'), 
               'Access-Control-Allow-Origin': '*'  }}
    })

    window.location.href = "/";
  }

  async addToCart(){
    console.log(this.state.name)
    if(this.state.qtyInCart > 0){
      this.state.qtyInCart +=1
    } else {
      await this.setState({
        id: this.props.id,
        qtyInCart: 1,
        name: this.props.name,
        price: this.props.price,
        image: this.props.image,
        id_category: this.props.category
      })
    }
    // console.log(this.state)
    await this.props.handleCart(this.state)
    this.props.handleTotal(this.props.price)
  }

  checkSelected(id){
    if(this.props.id === id){
      return "selected"
    }
  }

  handleDelete(e){
    e.preventDefault()

    axios.delete(`${URL_STRING}/api/products/${this.props.id}`, {crossdomain: true})

    window.location.href = "/home";
  }

  render(){
    return(
        <>
        <div className="card">
        <Card>
            <CardImg className="cardImg"  src={`${URL_STRING}` + this.props.image}/>
            <CardBody>
                <CardTitle>{this.props.name}</CardTitle>
                <CardSubtitle></CardSubtitle>
                <CardText>Rp. {this.props.price}</CardText>
                <Button color="warning" onClick={this.addToCart}>
                  <span className="fas fa-shopping-cart"></span>
                </Button>
                <Button data-toggle="modal" data-target={"#editModal-"+this.props.id} color="primary">
                  <span className="fa fa-edit"></span>
                </Button>
                <Button data-toggle="modal" data-target={"#deleteModal-"+this.props.id} color="danger">
                    <span className="fa fa-trash"></span>
                </Button>
            </CardBody>
        </Card>
    </div>

        <div
          className="modal fade"
          id={"deleteModal-"+this.props.id}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel">
                  Remove Product
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form onSubmit={this.handleDelete}>
              <div className="modal-body">
                <p>
                  Are You Sure you want to delete this product?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id={"editModal-"+this.props.id}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel">
                  Edit Product
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form onSubmit={this.handleUpdate}>
                <div className="modal-body">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="col-form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange = {this.handleChangeName}
                      value={this.state.name} 
                      required/>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="price"
                      className="col-form-label">Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange = {this.handleChangePrice}
                      value={this.state.price} 
                      required/>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="count"
                      className="col-form-label">Quantity:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="count"
                      onChange = {this.handleChangeQuantity}
                      value={this.state.qty} 
                      required/>
                  </div>
                  <div>
                    <label
                      htmlFor="id_category"
                      className="col-form-label">category:</label>
                    <select id="category" name="id_category" className="form-control" required>
                     <option hidden disabled selected value> ---SELECT--- </option>
                      {
                        this.state.categories.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>{item.name_category}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="image"
                      className="col-form-label">Image:</label>
                      { this.state.warningFile === true ? <p style={{color: 'red'}}>File must image and image must lower than 1MB !!</p> : '' }
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image" 
                      onChange={this.handleEditImg}
                      required
                      />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="description"
                      className="col-form-label">Description:</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      onChange = {this.handleChangeDesc}
                      value={this.state.description} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        </>
    )
  }
}

// export default Product
const mapStateToProps = state => {
    return {
        data: state.categories
    };
};
export default connect(mapStateToProps)(Product);
