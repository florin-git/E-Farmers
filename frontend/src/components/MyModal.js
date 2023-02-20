import Modal from 'react-bootstrap/Modal';
import "../my_css/PaymentOrderFE/Modal.css"

function MyModal(props){
    return(
        <Modal
        {...props}
        size = "lg"
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        >
            <Modal.Body >
                <div className="card4">
                <div className="title">Purchase Reciept</div>
                <div className="info">
                    <div className="row">
                        <div className="col-7">
                            <span id="heading">Date</span>
                            <span id="details">10 October 2018</span>
                        </div>
                        <div className="col-5 pull-right">
                            <span id="heading">Order No.</span>
                            <span id="details">012j1gvs356c</span>
                        </div>
                    </div>      
                </div>      
                <div className="pricing">
                    <div className="row">
                        <div className="col-9">
                            <span id="name">BEATS Solo 3 Wireless Headphones</span>  
                        </div>
                        <div className="col-3">
                            <span id="price">&pound;299.99</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <span id="name">Shipping</span>
                        </div>
                        <div className="col-3">
                            <span id="price">&pound;33.00</span>
                        </div>
                    </div>
                </div>
                <div className="total">
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-3"><big>&pound;262.99</big></div>
                    </div>
                </div>
                <div className="tracking">
                    <div className="title">Tracking Order</div>
                </div>
                <div className="progress-track">
                    <ul id="progressbar">
                        <li className="step0 active " id="step1">Ordered</li>
                        <li className="step0 active text-center" id="step2">Shipped</li>
                        <li className="step0 active text-right" id="step3">On the way</li>
                        <li className="step0 text-right" id="step4">Delivered</li>
                    </ul>
                </div>
                

                <div className="footer">
                    <div className="row">
                        <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/YBWc55P.png"/></div>
                        <div className="col-10">Want any help? Please &nbsp;<a> contact us</a></div>
                    </div>
                    
                
                </div>
                </div>
            </Modal.Body>
        </Modal>
    );
} export default MyModal

