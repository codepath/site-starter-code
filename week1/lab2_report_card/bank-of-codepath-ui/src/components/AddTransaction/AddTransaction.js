import "./AddTransaction.css"

export default function AddTransaction() {
  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Enter a description..." />
          </div>
          <div className="field">
            <label>Category</label>
            <input type="text" name="category" placeholder="Enter a category..." />
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input type="number" name="amount" />
          </div>

          <button className="btn add-transaction" type="submit">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
