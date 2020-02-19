import React, { Component } from "react";
import axios from "axios";
// import '../assets/css/bootstrap.min.css'
// import '../assets/css/fontawesome.min.css'
// import '../App.css'
import { Link } from "react-router-dom";
// const URL_STRING = "http://ec2-54-90-79-234.compute-1.amazonaws.com:3333"
// const URL_STRING = "https://serene-everglades-64554.herokuapp.com"
let URL_STRING = "http://localhost:3333"

class Graph extends Component {
    constructor() {
        super();
        this.state = {
            history: [],
            dailyIncome: [],
            annualIncome: [],
            income: [],
            amount: 0,
            data: {},
            orders: [],
            totalOrders: 0
        };
        this.getDailyIncome = this.getDailyIncome.bind(this);
        this.getAnnualIncome = this.getAnnualIncome.bind(this);
        this.getHistory = this.getHistory.bind(this);
    }

    componentDidMount() {
        this.getDailyIncome();
        this.getAnnualIncome();
        this.getHistory();
    }

    getHistory() {
        axios
            .get(`${URL_STRING}/api/products/history`, {
                headers: {
                    Authorization: localStorage.getItem("keyToken")
                }
            })
            .then(result => {
                this.setState({ history: result.data.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getDailyIncome() {
        axios
            .get(`${URL_STRING}/api/products/dailyIncome`)
            .then(result => {
                this.setState({ dailyIncome: result.data.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getAnnualIncome() {
        axios
            .get(`${URL_STRING}/api/products/annualIncome`)
            .then(result => {
                this.setState({ annualIncome: result.data.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let daily = [0];
        let dailyAmount = [];
            //eslint-disable-next-line
        this.state.dailyIncome.map(item => {
            daily.push(item.INCOME);
            dailyAmount.push(item.AMOUNT);
        });

        let annual = [0];
            //eslint-disable-next-line
        this.state.annualIncome.map(item => {
            annual.push(item.INCOME);
        });

        return (
            <div className="row">
                <div
                    className="col-md-1 pl-0 ml-0 border border-light border-top-0 shadow"
                    style={{ height: "700px" }}
                >
                    <div className="row">
                        <div className="col-md-12 ml-5 mt-4">
                            <button
                                data-toggle="modal"
                                data-target="#addModal"
                                className="btn"
                            >
                                <Link to="/home">
                                    <span className="fas fa-long-arrow-alt-left"></span>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="col-md-11 p-4 m-0"
                    style={{
                        height: "700px",
                        overflowX: "hidden",
                        overflowY: "scroll"
                    }}
                >
                    <div className="row m-5">
                        <div className="col-md-4">
                            <div className="card bg-primary text-white text-center p-3">
                                <blockquote className="blockquote mb-0">
                                    <p>Today's income</p>
                                    <h1>Rp. {daily[daily.length - 1]}</h1>
                                    <footer className="text-white"></footer>
                                </blockquote>
                            </div>
                        </div>
                        <div className=" col-md-4">
                            <div className="card bg-warning text-white text-center p-3">
                                <blockquote className="blockquote mb-0">
                                    <p>Today's Orders</p>
                                    <h1>
                                        {dailyAmount[dailyAmount.length - 1]}
                                    </h1>
                                    <footer className="text-white"></footer>
                                </blockquote>
                            </div>
                        </div>
                        <div className=" col-md-4">
                            <div className="card bg-danger text-white text-center p-3">
                                <blockquote className="blockquote mb-0">
                                    <p>This Year's Income</p>
                                    <h1>Rp. {annual[annual.length - 1]}</h1>
                                    <footer className="blockquote-footer text-white"></footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.history.map(
                                                (item, index) => {
                                                    return (
                                                        <tr>
                                                            <th>
                                                                {" "}
                                                                {
                                                                    item.date_created
                                                                }
                                                            </th>
                                                            <td>
                                                                {item.product}
                                                            </td>
                                                            <td>
                                                                Rp. {item.price}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Graph;
