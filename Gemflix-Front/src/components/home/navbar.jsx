import { React} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

const Navbar = ({server, onClickLogout}) => {

    const user = useSelector(store => store.userReducer, shallowEqual);
    const navigate = useNavigate();

    const onClickProfile = () => {
        //server reqeust
        server.profile()
        .then(response => {
            const code = response.code;
            switch(code){
                case 1007: //interceptor에서 accessToken 재발급
                    break;

                case 1000: //success
                    navigate('/profile', { state: { 
                        memberInfo: response.data
                    } });
                    break;

                case 1008: //refreshToken 만료 -> 로그아웃
                    onClickLogout(true);
                    break;

                default: //fail
                    alert("해당 작업을 수행할 수 없습니다. 잠시 후 다시 시도해주세요.");
                    navigate('/');
                    break;
            }
        })
        .catch(ex => {
            console.log("profile requset fail : " + ex);
        })
        .finally(() => {
            console.log("profile request end");
        });
    }

    const onClickLogoutBtn = () => {
        onClickLogout(false);
    }

    if(user.loggedIn){
        return (
            <>
            <nav className='navbar'>
              <ul className='navbar_menu'>
                <li><Link className='navbar_menu_link' to="/reserve"><p className='navbar_menu_link_text'>예매</p></Link></li>
                <li><Link className='navbar_menu_link' to="/movies"><p className='navbar_menu_link_text'>영화</p></Link></li>
                <li><Link className='navbar_menu_link' to="/products"><p className='navbar_menu_link_text'>스토어</p></Link></li>
              </ul>
              <ul className='navbar_member_button'>
                <li>{user.memberId} 님</li>
                <li><button className='white_btn' type='button' onClick={onClickProfile}>마이페이지</button></li>
                <li><button className='white_btn' type='button' onClick={onClickLogoutBtn}>로그아웃</button></li>
              </ul>
            </nav>
            </>
        );
    }else{
        return (
            <>
            <nav className='navbar'>
              <ul className='navbar_menu'>
                <li><Link className='navbar_menu_link' to="/reserve"><p className='navbar_menu_link_text'>예매</p></Link></li>
                <li><Link className='navbar_menu_link' to="/movies"><p className='navbar_menu_link_text'>영화</p></Link></li>
                <li><Link className='navbar_menu_link' to="/products"><p className='navbar_menu_link_text'>스토어</p></Link></li>
              </ul>
              <ul className='navbar_member_button'>
                <li><button className='white_btn' type='button' onClick={()=> { navigate('/login'); }}>로그인</button></li>
              </ul>
            </nav>
            </>
        );
    }
};

export default Navbar;