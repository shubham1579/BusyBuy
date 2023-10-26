import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { collection, addDoc, onSnapshot, doc, deleteDoc, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const productContext = createContext();

const useProductValue = () => {
    const value = useContext(productContext);
    return value;
};

const ProductContextProvider = ({children}) => {

    const [loading, setLoading] = useState(false);

    const [cartLoading, setCartLoading] = useState(false);

    const [ordersLoading, setOrdersLoading] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [orders, setOrders] = useState([]);

    const [delCart, setDelCart] = useState([]);

    const [isCartEmpty, setIsCartEmpty] = useState(true);

    const [isPurchased, setIsPurchased] = useState(false);

    const [products, setProducts] = useState([]);

    const [activeCat, setActiveCat] = useState('');

    const { userId, isAuthenticated, setIsAuthenticated } = useAuth();

    useEffect(() => {

        setLoading(true);
        fetch('https://dummyjson.com/products?limit=100')
        .then(response => response.json())
        .then((data) => {
            setProducts(data.products);
            setLoading(false);
        });

    }, []);

    const filterCategory = (sec, opt) => {
        
        if(sec.id === 'category'){
            if(opt.value === 'All'){
                setActiveCat(opt.value);
                fetch('https://dummyjson.com/products?limit=100')
                .then(response => response.json())
                .then((data) => {
                    setProducts(data.products);
                });
            }
            else{
                setActiveCat(opt.value);
                fetch(`https://dummyjson.com/products/category/${opt.value}`)
                .then(response => response.json())
                .then((data) => {
                    setProducts(data.products);
                });
            }
        }
        else if(sec.id === 'brands'){
            setActiveCat(opt.value);
            const filteredBrands = products.filter((prod) => prod.brand === opt.value);
            setProducts(filteredBrands);
        }

    }

    useEffect(() => {
        
        setCartLoading(true);
        onSnapshot(collection(db, `userCarts/${userId}/myCart`), (snapshot) => {
            const cartProducts = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            setCartItems(cartProducts);
            setCartLoading(false);
            if(cartItems.length > 0){
                setIsCartEmpty(false);
            }
            else{
                setIsCartEmpty(true);
            }
        });

    }, [userId, cartItems.length]);

    useEffect(() => {

        if(orders.length > 0){
            setOrdersLoading(true);
        }
        onSnapshot(collection(db, `userOrders/${userId}/myOrder`), (snapshot) => {
            const orderedProducts = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            const sortedOrders = [...orderedProducts].sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            if(orderedProducts.length > 0){
                setOrders(sortedOrders);
                setOrdersLoading(false);
            }
        });

    }, [userId, orders.length]);

    const addToCart = async (product) => {

        if(userId){
            const index = cartItems.findIndex((item) => item.id === product.id);

            if(index === -1){
                await addDoc(collection(db, `userCarts/${userId}/myCart`), {...product, quantity: 1});
            }
            else{
                const id = [];

                const querySnapshot = await getDocs(collection(db, `userCarts/${userId}/myCart`));

                querySnapshot.forEach((doc) => {
                    id.push(doc.id);
                });

                const editId = id[index];

                const docRef = doc(db, `userCarts/${userId}/myCart`, editId);
                const docSnap = await getDoc(docRef);

                await updateDoc(doc(db, `userCarts/${userId}/myCart`, editId), {
                    quantity: docSnap.data().quantity + 1
                });
            }
            toast("Product Added Successfully");
            setIsCartEmpty(false);
        }
        else{
            setIsAuthenticated(false);
        }

    }

    const removeFromCart = async (product) => {

        const index = cartItems.findIndex((item) => item.id === product.id);

        const id = [];

        const querySnapshot = await getDocs(collection(db, `userCarts/${userId}/myCart`));

        querySnapshot.forEach((doc) => {
            id.push(doc.id);
        });

        const editId = id[index];

        deleteDoc(doc(db, `userCarts/${userId}/myCart`, editId));

        toast("Product removed Successfully");

    }

    const handleOrders = async (order, totalPrice) => {

        const time = new Date();
        const format = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Use 24-hour format
            timeZone: 'Asia/Kolkata' // Indian Standard Time (IST)
        };

        const formattedDateTime = time.toLocaleString('en-IN', format);

        await addDoc(collection(db, `userOrders/${userId}/myOrder`), {order, totalPrice, time: formattedDateTime, createdAt: Date.now()});
        

        const querySnapshot = await getDocs(collection(db, `userCarts/${userId}/myCart`));

        querySnapshot.forEach((doc) => {
            delCart.push(doc.id);
            setDelCart(delCart);
        });

        // console.log(delCart);
        delCart.map((id) => {
            return deleteDoc(doc(db, `userCarts/${userId}/myCart`, id));
        });
        
        // setIsCartEmpty(true);
        setIsPurchased(true);

    }

    const incCount = async (product) => {

        const index = cartItems.findIndex((item) => item.id === product.id);

        const id = [];

        const querySnapshot = await getDocs(collection(db, `userCarts/${userId}/myCart`));

        querySnapshot.forEach((doc) => {
            id.push(doc.id);
        });

        const editId = id[index];

        const docRef = doc(db, `userCarts/${userId}/myCart`, editId);
        const docSnap = await getDoc(docRef);

        await updateDoc(doc(db, `userCarts/${userId}/myCart`, editId), {
            quantity: docSnap.data().quantity + 1
        });

    }
    
    const decCount = async (product) => {
        
        const index = cartItems.findIndex((item) => item.id === product.id);

        const id = [];

        const querySnapshot = await getDocs(collection(db, `userCarts/${userId}/myCart`));

        querySnapshot.forEach((doc) => {
            id.push(doc.id);
        });

        const editId = id[index];

        const docRef = doc(db, `userCarts/${userId}/myCart`, editId);
        const docSnap = await getDoc(docRef);

        if(docSnap.data().quantity > 1){
            await updateDoc(doc(db, `userCarts/${userId}/myCart`, editId), {
                quantity: docSnap.data().quantity - 1
            });
        }
        else{
            deleteDoc(doc(db, `userCarts/${userId}/myCart`, editId));
        }
        
    }

    const sortProducts = (opt) => {
        if(opt.name === 'Price: Low to High'){
            setProducts([...products].sort((a, b) => a.price - b.price));
        }
        else{
            setProducts([...products].sort((a, b) => b.price - a.price));
        }
    }

    return (
        <productContext.Provider value={{ products, addToCart, cartItems, handleOrders, orders, isCartEmpty, isPurchased, setIsPurchased, removeFromCart, incCount, decCount, filterCategory, sortProducts, isAuthenticated, ToastContainer, loading, cartLoading, ordersLoading, activeCat }}>
            {children}
        </productContext.Provider>
    )

}

export { useProductValue, ProductContextProvider }