import RegularPropertyCard from './RegularPropertyCard'

function PropertyList({properties, serverUrl, handlePropertyClick, handleEmptyList}){
    if(properties.length===0) handleEmptyList(false)
    else handleEmptyList(true)
    return (
        <div className='property-list'>
            
            {properties.map(
                property=>
                <RegularPropertyCard
                    key={property._id}
                    id={property._id}
                    details={property}
                    serverUrl={serverUrl}
                    _handlePropertyClick={handlePropertyClick}
                />
            )}
        </div>
    )
}

export default PropertyList;