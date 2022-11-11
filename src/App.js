import "./App.css";
import 'antd/dist/antd.css'
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import {BakeryItem} from "./components/BakeryItem";
import {Affix, Col, Divider, Layout, message, PageHeader, Row} from "antd";
import {Cart} from "./components/Cart";
import {Content} from "antd/es/layout/layout";
import {ShoppingOutlined} from "@ant-design/icons";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

export const App = () => {

  /*
  interface CartItem {
    name: string;
    quantity: string;
    price: string;
  }
   */
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {

    let newItem = {
      name: item.name,
      quantity: 1,
      price: item.price
    }
    // if cart is empty, simply add the item with quantity as 1
    if (cartItems.length === 0)
      setCartItems([newItem])
    else {
      // find the index of the current item to update it in place.
      // using the index ensures cart lines don't jump around
      const existingItemIndex = cartItems.findIndex(row=>row.name === item.name)
      const tmpCartItems = [...cartItems]

      // if item is found, increment the quantity
      if (existingItemIndex !== -1){
        newItem = tmpCartItems[existingItemIndex]
        newItem.quantity ++
      }
      // otherwise add it as a new item
      else
        tmpCartItems.push(newItem)

      setCartItems(tmpCartItems)
    }
    // provide feedback to user
    message.success(`Added ${newItem.quantity} of ${newItem.name} to cart!`)
  }

  return (
    <Layout>
      <Content style={{background: '#DABFFF'}} >
      <Row>
        <PageHeader

          className="site-page-header"
          title="Glen's Bakehouse"
        />
      </Row>
      <Row style={{paddingLeft: 25}} type="flex">
        <Col
          style={{marginRight: '10px'}}
          span={18}
        >
          <Row type="flex">
            {bakeryData.map((item) => (
              <Col
                style={{marginBottom: 30}}
                xs={24}
                md={12}
                xl={8}
              >
                <BakeryItem item={item} onClick={addToCart}/>
              </Col>
            ))}
          </Row>
        </Col>
          <Col
            className="gutter-row"
            span={4}
            sm={{span: 3, offset: 1}}
          >

            <Affix offsetTop={20}>
            <div>
              <Divider type={'vertical'} style={{height: '100%', borderWidth: '2px'}}/>
              <h2>Cart <ShoppingOutlined /></h2>
              <Cart lineItems={cartItems}/>
            </div>
          </Affix>
          </Col>
      </Row>
      </Content>
    </Layout>
  );
}
