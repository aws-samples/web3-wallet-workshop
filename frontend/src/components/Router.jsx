import React from "react";
//import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
import '../css/Router.css'
import TopNavigation from "@cloudscape-design/components/top-navigation";

  
function WalletRouter() {

  return (
    <TopNavigation
      identity={{
        href: "/",
        title: "AWS Wallet",
      }}
      utilities={[
        {
          type: "menu-dropdown",
          text: "Peggy",
          description: "",
          iconName: "user-profile",
          items: [
            {
              id: "menu-group",
              text: "Service",
              items: [
                { id: "wallet", text: "Wallet",href: "/wallet", },
                { id: "nft", text: "NFT",href: "/nft", },
              ]
            },
            { id: "signout", text: "Sign out" }
          ]
        }
        
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />
  );
  }
  
  export default WalletRouter;