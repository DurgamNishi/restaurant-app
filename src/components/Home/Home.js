import {useState} from 'react'
import {IoCartOutline} from 'react-icons/io5'

// NOTE: The API provided is not working, hence used offline data
import {data, menuTabs} from '../../constants/data'

import './index.css'

const Home = () => {
  const {menu, restaurant} = data

  const [activeTab, setActiveTab] = useState(menuTabs[0])
  const [cartItems, setCartItems] = useState([])
  const [totalCartCount, setTotalCartCount] = useState(0)

  const filteredMenuItems = menu.filter(
    menuItem => menuItem.category === activeTab,
  )

  const onChangeCount = (menuItemId, count, shouldIncrease) => {
    const newCartItems = [...cartItems]

    const updatedCount = shouldIncrease ? count + 1 : count - 1
    if (updatedCount < 0) return

    setTotalCartCount(prevCount =>
      shouldIncrease ? prevCount + 1 : prevCount - 1,
    )

    const newItem = {id: menuItemId, count: updatedCount}

    const cartItemIndex = cartItems.findIndex(item => item.id === menuItemId)
    if (cartItemIndex !== -1) {
      newCartItems.splice(cartItemIndex, 1, newItem)
    } else {
      newCartItems.push(newItem)
    }
    setCartItems(newCartItems)
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <p>UNI Resto Cafe</p>
        <div className="cart-icon-container">
          <IoCartOutline size="24px" />
          <div className="count-badge">{totalCartCount}</div>
        </div>
      </div>

      <div className="home-menu-tabs-container">
        {menuTabs.map(item => {
          const isTabActive = activeTab === item
          return (
            <button
              className={`home-menu-tab-item transparent ${
                isTabActive ? 'tab-active' : ''
              }`}
              onClick={() => {
                setActiveTab(item)
              }}
            >
              {item}
            </button>
          )
        })}
      </div>

      <div className="home-menu-items-list">
        {filteredMenuItems.map(menuItem => {
          const isVeg = menuItem.is_vegetarian
          const cartItem = cartItems.find(item => item.id === menuItem.id)
          const count = cartItem ? cartItem.count : 0

          return (
            <div className="menu-item">
              <div className={`veg-symbol ${isVeg ? '' : 'non-veg'}`} />
              <div className="menu-item-content">
                <p>{menuItem.name}</p>
                <p>${menuItem.price}</p>
                <p>{menuItem.description}</p>
                <p>{menuItem.calories} calories</p>
                <div className="count-container">
                  <button
                    className="count-button"
                    onClick={() => {
                      onChangeCount(menuItem.id, count)
                    }}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    className="count-button"
                    onClick={() => {
                      onChangeCount(menuItem.id, count, true)
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <img src={menuItem.image_url} className="menu-item-img" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
