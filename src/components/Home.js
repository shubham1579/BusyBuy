import Navbar from './Navbar';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useProductValue } from '../productContext';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const sortOptions = [
    { name: 'Price: Low to High', current: false },
    { name: 'Price: High to Low', current: false }
]

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'All', label: 'All', checked: false },
            { value: 'smartphones', label: 'Smart Phone', checked: false },
            { value: 'laptops', label: 'Laptop', checked: false },
            { value: 'fragrances', label: 'Fragrances', checked: false },
            { value: 'skincare', label: 'Skin care', checked: false },
            { value: 'groceries', label: 'Groceries', checked: false },
            { value: 'home-decoration', label: 'Home Decoration', checked: false },
            { value: 'furniture', label: 'Furniture', checked: false },
            { value: 'tops', label: 'Tops', checked: false },
            { value: 'womens-dresses', label: "Women's Dresses", checked: false },
            { value: 'womens-shoes', label: "Women's Shoes", checked: false },
            { value: 'mens-shirts', label: "Men's Shirts", checked: false },
            { value: 'mens-shoes', label: "Men's Shoes", checked: false },
            { value: 'mens-watches', label: "Men's Watches", checked: false },
            { value: 'womens-watches', label: "Women's Watches", checked: false },
            { value: 'womens-bags', label: "Women's Bags", checked: false },
            { value: 'womens-jewellery', label: "Women's Jewellery", checked: false },
            { value: 'sunglasses', label: 'Sunglasses', checked: false },
            { value: 'automotive', label: 'Automotive', checked: false },
            { value: 'motorcycle', label: 'Motorcycle', checked: false },
            { value: 'lighting', label: 'Lighting', checked: false }
        ]
    },
    {
        id: 'brands',
        name: 'Brands',
        options: [
            {
              value: "Apple",
              label: "Apple",
              checked: false
            },
            {
              value: "Samsung",
              label: "Samsung",
              checked: false
            },
            {
              value: "OPPO",
              label: "OPPO",
              checked: false
            },
            {
              value: "Huawei",
              label: "Huawei",
              checked: false
            },
            {
              value: "Microsoft Surface",
              label: "Microsoft Surface",
              checked: false
            },
            {
              value: "Infinix",
              label: "Infinix",
              checked: false
            },
            {
              value: "HP Pavilion",
              label: "HP Pavilion",
              checked: false
            },
            {
              value: "Impression of Acqua Di Gio",
              label: "Impression of Acqua Di Gio",
              checked: false
            },
            {
              value: "Royal_Mirage",
              label: "Royal_Mirage",
              checked: false
            },
            {
              value: "Fog Scent Xpressio",
              label: "Fog Scent Xpressio",
              checked: false
            },
            {
              value: "Al Munakh",
              label: "Al Munakh",
              checked: false
            },
            {
              value: "Lord - Al-Rehab",
              label: "Lord   Al Rehab",
              checked: false
            },
            {
              value: "L'Oreal Paris",
              label: "L'Oreal Paris",
              checked: false
            },
            {
              value: "Hemani Tea",
              label: "Hemani Tea",
              checked: false
            },
            {
              value: "Dermive",
              label: "Dermive",
              checked: false
            },
            {
              value: "ROREC White Rice",
              label: "ROREC White Rice",
              checked: false
            },
            {
              value: "Fair & Clear",
              label: "Fair & Clear",
              checked: false
            },
            {
              value: "Saaf & Khaas",
              label: "Saaf & Khaas",
              checked: false
            },
            {
              value: "Bake Parlor Big",
              label: "Bake Parlor Big",
              checked: false
            },
            {
              value: "Baking Food Items",
              label: "Baking Food Items",
              checked: false
            },
            {
              value: "fauji",
              label: "fauji",
              checked: false
            },
            {
              value: "Dry Rose",
              label: "Dry Rose",
              checked: false
            },
            {
              value: "Boho Decor",
              label: "Boho Decor",
              checked: false
            },
            {
              value: "Flying Wooden",
              label: "Flying Wooden",
              checked: false
            },
            {
              value: "LED Lights",
              label: "LED Lights",
              checked: false
            },
            {
              value: "luxury palace",
              label: "luxury palace",
              checked: false
            },
            {
              value: "Golden",
              label: "Golden",
              checked: false
            },
            {
              value: "Furniture Bed Set",
              label: "Furniture Bed Set",
              checked: false
            },
            {
              value: "Ratttan Outdoor",
              label: "Ratttan Outdoor",
              checked: false
            },
            {
              value: "Kitchen Shelf",
              label: "Kitchen Shelf",
              checked: false
            },
            {
              value: "Multi Purpose",
              label: "Multi Purpose",
              checked: false
            },
            {
              value: "AmnaMart",
              label: "AmnaMart",
              checked: false
            },
            {
              value: "Professional Wear",
              label: "Professional Wear",
              checked: false
            },
            {
              value: "Soft Cotton",
              label: "Soft Cotton",
              checked: false
            },
            {
              value: "Top Sweater",
              label: "Top Sweater",
              checked: false
            },
            {
              value: "RED MICKY MOUSE..",
              label: "RED MICKY MOUSE..",
              checked: false
            },
            {
              value: "Digital Printed",
              label: "Digital Printed",
              checked: false
            },
            {
              value: "Ghazi Fabric",
              label: "Ghazi Fabric",
              checked: false
            },
            {
              value: "IELGY",
              label: "IELGY",
              checked: false
            },
            {
              value: "IELGY fashion",
              label: "IELGY fashion",
              checked: false
            },
            {
              value: "Synthetic Leather",
              label: "Synthetic Leather",
              checked: false
            },
            {
              value: "Sandals Flip Flops",
              label: "Sandals Flip Flops",
              checked: false
            },
            {
              value: "Maasai Sandals",
              label: "Maasai Sandals",
              checked: false
            },
            {
              value: "Arrivals Genuine",
              label: "Arrivals Genuine",
              checked: false
            },
            {
              value: "Vintage Apparel",
              label: "Vintage Apparel",
              checked: false
            },
            {
              value: "FREE FIRE",
              label: "FREE FIRE",
              checked: false
            },
            {
              value: "The Warehouse",
              label: "The Warehouse",
              checked: false
            },
            {
              value: "Sneakers",
              label: "Sneakers",
              checked: false
            },
            {
              value: "Rubber",
              label: "Rubber",
              checked: false
            },
            {
              value: "Naviforce",
              label: "Naviforce",
              checked: false
            },
            {
              value: "SKMEI 9117",
              label: "SKMEI 9117",
              checked: false
            },
            {
              value: "Strap Skeleton",
              label: "Strap Skeleton",
              checked: false
            },
            {
              value: "Stainless",
              label: "Stainless",
              checked: false
            },
            {
              value: "Eastern Watches",
              label: "Eastern Watches",
              checked: false
            },
            {
              value: "Luxury Digital",
              label: "Luxury Digital",
              checked: false
            },
            {
              value: "Watch Pearls",
              label: "Watch Pearls",
              checked: false
            },
            {
              value: "Bracelet",
              label: "Bracelet",
              checked: false
            },
            {
              value: "LouisWill",
              label: "LouisWill",
              checked: false
            },
            {
              value: "Copenhagen Luxe",
              label: "Copenhagen Luxe",
              checked: false
            },
            {
              value: "Steal Frame",
              label: "Steal Frame",
              checked: false
            },
            {
              value: "Darojay",
              label: "Darojay",
              checked: false
            },
            {
              value: "Fashion Jewellery",
              label: "Fashion Jewellery",
              checked: false
            },
            {
              value: "Cuff Butterfly",
              label: "Cuff Butterfly",
              checked: false
            },
            {
              value: "Designer Sun Glasses",
              label: "Designer Sun Glasses",
              checked: false
            },
            {
              value: "mastar watch",
              label: "mastar watch",
              checked: false
            },
            {
              value: "Car Aux",
              label: "Car Aux",
              checked: false
            },
            {
              value: "W1209 DC12V",
              label: "W1209 DC12V",
              checked: false
            },
            {
              value: "TC Reusable",
              label: "TC Reusable",
              checked: false
            },
            {
              value: "Neon LED Light",
              label: "Neon LED Light",
              checked: false
            },
            {
              value: "METRO 70cc Motorcycle - MR70",
              label: "METRO 70cc Motorcycle   MR70",
              checked: false
            },
            {
              value: "BRAVE BULL",
              label: "BRAVE BULL",
              checked: false
            },
            {
              value: "shock absorber",
              label: "shock absorber",
              checked: false
            },
            {
              value: "JIEPOLLY",
              label: "JIEPOLLY",
              checked: false
            },
            {
              value: "Xiangle",
              label: "Xiangle",
              checked: false
            },
            {
              value: "lightingbrilliance",
              label: "lightingbrilliance",
              checked: false
            },
            {
              value: "Ifei Home",
              label: "Ifei Home",
              checked: false
            },
            {
              value: "DADAWU",
              label: "DADAWU",
              checked: false
            },
            {
              value: "YIOSI",
              label: "YIOSI",
              checked: false
            }
        ]
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const override = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

function Home(){

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchProductName, setSearchProductName] = useState('');
    const { products, addToCart, filterCategory, sortProducts, loading, activeCat } = useProductValue();

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const checkIfAuthenticated = () => {
        navigate('/login');
    }

    return (
        <>
            <Navbar />
            {loading ? <FadeLoader cssOverride={override} color="#0080f8" /> : (
                <div className="bg-white">
                    <div>
                        {/* Mobile filter dialog */}
                        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition-opacity ease-linear duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-40 flex">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300 transform"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transition ease-in-out duration-300 transform"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                            <div className="flex items-center justify-between px-4">
                                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                                <button
                                                    type="button"
                                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                    onClick={() => setMobileFiltersOpen(false)}
                                                >
                                                    <span className="sr-only">Close menu</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>

                                            {/* Filters */}
                                            <form className="mt-4 border-t border-gray-200">

                                                {filters.map((section) => (
                                                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                        {({ open }) => (
                                                            <>
                                                                <h3 className="-mx-2 -my-3 flow-root">
                                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                                        <span className="ml-6 flex items-center">
                                                                            {open ? (
                                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                            ) : (
                                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                            )}
                                                                        </span>
                                                                    </Disclosure.Button>
                                                                </h3>
                                                                <Disclosure.Panel className="pt-6">
                                                                    <div className="space-y-6">
                                                                        {section.options.map((option, optionIdx) => (
                                                                            <div key={option.value} className="flex items-center">
                                                                                {/* <input
                                                                                    onClick={() => filterCategory(option)}
                                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                    name={`${section.id}[]`}
                                                                                    defaultValue={option.value}
                                                                                    type="checkbox"
                                                                                    defaultChecked={option.checked}
                                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                                />
                                                                                <label
                                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                                >
                                                                                    {option.label}
                                                                                </label> */}
                                                                                <div
                                                                                    style={option.value === activeCat ? {borderBottom: '2px solid blue', color: 'blue'} : null}
                                                                                    onClick={() => filterCategory(section, option)}
                                                                                    className="ml-3 min-w-0 text-gray-500 hover:cursor-pointer"
                                                                                >
                                                                                    {option.label}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </Disclosure.Panel>
                                                            </>
                                                        )}
                                                    </Disclosure>
                                                ))}
                                            </form>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                                <div className="flex items-center">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                Sort
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    {sortOptions.map((option) => (
                                                        <Menu.Item key={option.name}>
                                                            {({ active }) => (
                                                                <div
                                                                    onClick={() => sortProducts(option)}
                                                                    className={classNames(
                                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm hover:cursor-pointer'
                                                                    )}
                                                                >
                                                                    {option.name}
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                        <span className="sr-only">View grid</span>
                                        <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                        onClick={() => setMobileFiltersOpen(true)}
                                    >
                                        <span className="sr-only">Filters</span>
                                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <section aria-labelledby="products-heading" className="pb-24 pt-6">

                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                    {/* Filters */}
                                    <form className="hidden lg:block">

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-4">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        {/* <input
                                                                            onClick={() => filterCategory(option)}
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        /> */}
                                                                        {/* <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-600"
                                                                        >
                                                                            {option.label}
                                                                        </label> */}
                                                                        <div
                                                                            style={option.value === activeCat ? {borderBottom: '2px solid blue', color: 'blue'} : null}
                                                                            onClick={() => filterCategory(section, option)}
                                                                            className="ml-3 text-sm text-gray-600 hover:cursor-pointer"
                                                                        >
                                                                            {option.label}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>

                                    {/* Product grid */}
                                    <div className="lg:col-span-3">
                                        <div className="bg-white">
                                            <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
                                                <div className="mt-2 lg:flex justify-end mb-2">
                                                    <input
                                                      onChange={(e) => setSearchProductName(e.target.value)}
                                                      placeholder="Search by name"
                                                      className="max-w-xs block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    />
                                                </div>

                                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                                    {products.filter((item) => {
                                                      const lowercaseSearchProductName = searchProductName.toLowerCase();
                                                        return lowercaseSearchProductName === '' ? item : item.title.toLowerCase().includes(lowercaseSearchProductName)
                                                    }).map((product) => (
                                                        <div key={product.id} className="group relative border-2 p-2">
                                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80">
                                                                <img
                                                                    src={product.thumbnail}
                                                                    alt={product.title}
                                                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                                />
                                                            </div>
                                                            <div className="mt-2 mb-2 flex justify-between">
                                                                <div>
                                                                    <h3 className="text-sm text-gray-700 font-semibold">
                                                                        {product.title}
                                                                    </h3>
                                                                </div>
                                                                <p className="text-sm font-medium text-gray-900">${product.price}</p>
                                                            </div>
                                                            <div>
                                                                <button 
                                                                    type="submit" 
                                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                                                                    onClick={()=> isAuthenticated ? addToCart(product) : checkIfAuthenticated()}
                                                                >
                                                                    Add to cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            )}
            
        </>
    )

}

export default Home;