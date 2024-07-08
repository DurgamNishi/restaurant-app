import {useState, useEffect} from 'react'
import {IoCartOutline} from 'react-icons/io5'

import './index.css'

const Home = props => {
  const {data} = props

  const menuTabs = data.table_menu_list.map(item => item.menu_category)
  const category_dishes = data.table_menu_list.map(item => item.category_dishes)

  function dish() {
    for (let i = 0; i < category_dishes.length; i++) {
      if (
        category_dishes[i].dish_Availability === true &&
        category_dishes[i].addonCat !== null
      ) {
        return 'Customizations available'
      }
      if (category_dishes[i].dish_Availability === false) {
        return 'Not available'
      }
    }
    return ''
  }

  console.log(data)

  const [activeTab, setActiveTab] = useState(menuTabs[0])
  const [cartItems, setCartItems] = useState([])
  const [totalCartCount, setTotalCartCount] = useState(0)

  const selectedMenuItem = data.table_menu_list.find(
    menuItem => menuItem.menu_category === activeTab,
  )
  const dishesList = selectedMenuItem.category_dishes

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
    <div className='home-container'>
      <div className='home-header'>
        <h1>{data.restaurant_name}</h1>
        <div className='home-header-right-section'>
          <p>My Orders</p>
          <div className='cart-icon-container'>
            <IoCartOutline size='24px' />
            <div className='count-badge'>{totalCartCount}</div>
          </div>
        </div>
      </div>

      <div className='home-menu-tabs-container'>
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

      <div className='home-menu-items-list'>
        {dishesList.map(dishItem => {
          const isVeg = dishItem.dish_Type === 2
          const cartItem = cartItems.find(item => item.id === dishItem.dish_id)
          const count = cartItem ? cartItem.count : 0

          return (
            <div className='menu-item'>
              <div className={`veg-symbol ${isVeg ? '' : 'non-veg'}`} />
              <div className='menu-item-content'>
                <p>{dishItem.dish_name}</p>
                <p>
                  {dishItem.dish_currency} {dishItem.dish_price}
                </p>
                <p>{dishItem.dish_description}</p>
                <p>{dishItem.dish_calories} calories</p>
                <div className='count-container'>
                  <button
                    className='count-button'
                    onClick={() => {
                      onChangeCount(dishItem.dish_id, count)
                    }}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    className='count-button'
                    onClick={() => {
                      onChangeCount(dishItem.dish_id, count, true)
                    }}
                  >
                    +
                  </button>
                  <p>{dish()}</p>
                </div>
              </div>
              <img src={dishItem.dish_image} className='menu-item-img' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
