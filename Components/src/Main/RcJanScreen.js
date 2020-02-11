import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class NoticeScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcJan" headerText="장기려 RC게시판" headerColor="#C7210B" textColor="white" />;
    }
};
