import { useEditable } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import SockJsClient from 'react-stomp';

const TestUi = (props) => {
    const clientHref = useRef('')
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        if (isConnected === false) {
            console.log('disConect')
            clientHref.current.connect()
        } else {
            console.log('connect111')
        }
    })
    const disconnectSocket = () => {
        clientHref.current.disconnect()
    }

    return (
        <div>
            <button onClick={() => {
                disconnectSocket()
            }}>disconnect</button>
            <SockJsClient
                url='http://10.0.7.7:8082/tgal-websocket'
                topics={['/topic/new-orders/1539']}
                onMessage={(msg) => {
                    alert(msg.status);
                    this.onDisconnect()
                }}

                ref={(client) => { clientHref.current = client }}
                onConnect={(data) => {
                    console.log(data);
                    setIsConnected(true);
                    // thông báo trạng thái connect thành công hay không
                }}

                onDisconnect={() => {
                    console.log('vao disconnect')
                    // kết nối nó bị mất nó sẽ vào đây.
                    // kết nối với server
                    setIsConnected(false);
                    alert('socket disconnet')
                }}
                autoReconnect={true}
            />
        </div>
    );
}

export default TestUi;
