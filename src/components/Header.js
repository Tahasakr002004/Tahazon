import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/tahazon-header-logo.png"
import searchIcon from "../images/icons/searchIcon.png";
import style from '../cssModules/header.module.css';
import { useAuth } from '../context/globalState.js';
import { auth } from "../firebase";
import { BsMinecartLoaded } from 'react-icons/bs'
import { FaSearchPlus } from 'react-icons/fa'



function Header () {
  const { user, basket } = useAuth();
  
  // console.log('user:', user );
  // console.log( 'basket:', basket);
  const handleAuthentication = () => {
    auth.signOut();
  }



///////////////////////////////////////////////////////////
  return (
    <div className={style.header}>
      <Link to="/">
        <img className={style['header-logo']} src={Logo} alt="amazon-log"/>
      </Link>
      <div className={style['header-search']}>
        <input className={style['header-searchInput']} type="text" />
         <FaSearchPlus className={style['header-searchIcon']} src={searchIcon} />
      </div>
      <div className={style['header-nav']}>
        <Link to={ !user && "/login"}>
            <div className={style['header-option']} onClick={handleAuthentication}>
            <div className={style['header-optionLineOne']}>Hello{user ? ` ${user.email}` : " Guest"} </div>
            <div className={style['header-optionLineTwo']}>{user ? 'Sign out' : 'Sign in'}</div>
        </div>
        </Link>
        <Link to="/orders">
           <div className={style['header-option']}>
              <div className={style['header-optionLineOne']}>Returns</div>
              <div className={style['header-optionLineTwo']}>& Orders</div>
        </div>
        </Link>
        <div className={style['header-option']}>
              <div className={style['header-optionLineOne']}>Your</div>
              <div className={style['header-optionLineTwo']}>Prime</div>
        </div>
         <Link to="/checkout">
          <div className={style['header-optionBasket']}>
            <BsMinecartLoaded className={style['icon-basket']} />
            <span className={style['header-optionLineTwo header-basketCount']}>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header;
            //  <img src={shoppingCart}  alt="shoppingbasket"/>
