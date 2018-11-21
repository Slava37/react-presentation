import React from 'react';
import Layout from './hoc/Layout/Layout.js'

class App extends React.Component {
    render() {
        return (
           <Layout>


              <div style={{width: 400, border: '1px solid #ccc'}}>
                  <h1>Layout works</h1>
              </div>
           </Layout>
        );
    }
}

export default App;
