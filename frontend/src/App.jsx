import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api/orders'
const AUTH_HEADER = `Basic ${window.btoa('admin:admin123')}`

function App() {
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ id: null, name: '', price: '' })
  const [message, setMessage] = useState('')

  const fetchOrders = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: AUTH_HEADER },
      })

      if (!response.ok) {
        throw new Error('Unable to load orders.')
      }

      const data = await response.json()
      setOrders(data)
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setForm({ id: null, name: '', price: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.price) {
      setMessage('Name and price are required.')
      return
    }

    try {
      const method = form.id ? 'PUT' : 'POST'
      const url = form.id ? `${API_URL}/${form.id}` : API_URL

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price),
        }),
      })

      if (!response.ok) {
        throw new Error(form.id ? 'Unable to update order.' : 'Unable to save order.')
      }

      setMessage(form.id ? 'Order updated.' : 'Order saved successfully.')
      resetForm()
      fetchOrders()
    } catch (error) {
      setMessage(error.message)
    }
  }

  const handleEdit = (order) => {
    setForm({
      id: order.id,
      name: order.name,
      price: order.price,
    })
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH_HEADER },
      })

      if (!response.ok) {
        throw new Error('Unable to delete order.')
      }

      setMessage('Order deleted.')
      if (form.id === id) {
        resetForm()
      }
      fetchOrders()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <main className="simple-page">
      <div className="content-stack">
        <form className="simple-form" onSubmit={handleSubmit}>
          <h1>{form.id ? 'Update order' : 'Order'}</h1>

          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter order name"
            />
          </label>

          <label>
            Price
            <input
              type="number"
              min="0"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </label>

          <div className="button-row">
            <button type="submit">{form.id ? 'Update' : 'Save'}</button>
            {form.id && (
              <button type="button" className="secondary-button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          {message && <p className="message">{message}</p>}
        </form>

        <section className="list-panel">
          <h2>All orders</h2>
          {orders.length === 0 ? (
            <p className="empty-text">No orders yet.</p>
          ) : (
            <ul className="order-list">
              {orders.map((order) => (
                <li key={order.id} className="order-item">
                  <div>
                    <strong>{order.name}</strong>
                    <span>${Number(order.price).toFixed(2)}</span>
                  </div>
                  <div className="item-actions">
                    <button type="button" className="secondary-button" onClick={() => handleEdit(order)}>
                      Update
                    </button>
                    <button type="button" className="delete-button" onClick={() => handleDelete(order.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
