import React, { Component } from 'react';

class Aboutus extends Component
{
       
    render(){
        const img1 = require ('../Images/Flower1.jpg');
        const img2 = require ('../Images/Flower2.jpg');
        return (
            <React.Fragment>
                <div className="container bg-light text-primary p-2">
                    <div className="row align-items-center mb-3">
                        <div className="col-sm-6">
                            <p className="h2">About us</p>
                        </div>
                        <div className="col-sm-6">
                            
                            
                            
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <div className="col-sm-6 mt-3">
                            <img src={img1} alt="flowers" width="100%" className="rounded"></img>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <p className="h2">Chúng Tôi</p>
                            <p className="h6">luôn cam kết đặt chất lượng hoa luôn tươi mới lên hàng đầu giao cho khách. Với gần 10 năm kinh nghiệm phục vụ trong ngành điện hoa, chúng tôi thấu hiểu được mức độ quan trọng trong công việc của mình là truyền tải đúng và đủ thông điệp của người tặng đến người nhận.
                            </p>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                    <   div className="col-sm-6 mt-3">
                            <p className="h2">Đến với </p>
                            <p className="h6">chúng tôi bạn sẽ yên tâm về chất lượng phục vụ, chúng tôi cam kết giao hàng đúng thời gian và chất lượng như mong muốn.
Chúng tôi có nhiều mẫu hoa và sản phẩm hoa tươi đẹp: Bó hoa tươi, Giỏ hoa tươi, Bình hoa, Hoa chậu, Hoa cắt cành, Hoa cao cấp,  Hoa tươi Đà Lạt, Lẵng hoa tươi.
                            </p>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <img src={img2} alt="flowers" width="100%" className="rounded"></img>
                        </div>
                        
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default Aboutus;