import React, { FC } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
  faExclamationCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'warn' | 'loading'

export type ThemeType = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning' | 'warn' | 'light' | 'dark'

export interface MessageProps {
  text: string
  type: MessageType
}

export interface IconProps extends FontAwesomeIconProps {
  icon: IconProp
  theme?: ThemeType
}

const Message: FC<MessageProps> = (props) => {
  const { text, type } = props
  // console.log(props)
  const renderIcon = (messageType: MessageType) => {
    let messageIcon: IconProp
    let mt = ''
    switch (messageType) {
      case 'success':
        messageIcon = faCheckCircle
        break
      case 'error':
        messageIcon = faTimesCircle
        break
      case 'info':
        messageIcon = faInfoCircle
        break
      case 'warning':
      case 'warn':
        messageIcon = faExclamationCircle
        break
      /* case 'loading':
                messageIcon = faSpinner;
                mt = 'secondary';
                break; */
      default:
        messageIcon = faInfoCircle
        break
    }

    return <Icon icon={messageIcon} theme={mt || messageType}></Icon>
  }

  return (
    <div className="message">
      <div className="message-content">
        <div className="icon">{renderIcon(type)}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  )
}

export const Icon: FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classNames(className, { [`icon-${theme}`]: theme })
  // console.log(classes)

  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
}

Icon.defaultProps = {
  theme: 'primary',
}

// Message.displayName = 'Message'

export default Message
