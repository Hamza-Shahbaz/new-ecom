import React from "react";

const ProductAdditionalInformation = ({productInfo}) => {

  const attributes = Object.values(productInfo?.attribute_payload || {})
  if(attributes.length < 1) {
    return <></>
  }

  return (
    <div className="tab-pane fade active show">
      <div className="row mt-3">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <table className="table table-striped">
            <tbody>
              {attributes.map((entry, index) => {
                if(!entry.value) {
                  return <></>
                }
                return (<tr key={`${index} tr`}>
                  <th>{entry.attribute_title}</th>
                  <td>{entry.value}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductAdditionalInformation;
