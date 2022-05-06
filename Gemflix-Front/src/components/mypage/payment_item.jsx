import React from "react";

const PaymentItem = (props) => {
  const payment = props.payment;
  const paidProducts = payment.paidProducts;

  const inputPriceFormat = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };

  return (
    <div>
      <div className="payment_item">
        <h3>결제번호 : {payment.pmId}</h3>
        <p>결제일시 : {payment.payDate}</p>
        {paidProducts.map((paidProduct, index) => {
          return (
            <div key={index}>
              <div className="cart_item">
                <div className="cart_img">
                  <img
                    className="preview"
                    // src={base64}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="cart_content">
                  <h4>{paidProduct.product.name}</h4>
                  <p>수량 : {paidProduct.count}</p>
                  <p>가격 : {inputPriceFormat(paidProduct.price)} 원</p>
                </div>
              </div>
            </div>
          );
        })}
        <p>상품금액 : {inputPriceFormat(payment.proAmount)} 원</p>
        <p>할인금액 : {inputPriceFormat(payment.disAmount)} 원</p>
        <p>결제금액 : {inputPriceFormat(payment.payAmount)} 원</p>
      </div>
    </div>
  );
};

export default PaymentItem;
