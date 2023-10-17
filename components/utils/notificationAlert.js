import React from 'react'
import { notification } from 'antd';

export default function notificationAlert(type,message, e) {
        notification[type]({
            message: message,
            description: e,
        });
}
