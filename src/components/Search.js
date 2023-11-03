const Search = () => {
    return (
        <header>
            <h2 className="header__title mt-2 pb-5">Search it. Mint it. Own it.</h2>
            <input
                type="text"
                className="header__search mt-4"
                placeholder="Enter an address, neighborhood, city, or ZIP code"
            />
        </header>
    );
}

export default Search;