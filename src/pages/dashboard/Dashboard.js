import React from 'react';
import { AiFillCreditCard, AiFillCopyrightCircle, AiFillSetting } from 'react-icons/ai';
import { BiCategory, BiUnite, BiGitPullRequest } from 'react-icons/bi';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { FaUsers, FaThList, FaUser } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { MdLocalPharmacy, MdSpaceDashboard } from 'react-icons/md';
import { TbTruckReturn, TbTruckDelivery } from 'react-icons/tb';
import { RiProductHuntFill, RiAdminFill, RiShoppingCartFill, RiProfileFill, RiFileDamageFill } from 'react-icons/ri';
import { Link, Outlet } from 'react-router-dom';
import LinkComponents from '../../components/navbar/LinkComponents';
import UserNavbar from '../../components/UserNavbar';
import logo from '../../Assets/logo.png';
import DetailsComponent from '../../components/navbar/DetailsComponent';
import { useAuth } from '../../hooks/useAuth';
const Dashboard = () => {
    const {role} = useAuth()
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard" className="drawer-toggle" />
            <div className="drawer-content relative z-50">

                <UserNavbar />
                <Outlet />
            </div>
            <div className="drawer-side lg:bg-white md:bg-white w-52 lg:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <label htmlFor="dashboard" className="drawer-overlay"></label>
                <div className="flex flex-col justify-between">
                    <nav className="flex flex-col mt-6 space-y-2">
                        <Link className="text-xl font-semibold uppercase flex items-center mb-8" to='/'>
                            <img className='w-20 ml-4' src={logo} alt="logo" />
                        
                        </Link>

                        {['superAdmin', 'stockLeader'].includes(role.role) && <LinkComponents to={''} icon={<MdSpaceDashboard className='text-lg' />} name={'Dashboard'} />}

                       {['superAdmin', 'apms', 'comercialLeader'].includes(role.role) &&  <DetailsComponent
                            icon={<RiProductHuntFill className='text-lg' />}
                            name={'Productos'}
                            subMenus={
                                [
                                    <LinkComponents
                                        to={'products/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Productos'} />,

                                    <LinkComponents
                                        to={'products/non-pharmacy'}
                                        icon={<RiProfileFill className='text-lg' />}
                                        name={'Movimientos'} />
                                ]
                            } />}

                        {/* <DetailsComponent
                            icon={<BiGitPullRequest className='text-lg' />}
                            name={'Requested Items'}
                            subMenus={
                                [
                                    <LinkComponents
                                        to={'requested-items/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Pharmacy'} />,

                                    <LinkComponents
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
                                        to={'orders/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Pharmacy'} />,

                                    <LinkComponents
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
                                        to={'purchases/pharmacy'}
                                        icon={<MdLocalPharmacy className='text-lg' />}
                                        name={'Pharmacy'} />,

                                    <LinkComponents
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
                                        to={'returns/customers'}
                                        icon={<FaUser className='text-lg' />}
                                        name={'Customers'} />,

                                    <LinkComponents
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
                                        to={'setup/categories'}
                                        icon={<BiCategory className='text-lg' />}
                                        name={'Categories'} />,

                                    <LinkComponents
                                        to={'setup/unit-types'}
                                        icon={<BiUnite className='text-lg' />}
                                        name={'Unit Types'} />,

                                    <LinkComponents
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
                                        to={'suppliers/lists'}
                                        icon={<FaThList className='text-md' />}
                                        name={'Lists'} />,

                                    <LinkComponents
                                        to={'suppliers/payments'}
                                        icon={<BsCreditCard2BackFill className='text-lg' />}
                                        name={'Payments'} />,

                                    <LinkComponents
                                        to={'suppliers/documents'}
                                        icon={<HiDocumentText className='text-lg' />}
                                        name={'Documents'} />
                                ]
                            } /> */}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;