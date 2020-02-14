import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class NoticeScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcTor" headerText="토레이 RC게시판" headerColor="#F6B801" textColor="white" fontFamily="Oegyein" fontSize="18"/>;
    }
};
