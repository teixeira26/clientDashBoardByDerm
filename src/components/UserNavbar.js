import React, { useEffect } from 'react';
import logo from '../Assets/logo.png';
import { RiSettings5Fill, RiProfileLine, RiLogoutBoxRFill, RiProductHuntFill, RiProfileFill, RiShoppingCartFill, RiFileDamageFill, RiAdminFill } from 'react-icons/ri';
import { MdLocalPharmacy, MdSpaceDashboard } from 'react-icons/md';
import { BiMenuAltRight } from 'react-icons/bi';
import DetailsComponent from './navbar/DetailsComponent';
import LinkComponents from './navbar/LinkComponents';
import UserLinkComponents from './navbar/UserLinkComponents';
import user from '../Assets/user.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const UserNavbar = () => {
    const {role} = useAuth();

    return (
        
        <div className="navbar bg-white fixed top-0 left-0 right-0 z-50 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="navbar-start">
                <Link to='/' className="text-xl font-semibold uppercase flex items-center md:hidden lg:hidden">
                    <img className='w-20' src={logo} alt="logo" />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">

            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end hidden md:block lg:block">
                    <div tabIndex="0" className='flex items-center cursor-pointer'>
                        <p className='mr-4'>{role.name}</p>
                        <label className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user} alt='user avatar' />
                            </div>
                        </label>
                    </div>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <UserLinkComponents
                            to={'/profile'}
                            icon={<RiProfileLine className='text-lg' />}
                            name={'Profile'}
                            extraComponent={<span className="badge">New</span>} />

                        <UserLinkComponents
                            to={'/settings'}
                            icon={<RiSettings5Fill className='text-lg' />}
                            name={'Settings'} />

                        <UserLinkComponents
                            to={'/'}
                            icon={<RiLogoutBoxRFill className='text-lg' />}
                            name={'Logout'} />
                    </ul>
                </div>

                <div className="dropdown dropdown-left">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <BiMenuAltRight className='text-2xl font-bold' />
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {['superAdmin', 'stockLeader'].includes(role.role) && <LinkComponents to={''} icon={<MdSpaceDashboard className='text-lg' />} name={'Dashboard'} />}

                        { ['superAdmin', 'apms', 'comercialLeader'].includes(role.role) && <DetailsComponent
                            icon={<RiProductHuntFill className='text-lg' />}
                            name={'Productos'}
                            subMenus={
                                [
                                    <LinkComponents
                                        key={1}
                                        to={'products/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Productos'} />,

                                    <LinkComponents
                                        key={2}
                                        to={'products/non-pharmacy'}
                                        icon={<RiProfileFill className='text-lg' />}
                                        name={'Movimientos'} />
                                ]
                            } />
}
                        {/* <DetailsComponent
                            icon={<BiGitPullRequest className='text-lg' />}
                            name={'Requested Items'}
                            subMenus={
                                [
                                    <LinkComponents
                                        key={3}
                                        to={'requested-items/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Pharmacy'} />,

                                    <LinkComponents
                                        key={4}
                                        to={'requested-items/non-pharmacy'}
                                        icon={<RiProfileFill className='text-lg' />}
                                        name={'Non Pharmacy'} />
                                ]
                            } />

                        <DetailsComponent
                            icon={<RiShoppingCartFill className='text-lg' />}
                            name={'Orders'}
                            subMenus={
                                [
                                    <LinkComponents
                                        key={5}
                                        to={'orders/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Pharmacy'} />,

                                    <LinkComponents
                                        key={6}
                                        to={'orders/non-pharmacy'}
                                        icon={<RiProfileFill className='text-lg' />}
                                        name={'Non Pharmacy'} />
                                ]
                            } />

                        <DetailsComponent
                            icon={<AiFillCreditCard className='text-lg' />}
                            name={'Purchases'}
                            subMenus={
                                [
                                    <LinkComponents
                                        key={7}
                                        to={'purchases/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Pharmacy'} />,

                                    <LinkComponents
                                        key={8}
                                        to={'purchases/non-pharmacy'}
                                        icon={<RiProfileFill className='text-lg' />}
                                        name={'Non Pharmacy'} />
                                ]
                            } />

                        <DetailsComponent
                            icon={<TbTruckReturn className='text-lg' />}
                            name={'Returns'}
                            subMenus={
                                [
                                    <LinkComponents
                                        key={9}
                                        to={'returns/customers'}
                                        icon={<FaUser className='text-lg' />}
                                        name={'Customer'} />,

                                    <LinkComponents
                                        key={10}
                                        to={'returns/expires-or-damages'}
                                        icon={<RiFileDamageFill className='text-lg' />}
                                        name={'Expires / Damages'} />
                                ]
                            } />

                        <DetailsComponent
                            icon={<AiFillSetting className='text-lg' />}
                            name={'Setup'}
                            subMenus={
                                [
                                    <LinkComponents
                                        key={11}
                                        to={'setup/categories'}
                                        icon={<BiCategory className='text-lg' />}
                                        name={'Categories'} />,

                                    <LinkComponents
                                        key={12}
                                        to={'setup/unit-types'}
                                        icon={<BiUnite className='text-lg' />}
                                        name={'Unit Types'} />,

                                    <LinkComponents
                                        key={13}
                                        to={'setup/companies'}
                                        icon={<AiFillCopyrightCircle className='text-lg' />}
                                        name={'Companies'} />
                                ]
                            } />

                        <LinkComponents to={'employees'} icon={<RiAdminFill className='text-lg' />} name={'Employees'} />

                        <LinkComponents to={'customers'} icon={<FaUsers className='text-lg' />} name={'Customers'} />

                        <DetailsComponent
                            icon={<TbTruckDelivery className='text-lg' />}
                            name={'Suppliers'}
                            subMenus={
                                [
                                    <LinkComponents
                                        key={14}
                                        to={'suppliers/lists'}
                                        icon={<FaThList className='text-md' />}
                                        name={'Lists'} />,

                                    <LinkComponents
                                        key={15}
                                        to={'suppliers/payments'}
                                        icon={<BsCreditCard2BackFill className='text-lg' />}
                                        name={'Payments'} />,

                                    <LinkComponents
                                        key={16}
                                        to={'suppliers/documents'}
                                        icon={<HiDocumentText className='text-lg' />}
                                        name={'Documents'} />
                                ]
                            } /> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;