import React, { Component } from "react";
import axios from "axios";

import Body from "./Body";
import Navbars from "./Navbars";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { show: "none", search: [] };
        this.cartToggle = this.cartToggle.bind(this);
        this.search = this.search.bind(this);
    }
    cartToggle(Display) {
        this.setState({ show: Display });
    }
    componentDidMount() {
        let token = localStorage.getItem("keyToken");
        if (token == null) window.location.href = "/";
    }
    async search(filter) {
         await axios
            .get(
                `http://localhost:3333/api/products/search?name=${filter}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("keyToken")
                    }
                }
            )
            .then(result => {
                console.log(result);
                if (result.data.data.length > 0)
                    this.setState({ search: result.data.data });
                else alert("data not found");
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <>
                <Navbars
                    show={this.state.show}
                    cartToggle={this.cartToggle}
                    search={this.search}
                />
                <Body
                    show={this.state.show}
                    cartToggle={this.cartToggle}
                    search={this.search}
                />
            </>
        );
    }
}

export default Home;
