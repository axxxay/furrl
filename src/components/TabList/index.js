import './style.css'

export default function TabList({tabList, activeTab, changeTab}) {
    return (
        <ul className="product-tab-group">
            <li>
                <button 
                    className={`product-tab ${Object.keys(activeTab).length === 0 ? "product-tab-active" : ""}`}
                    onClick={() => changeTab({})}
                >
                    All
                </button>
            </li>
            {
                tabList.map(tab => {
                    return (
                        <li key={tab.uniqueId}>
                            <button 
                                className={`product-tab ${activeTab.id === tab.uniqueId ? "product-tab-active" : ""}`}
                                onClick={() => changeTab({id: tab.uniqueId, type: tab.contentType})}
                            >
                                {tab.name}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}