import { useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"
function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ITEMS = 5

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

  function reduceItemCart(id) {
    const itemExists = cart.findIndex(guitar => guitar.id === id)
    if (cart[itemExists].quantity === 1) {
      removeFromCart(id)
    } else {
      const updatedCart = [...cart]
      cart[itemExists].quantity--
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

  return (

    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        reduceItemCart={reduceItemCart}
        increaseQuantity={increaseQuantity}
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
