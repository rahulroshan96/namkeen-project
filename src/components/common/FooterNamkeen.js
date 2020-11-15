import React, { Component } from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'; // import 'rc-footer/asssets/index.less';
import { render } from 'react-dom';

class FooterNamkeen extends Component {
    render(){
      return(
        <div style={{"margin-top":"60px"}}>
        <Footer
        theme="dark"
      columns={[
        {
          title: 'Contact Us',
          items:[
            {
              icon: (
                <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" alt=""/>
              ),
              title: 'Contact Us',
              url: '/contactus',
              description: '',
            },
            {
              icon: (
                <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" alt="" />
              ),
              title: 'Contact Us',
              url: '/contactus',
              description: '',
            }
          ],
        },
        {
          icon: (
            <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" alt="" />
          ),
          title: 'About Us',
          url: '/aboutus',
          description: '',
        },
        {
          icon: (
            <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" alt="" />
          ),
          title: 'Privacy Policy',
          url: 'https://www.privacypolicygenerator.info/live.php?token=iL5uiW5evwSNBBZOQaXtbG8tK5b8R7NZ',
          openExternal: true,
        },
      ]}
      bottom="Copyright by NamkeenBytes 2020"
    />
    </div>
      )
    }
}

export default FooterNamkeen;