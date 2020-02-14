import React, { Component } from "react";

import PostScreen from "./PostScreen";

export default class NoticeScreen extends Component {
    render() {
        return (
            <PostScreen navigation={this.props.navigation} type="Notice" headerText="공지게시판" headerColor="#A7DEFE" fontSize="18" />
        )
    }
}

