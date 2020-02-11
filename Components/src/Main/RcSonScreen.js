import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class NoticeScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcSon" headerText="손양원 RC게시판" headerColor="#8A0829" textColor="white"/>;
    }
};
