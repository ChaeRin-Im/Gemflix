// Action Creators
//로그인
export const userLogin = (accessToken, memberId, memberRole) => {
    return {
        type: "LOGIN",
        payload: {accessToken, memberId, memberRole}
    }
}
//로그아웃
export const userLogout = () => {
    return {
        type: "LOGOUT"
    }
}
//장바구니에 담기
export const addCart = (item, count, totalPrice, memberId) => {
    count = Number(count);
    totalPrice = Number(totalPrice);
    return {
        type: "ADD_ITEM",
        payload: {item, count, totalPrice, memberId}
    }
}
//장바구니에서 삭제
export const deleteCart = (deleteAfterMemberItems, memberId) => {
    return {
        type:"DELETE_ITEM",
        payload: {deleteAfterMemberItems, memberId}
    }
}
//장바구니에서 아이템 삭제
export const deleteCartItem = (memberId, checkIdList) => {
    return {
        type:"DELETE_CART_ITEM",
        payload: {memberId, checkIdList}
    }
}

//장바구니에서 해당 멤버의 장바구니 삭제
export const deleteCartByMember = (memberId) => {
    return {
        type:"DELETE_ITEM_BY_MEMBER",
        payload: {memberId}
    }
}

//관리자가 상품 수정시 회원들의 장바구니의 상품 수정
export const modifyCartByAdmin = (prId, name, price, base64) => {
    prId = Number(prId);
    price = Number(price);
    return {
        type: "MODIFY_ITEM_BY_ADMIN",
        payload: {prId, name, price, base64}
    }
}

//관리자가 상품 삭제시 회원들의 장바구니의 상품 삭제
export const deleteCartByAdmin = (prId) => {
    prId = Number(prId);
    return {
        type: "DELETE_ITEM_BY_ADMIN",
        payload: {prId}
    }
}