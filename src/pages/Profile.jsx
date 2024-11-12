import { useParams } from "react-router-dom"

function Profile () {
    const {id} = useParams()
    
    return (
        <>
            Hi {id}
        </>
    )
}

export default Profile