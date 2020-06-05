import React from 'react'

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div>Hello from {this.props.compiler} and {this.props.framework}</div>
        )
    }
}
