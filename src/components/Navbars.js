import React, { Component } from "react";
import "../assets/style/navbar.css";

class Navbars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideBar: "none",
            showCart: "none",
            filter: ''
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.sideBarToggle = this.sideBarToggle.bind(this);
        this.cartToggle = this.cartToggle.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.search = this.search.bind(this);
    }

    handleLogOut() {
        localStorage.removeItem("keyToken");
        window.location.href = '/';
    }
    sideBarToggle() {
        if (this.state.showSideBar === "none") {
            this.setState({ showSideBar: "inline" });
        } else {
            this.setState({ showSideBar: "none" });
        }
    }
    cartToggle() {
        if (this.props.show === "none") this.props.cartToggle("block");
        else {
            this.props.cartToggle("none");
        }
    }
    searchChange(e){
        console.log(e.target.value)
        this.setState({ filter: e.target.value })
    }
    search(){
        this.props.search(this.state.filter)
    }

    render() {
        return (
            <div>
                <nav className="navbar bg-custom navbar-light shadow">
                    <i className="fa fa-bars" onClick={this.sideBarToggle}></i>
                    <input type="text"  id="search" onChange={this.searchChange}/>
                <i className="fa fa-search" onClick={this.search}></i>
                    <i
                        className="fas fa-shopping-cart"
                        onClick={this.cartToggle}
                    ></i>
                </nav>
                <div
                    className="sideApp shadow"
                    style={{ display: this.state.showSideBar }}
                >
                    <Link to="/home"><i className="fas fa-book"></i></Link>
                    <i
                        data-toggle="modal"
                        data-target="#addModal"
                        className="fas fa-plus"
                    ></i>
                    <Link to="/history">
                        <i className="fas fa-clipboard"></i>
                    </Link>
                    <i
                        onClick={this.handleLogOut}
                        className="fas fa-arrow-alt-circle-left"
                    ></i>
                </div>
            </div>
        );
    }
}

export default Navbars;
