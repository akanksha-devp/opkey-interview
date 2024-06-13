import './searchBar.scss'

const SearchBar = ({placeholder, value, handleChange, type="default"}) => {

  return(
    <div className={type}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )

}

export default SearchBar