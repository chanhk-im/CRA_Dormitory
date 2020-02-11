import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class NoticeScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcPhi" headerText="열송 RC게시판" headerColor="#04B45F" textColor="white" />;
    }
};
