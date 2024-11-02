function FilteredProducts({filteredProducts}) {
    return (
        <div className='w-full flex flex-wrap justify-around'>
            {
                filteredProducts?.map((e) => {
                    return <div key={e.id} className="w-[200px] h-max p-[5px] rounded-md bg-white my-[15px]">
                        <img src={e.image} alt={e.title} className="w-full h-[200px] rounded-md" />
                        <p className="whitespace-nowrap">{e.title.length > 20 ? e.title.slice(0, 20) + '...' : e.title}</p>
                        <p>${e.price}</p>
                    </div>
                })
            }
        </div>
    )
}

export default FilteredProducts