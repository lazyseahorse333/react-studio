import {Col, Divider, Row} from "antd";
import {useEffect, useState} from "react";

export const Cart = (props) => {
  const {lineItems} = props
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(()=>{
    // sum existing price of items in cart to display total
    const price = lineItems.reduce((accumulator, object) => {
      console.log(accumulator, object)
      return accumulator + object.price
    }, totalPrice)
    setTotalPrice(price)
  }, [props.lineItems])

  const nameFormatter = (item) => {
    return `${item.quantity}x ${item.name} `
  }

  return (
    <Row>
      {lineItems.map(row=>
         (
           <Col key={row.name} span={24}>
             <Row>
               <Col span={16}>
                  <p>{nameFormatter(row)}</p>
               </Col>
               <Col offset={4} span={4}>
                 <p>
                   {(row.price * row.quantity).toLocaleString('en-US',
                     {
                       style: 'currency',
                       currency: 'USD'
                     }
                   )}
                 </p>
               </Col>
             </Row>
           </Col>
        ))
      }
      {totalPrice !== 0 ?
        <>
          <Divider style={{marginBottom: 5}} />
          <Col span={24}>
            <Row>
              <Col span={16}>
                <p>
                  Total
                </p>
              </Col>
              <Col offset={4} span={4}>
                <p>
                  {totalPrice.toLocaleString('en-US',
                    {
                      style: 'currency',
                      currency: 'USD'
                    })
                  }
                </p>
              </Col>
            </Row>
          </Col>
        </>
        :
        <Col span={24}>
          <p>
            Add goodies to cart to proceed.
          </p>
        </Col>
      }
    </Row>
  )
}
