import React, { useState } from 'react'

const SelectLanguage = () => {
    const languages = ["En", "Gr", "Fr"]
    const [open, setOpen] = useState(false)
    const selectedLanguage = "En"
    return (<></>)
    return (
        <>
            {languages.length > 0 && <form>
                <select style={{display: 'none'}}>
                    {languages.map((option) => {
                        <option value={option}/>
                    })}
                </select>
                <div className={`nice-select ${open === true ? "open" : ""}`} onClick={(e) => setOpen((open) => !open)}>
                    <span className='current'> {selectedLanguage }</span>
                    <ul className='list'>
                        {languages.map((option) => {
                            return <li key={option} data-value={option} className={`option ${option === selectedLanguage ? "selected focus" : ""}`} onClick={(e) => handleCurrencyChange(option)}>{option}</li>
                        })}
                    </ul>
                </div>
            </form>}
        </>
      )
}

export default SelectLanguage