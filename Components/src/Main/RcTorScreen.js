import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class RcTorScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcTor" headerText="토레이 RC게시판" headerColor="#F6B801" textColor="white" fontSize="18"/>;
    }
};
