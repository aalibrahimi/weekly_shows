import StoreItemCard from '@/MyComponents/storeItemCard'
import React from 'react'

interface Items {
  name: string
  price: number
}

const storeItems: Items[] = [
  {
    name: "Item 1",
    price: 1.99
  },
  {
    name: "Item 2",
    price: 1.99
  },
  {
    name: "Item 3",
    price: 5.99
  }
]

function Store() {

  return (
    <div className="">
      <section>
        <h3>Store Page</h3>
      </section>

      <section>
        {storeItems.map((item, i) => (
          <div key={i} className="">
            <StoreItemCard itemName={item.name} itemPrice={item.price} itemImage='/tempItem.jpg' />
          </div>
        ))}
      </section>
    </div>
  )
}

export default Store