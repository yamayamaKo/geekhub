import { Component } from "react";
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Layout extends Component{
    render(){
        return(
            <div>
                <Head>
                    <title>{this.props.title}</title>
                    <meta charSet='utf-8'/>
                </Head>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>    
        )
    }
}

export default Layout;