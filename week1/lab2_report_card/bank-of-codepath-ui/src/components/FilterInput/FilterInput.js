import "./FilterInput.css"

export default function FilterInput() {
  return (
    <div className="FilterInput">
      <i className="material-icons">search</i>
      <input type="text" placeholder={"Search transactions"} />
    </div>
  )
}
