import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../authContext';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function Navbar(){
    
    const { isAuthenticated, handleLogOut, ToastContainer, loggedOut, setLoggedOut } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(loggedOut){
            setLoggedOut(false);
            navigate('/');
        }
    }, [navigate, loggedOut, setLoggedOut]);
    
    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="min-w-32 max-w-96 flex flex-1 justify-between sm:items-stretch sm:justify-between">
                                    <div className="mx-1 flex flex-shrink-0 items-center">
                                        <Link to={'/'} className='text-white lg:text-2xl font-bold sm:text-xl'>
                                            Busy Buy
                                        </Link>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            <NavLink
                                                to={'/'}
                                                style={({isActive}) => isActive ? {color: 'violet'} : null}
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                                            >
                                                Home
                                            </NavLink>
                                            <NavLink 
                                                to={'/orders'}
                                                style={({isActive}) => isActive ? {color: 'violet'} : null}
                                                className={`text-gray-300 ${isAuthenticated ? 'block' : 'hidden'} hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                                            >
                                                Orders
                                            </NavLink>
                                            <NavLink 
                                                to={'/cart'}
                                                style={({isActive}) => isActive ? {color: 'violet'} : null}
                                                className={`text-gray-300 ${isAuthenticated ? 'block' : 'hidden'} hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                                            >
                                                Cart
                                            </NavLink>
                                            <NavLink 
                                                to={isAuthenticated ? null : '/login'}
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium' 
                                                onClick={() => isAuthenticated ? handleLogOut() : null}
                                            >
                                                {isAuthenticated ? 'Logout' : 'Sign In'}
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                <NavLink
                                    to={'/'}
                                    style={({isActive}) => isActive ? {color: 'violet'} : null}
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                                >
                                    Home
                                </NavLink>  
                                <NavLink 
                                    to={'/orders'}
                                    style={({isActive}) => isActive ? {color: 'violet'} : null}
                                    className={`text-gray-300 ${isAuthenticated ? 'block' : 'hidden'} hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
                                >
                                    Orders
                                </NavLink>
                                <NavLink 
                                    to={'/cart'}
                                    style={({isActive}) => isActive ? {color: 'violet'} : null}
                                    className={`text-gray-300 ${isAuthenticated ? 'block' : 'hidden'} hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
                                >
                                    Cart
                                </NavLink>
                                <Link
                                    to={isAuthenticated ? null : '/login'}
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium' 
                                    onClick={() => isAuthenticated ? handleLogOut() : null}
                                >
                                    {isAuthenticated ? 'Logout' : 'Sign In'}
                                </Link>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <ToastContainer />
        </>
    )

}

export default Navbar;