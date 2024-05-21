import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import TabList from "../TabList";
import ProductItem from "../ProductItem";
import './style.css'

const apiStatusConstants = {
    INITIAL: 'INITIAL',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

export default function ProductList() {

    const [tabList, setTabList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [activeTab, setActiveTab] = useState({});
    const [totalProductCount, setTotalProductCount] = useState(null);
    const [page, setPage] = useState(1);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
    const [vibeDetails, setVibeDetails] = useState({});

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    useEffect(() => {
        getVibeName();
        fetchFilterTabList();
        setProductList([])
        const productData = fetchProductList(activeTab);
        productData.then(data => setProductList(data));
    }, [activeTab]);

    useEffect(() => {
        const handleScroll = debounce(() => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                setPage(prevPage => prevPage + 1);
            }
        }, 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (page > 1 && productList.length < totalProductCount) {
            setApiStatus(apiStatusConstants.LOADING);
            const productData = fetchProductList();
            productData.then(data => {
                setProductList([...productList, ...data]);
                setApiStatus(apiStatusConstants.SUCCESS);
            });
        }
    }, [page]);

    const changeTab = (tab) => {
        setActiveTab(tab);
        setPage(1);
        console.log(tab)
    }


    const getVibeName = async () => {
        const url = `${backendUrl}/getVibeByName`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "#HomeHunts"
            })
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            if (!data.data || !data.data.getVibeByName) {
                throw new Error('Invalid data format');
            }
            setVibeDetails({name: data.data.getVibeByName.name, imageUrl: data.data.getVibeByName.imageUrl});
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFilterTabList = async () => {
        const url = `${backendUrl}/getListingFilters`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: "#HomeHunts", 
                entity: "vibe"
            })
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            if (!data.data || !data.data.getListingFilters || !data.data.getListingFilters.easyFilters) {
                throw new Error('Invalid data format');
            }
            setTabList(data.data.getListingFilters.easyFilters);
        } catch (error) {
            console.log(error);
            setApiStatus(apiStatusConstants.FAILURE);
        }
    }

    const fetchProductList = async () => {
        setApiStatus(apiStatusConstants.LOADING);
        const url = `${backendUrl}/getListingProducts`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: {
                    page,
                    pageSize: 10, 
                    filters: Object.keys(activeTab).length === 0 ? [] : [activeTab],
                    id: "#HomeHunts", 
                    entity: "vibe"
                }
            })
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            if (!data.data || !data.data.getListingProducts || !data.data.getListingProducts.products) {
                throw new Error('Invalid data format');
            }
            setTotalProductCount(data.data.getListingProducts.totalProducts);
            setApiStatus(apiStatusConstants.SUCCESS);
            console.log(data.data.getListingProducts.products)
            return data.data.getListingProducts.products;
        } catch (error) {
            console.log(error);
            setApiStatus(apiStatusConstants.FAILURE);
        }
    }

    const renderLoader = () => {
        return (
            <div className='failure-loader-con'>
                <Oval
                    visible={true}
                    height="45"
                    width="45"
                    color="#7e59e7"
                    secondaryColor="#ffffff"
                    strokeWidth={3}
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    const renderFailure = () => {
        return (
            <div className='failure-loader-con'>
                <p className="failure-text">Something went wrong. Please try again later.</p>
                <button type="button" className="retry-button" onClick={fetchProductList}>Retry</button>
            </div>
        )
    }

    return (
        <div className="product-list-container">
            {   
                Object.keys(vibeDetails).length !== 0 &&
                <div className="product-banner" style={{backgroundImage: `url(${vibeDetails.imageUrl})`}}>
                    <div className="product-banner-overlay"></div>
                    <span className="product-banner-text">{vibeDetails.name}</span>
                </div>
            }
            {
                totalProductCount !== null &&
                <p className='product-item-count'>{totalProductCount} Products</p>
            }
            {
                tabList.length !== 0 && <TabList tabList={tabList} activeTab={activeTab} changeTab={changeTab} />
            }
            <ul className='product-list'>
                {
                    productList.map((product, index) => {
                        let fullWidth = false;
                        if (index < 3) {
                            fullWidth = index === 2;
                        } else {
                            fullWidth = (index - 2)%5 === 0;
                        }
                        return (
                            <ProductItem key={index} product={product} fullWidth={fullWidth} />
                        )
                    })
                }
            </ul>

            {(apiStatus === apiStatusConstants.LOADING || productList.length < totalProductCount) && renderLoader()}
            {apiStatus === apiStatusConstants.FAILURE && renderFailure()}
        </div>
    )
}