import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class NoticeScreen extends Component {
    render() {
        return <PostScreen navigation={this.props.navigation} type="RcKuy" headerText="카이퍼 RC게시판" headerColor="#003FBD" textColor="white" />;
    }
};
