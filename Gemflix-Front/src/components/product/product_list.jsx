import { React, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ProductItem from './product_item';
import { deleteCartByAdmin } from '../../store/actions';

const ProductList = ({server}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.userReducer, shallowEqual);
    const [products, setProducts] = useState([]);
    const [textCategories, setTextCategories] = useState([]);
    const [categories, setCategories] = useState(new Map());
    const [refreshCnt, setRefreshCnt] = useState(0);

    const onClickCreate = () => {
        navigate('/product/create', { state: { categories: categories } });
    }

    useEffect(() => {
        //get category
        getCategories();

        //get product
        getProducts();
    }, [refreshCnt]);

    const getCategories = () => {
        server.category()
        .then(response => {
            const data = response.data;
            data.map(category => {
                setCategories(categories.set(category.cgId, category.cgName));
            });
        })
        .catch(ex => {
            console.log("category requset fail : " + ex);
        })
        .finally(() => {
            console.log("category request end");
        });
    }

    const getProducts = () => {
        server.products()
        .then(response => {
            const products = response.data;
            setProducts(products);
            
            const tempCt = [...categories.values()];
            setTextCategories(tempCt);
        })
        .catch(ex => {
            console.log("products requset fail : " + ex);
        })
        .finally(() => {
            console.log("products request end");
        });
    }

    const handleDeleteProduct = (prId) => {
        server.deleteProduct(prId)
            .then(response => {
                const code = response.code;
                if(code === 1000){ //success
                    //???????????? ???????????? ???????????? ????????????
                    dispatch(deleteCartByAdmin(prId));
                    alert("?????????????????????.");
                    setRefreshCnt(refreshCnt + 1);
                }else{ //fail
                    alert(response.message);
                }
            })
            .catch(ex => {
                console.log("deleteProduct requset fail : " + ex);
            })
            .finally(() => {
                console.log("deleteProduct request end");
            });

    }


    if(user.memberRole === 'ADMIN'){
        if(products == null){
            return (
                <div className='product'>
                    <div className='product_buttons'>
                        <button className='white_btn' type="button" onClick={onClickCreate}>????????????</button>
                    </div>
                    <div className='product_none'>????????? ????????? ????????????.</div>
                </div>
            );
        }else{
            return (
                <div className='product'>
                    <div className='product_buttons'>
                        <button className='white_btn' type="button" onClick={onClickCreate}>????????????</button>
                    </div>
                    <div>
                        {
                        textCategories.map((category, index) => {
                            if(products.filter((product) => (product.category.cgName === category)) != 0){
                                return <div key={index}>
                                    <div className='product_category'>{category}</div>
                                    <div className='product_list'>
                                        {
                                        products
                                        .filter((product) => (product.category.cgName === category))
                                        .map((product) => (
                                            <ProductItem 
                                                key={product.prId} name={product.name} 
                                                price={product.price} base64={product.base64} 
                                                content={product.content} status={product.status} prId={product.prId}
                                                categories={categories} category={category} categoryIdx={product.category.cgId}
                                                handleDeleteProduct={handleDeleteProduct}/>
                                        ))
                                        }
                                    </div>
                                </div>
                            }
                        })
                        }
                    </div>
                </div>
            );
        }
        
    }else{
        return (
            <div className='product'>
                <div>
                        {
                        textCategories.map((category, index) => {
                            if(products.filter((product) => (product.category.cgName === category)) != 0){
                                return <div key={index}>
                                    <div className='product_category'>{category}</div>
                                    <div className='product_list'>
                                        {
                                        products
                                        .filter((product) => (product.category.cgName === category))
                                        .map((product) => (
                                            <ProductItem 
                                                key={product.prId} name={product.name} 
                                                price={product.price} base64={product.base64} 
                                                content={product.content} status={product.status} prId={product.prId}
                                                categories={categories} category={category} categoryIdx={product.category.cgId}/>   
                                        ))
                                        }
                                    </div>
                                </div>
                            }
                        })
                        }
                    </div>
            </div>
        );
    }
};

export default ProductList;