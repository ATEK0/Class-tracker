import { Disclosure } from '@headlessui/react'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from "../../assets/logoClassTracker.png"
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


const NavBarMain = () => {
  const [cookies, setCookie] = useCookies();

  var navigation: any[] = [];

  if ( !cookies.session) {
    navigation = [
      { name: 'Home', href: '/', current: false },
      { name: 'Features', href: '/features', current: false },
      { name: 'Login', href: '/login', current: false },
      { name: 'Sign up', href: '/register', current: true },
    ]
  }  else {
    navigation = [
      { name: 'Home', href: '/', current: false, function: null },
      { name: 'Features', href: '/features', current: false },
      { name: 'Dashboard', href: '/dashboard', current: false },
      { name: 'Profile', href: '/profile', current: false },
      { name: 'Logout', href: '/logout', current: false },
    ]
  }

  return ( //"bg-gray-800 w-full fixed ease-in-out duration-500 mb-6"
    <Disclosure as="nav" className="bg-[#04304d] w-full fixed ease-in-out duration-500 mb-6 z-50"> 
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FontAwesomeIcon icon={faXmark} className="block h-6 w-6" />
                  ) : (
                    <FontAwesomeIcon icon={faBars} className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:justify-between md:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto"
                    src={Logo}
                    alt="Class Tracker Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.href}>
                      <a
                        key={item.name}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white hover:bg-gray-500' : 'text-white hover:text-white hover:bg-blue-500',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        
                      >
                        {item.name}
                      </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBarMain;