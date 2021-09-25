import React from 'react';
import { Tabs, Radio, Space } from 'antd';
import { useState } from 'react';
const { TabPane } = Tabs;

export default function HomeMenu(props) {
    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
      };

    const { tabPosition } = state;
    return (
        <>
            <Tabs tabPosition={tabPosition}>
                <TabPane tab={<img src="https://picsum.photos/200/200" className="rounded-full" width="50" />} key="1">
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/200/200" className="rounded-full" width="50" />} key="2">
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/200/200" className="rounded-full" width="50" />} key="3">
                </TabPane>
            </Tabs>
        </>
    )
}
