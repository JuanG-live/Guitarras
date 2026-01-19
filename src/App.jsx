import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"
function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(() => {
    const localStorageSaved = localStorage.getItem('cart')
    return localStorageSaved ? JSON.parse(localStorageSaved) : []
  })

  const MAX_ITEMS = 5

  useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart]) 

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) { //There is already an item in the cart
      if (cart[itemExists].quantity >= 5) {
        return
      }
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      const newItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter((guitar) => guitar.id !== id)
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const itemExists = cart.findIndex(guitar => guitar.id === id)
    if (cart[itemExists].quantity === 1) {
      removeFromCart(id)
    } else {
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity--
      setCart(updatedCart)
    }
  }

  function increaseQuantity(id) {
    const itemExists = cart.findIndex(guitar => guitar.id === id) 
    const updatedCart = [...cart]
    if (updatedCart[itemExists].quantity >= MAX_ITEMS) {
      return
    } 
    updatedCart[itemExists].quantity++
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }
  return (

    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
