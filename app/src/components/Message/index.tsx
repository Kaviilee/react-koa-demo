import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import Message, { MessageType } from './message';
// import style from '../../styles/message.less'

type MessageApi = Partial<Record<MessageType, (text: string) => void>>

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right' | 'slide-in-top'

export interface Notice {
    text: string;
    key: string;
    type: MessageType;
}

interface TransitionProps extends CSSTransitionProps {
    classNames?: any;
    animation?: AnimationName;
    wrapper?: boolean;
}

let uid = 0
const now = Date.now()
const getUuid = (): string => {
    const id = uid;
    uid += 1
    return `MESSAGE_${now}_${id}`
}

let add: (notice: Notice) => void

export const Transition: React.FC<TransitionProps> = props => {
    const {
        children,
        classNames,
        animation,
        wrapper,
        ...restProps
    } = props

    return (
        <CSSTransition
          classNames={classNames ? classNames : animation}
          {...restProps}
        >
          {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
}


export const MessageContainer = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const timer = 3000;
    const max = 10;

    const remove = (notice: Notice) => {
        const {key} = notice;

        setNotices((prevNotices) => {
            return prevNotices.filter(({ key: noticeKey }) => key !== noticeKey);
        })
    }

    add = (notice: Notice) => {
        setNotices((prevNotices) => [...prevNotices, notice]);
        console.log(notices)

        setTimeout(() => {
            remove(notice)
        }, timer);
    }

    useEffect(() => {
        if (notices.length > max) {
            const [first] = notices;
            remove(first)
        }
    }, [notices])

    return (
        <div className="message-container">
            {/* <TransitionGroup> */}
                {
                    notices.map(({ text, key, type }) => (
                        // <Transition
                        //     timeout={200}
                        //     in
                        //     animation="slide-in-top"
                        //     key={key}
                        //     >
                            <Message key={key} type={type} text={text} />
                        // </Transition>
                    ))
                }
            {/* </TransitionGroup> */}
        </div>
    )
}

let el = document.querySelector('#message-wrapper');
if (!el) {
    el = document.createElement('div');
    el.className = 'message-wrapper';
    el.id = 'message-wrapper';
    document.body.append(el)
}

ReactDOM.render(
    <MessageContainer></MessageContainer>,
    el
)

const api: MessageApi = {
    info: (text) => {
        // console.log(text)
        add({
            text,
            key: getUuid(),
            type: 'info'
        })
    },
    success: (text) => {
      add({
        text,
        key: getUuid(),
        type: 'success'
      })
    },
    warning: (text) => {
      add({
        text,
        key: getUuid(),
        type: 'warning'
      })
    },
    error: (text) => {
      add({
        text,
        key: getUuid(),
        type: 'error'
      })
    }
}

export default api;
