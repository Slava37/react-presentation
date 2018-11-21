import React from 'react'
import classes from './Layout.css'

class Layout extends React.Component {
    render(){
        return (
        <div>
            <main>
                {this.props.children}
            </main>
        </div>
        )
    }
}

export default Layout