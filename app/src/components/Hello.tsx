import React, { FC } from 'react'

export interface HelloProps { compiler: string; framework: string; }

export const Hello: FC<HelloProps> = () => {
    return (
        <div>Hello from React and Typescript!</div>
    )
}
