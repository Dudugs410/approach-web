import React from "react"
import { FiChevronLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const GoBack = ({route}) => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        console.log('goback route: ', route)
        navigate(route)
    }

    return (
        <div className='goback-btn-container'>
            <button className='btn btn-outline-light btn-goback' onClick={handleGoBack}><FiChevronLeft/></button>
        </div>
    )
}

export default GoBack
