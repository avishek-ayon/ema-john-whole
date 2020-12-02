import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const{name,quantity,key,price,img }=props.product;
    const reviewItemStyle=
        {marginBottom:'5px',
        borderBottom:'1px solid lightgray',
        paddingBottom:'5px',
        display:'flex'
        
        
    };
    return (

        <div style={reviewItemStyle} className="review-item">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h3>{name}</h3>
                <p>Quantity:{quantity}</p>
                <p><small>${price}</small></p>
                <br/>
                <button 
                className="main-button"
                onClick={()=>props.removeProduct(key)}
                >Remove</button>
            </div>
           
        </div>
    );
};

export default ReviewItem;