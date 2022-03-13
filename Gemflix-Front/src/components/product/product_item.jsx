import { memo, React, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { addCart } from '../../store/actions';

const ProductItem = memo((props) => {

    const dispatch = useDispatch();
    const user = useSelector(store => store.userReducer, shallowEqual);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [count , setCount] = useState(1);

    const onClickUpdate = () => {
        //TODO
    }

    const onClickDelete = () => {
        //TODO
    }

    const changeCount = (event) => {
        setCount(event.target.value);
    }

    if(user.memberRole === 'ADMIN'){
        return (
            <>
                <div className='product_box' onClick={()=> setModalIsOpen(true)}>
                    <div className='product_img_box'>
                        <img className='product_img' src={props.base64} alt="product thumbnail"/>
                    </div>
                    <div className='product_text_box'>
                        <p className='product_name'>{props.name}</p>
                        <p className='product_price'>{props.price}원</p>
                    </div>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                    <div>
                        <div className='product_img_box'>
                            <img className='product_img' src={props.base64} alt="product thumbnail"/>
                        </div>
                        <div className='product_text_box'>
                            <p className='product_name'>{props.name}</p>
                            <p className='product_price'>{props.price}원</p>
                        </div>
                    </div>
                    <button type='button' onClick={onClickUpdate}>수정</button>
                    <button type='button' onClick={onClickDelete}>삭제</button>
                    <button type='button' onClick={()=> setModalIsOpen(false)}>취소</button>
                </Modal>
            </>
        );
    }else if(user.memberRole === 'MEMBER' || user.memberRole === 'NO_PERMISSION'){
        return (
            <>
                <div className='product_box' onClick={()=> setModalIsOpen(true)}>
                    <div className='product_img_box'>
                        <img className='product_img' src={props.base64} alt="product thumbnail"/>
                    </div>
                    <div className='product_text_box'>
                        <p className='product_name'>{props.name}</p>
                        <p className='product_price'>{props.price}원</p>
                    </div>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                    <div>
                        <div className='product_img_box'>
                            <img className='product_img' src={props.base64} alt="product thumbnail"/>
                        </div>
                        <div className='product_text_box'>
                            <p className='product_name'>{props.name}</p>
                            <p className='product_price'>{props.price}원</p>
                        </div>
                        <form className='cart_form'>
                            <label>수량 : </label>
                            <input className='product_count' value={count} type='number' min="1" max="10" onChange={changeCount}/><br/>
                            <label>총 금액 : </label>
                            <p className='product_total_price'>원</p>
                        </form>
                    </div>
                    <button type='button' onClick={() => dispatch(addCart(props))}>장바구니 담기</button>
                    <button type='button' onClick={()=> setModalIsOpen(false)}>취소</button>
                </Modal>
            </>
        );
    }else{
        return (
            <>
                <div className='product_box' onClick={()=> setModalIsOpen(true)}>
                    <div className='product_img_box'>
                        <img className='product_img' src={props.base64} alt="product thumbnail"/>
                    </div>
                    <div className='product_text_box'>
                        <p className='product_name'>{props.name}</p>
                        <p className='product_price'>{props.price}원</p>
                    </div>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                    <div>
                        <div className='product_img_box'>
                            <img className='product_img' src={props.base64} alt="product thumbnail"/>
                        </div>
                        <div className='product_text_box'>
                            <p className='product_name'>{props.name}</p>
                            <p className='product_price'>{props.price}원</p>
                        </div>
                    </div>
                    <button type='button' onClick={()=> setModalIsOpen(false)}>취소</button>
                </Modal>
            </>
        );
    }
});

export default ProductItem;