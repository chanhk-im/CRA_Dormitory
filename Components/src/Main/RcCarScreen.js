import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class RcCarScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcCar" headerText="카마이클 RC게시판" headerColor="#FA8039" textColor="white" fontSize="18"/>;
    }
};
