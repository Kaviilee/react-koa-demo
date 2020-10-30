import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'warn' | 'loading';

export type ThemeType = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning' | 'warn' | 'light' | 'dark';

export interface MessageProps {
    text: string;
    type: MessageType;
}

export interface IconProps extends FontAwesomeIconProps {
    icon: IconProp;
    theme?: ThemeType;
}

const Message: FC<MessageProps> = props => {
    const { text, type } = props
    const renderIcon = (messageType: MessageType) => {
        console.log(messageType)
        let messageIcon: IconProp;

        switch(messageIcon) {
            case 'success':
                messageIcon = 'check-circle';
                break;
            case 'error':
                messageIcon = 'times-circle';
                break;
            case 'info':
                messageIcon = 'info-circle';
                break;
            case 'warning':
            case 'warn':
                messageIcon = 'exclamation-circle';
                break;
            case 'loading':
                messageIcon = 'spinner-third';
                break;
            default:
                messageIcon = 'info-circle';
                break;
        }

        return <Icon icon={messageIcon} theme={messageType}></Icon>
    }

    return (
        <div className="message">
            <div className="message-content">
                {/* <div className="icon">
                    { renderIcon(type) }
                </div> */}
                <div className="text">
                    {text}
                </div>
            </div>
        </div>
    )
}

export const Icon: FC<IconProps> = props => {
    console.log(props)
    const { className, theme, ...restProps } = props
    const classes = classnames(className, { [`icon-${theme}`]: theme });

    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

Icon.defaultProps = {
    theme: 'primary'
}

// Message.displayName = 'Message'

export default Message;
