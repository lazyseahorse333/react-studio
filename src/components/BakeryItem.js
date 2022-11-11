import {Button, Card, Col, Row} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";

export const BakeryItem = (props) => {
  const {item} = props
  return (
    <Card
      style={{borderRadius: 10, overflow: 'hidden', backgroundColor: '#A7A9E0', borderWidth: 0}}
      bodyStyle={{paddingRight: '10px', paddingLeft: '20px', }}
      hoverable
      className={'BakeryItem'}
      cover={
      <img className={'fill-container'} alt={item.name} src={item.image} />
    }
    >
      <Card.Meta
        className={'fill-container'}
        title={item.name} description={
          <>
            <Row style={{minHeight: '55px'}} >
              <Col span={24}>
                <p className={'line-clamp'}>
                  {item.description}
                </p>
              </Col>
            </Row>
            <Row style={{marginTop: 5}} align={'bottom'}>
              <Col style={{justifyItems: 'center'}} span={10}>
                <p style={{marginBottom: 5}}>
                  {item.price.toLocaleString('en-US',
                    {
                      style: 'currency',
                      currency: 'USD'
                    })
                  }
                </p>
              </Col>
              <Col style={{justifyItems: 'center'}} offset={2} span={12}>
                <Button
                  style={{borderRadius: '5px', backgroundColor: '#e9d3f5', borderWidth: 0}}
                  onClick={()=>props.onClick(item)}
                  icon={<ShoppingCartOutlined/>}>
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </>
        }
      />
    </Card>
  )
}
