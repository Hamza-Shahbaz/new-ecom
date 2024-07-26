
let countryCurrencySymbol = {
    "USD" : "$",
    "EUR" : "€",
    "GBP" : "£",
    "CAD" : "CAD ",
    "AUD" : "AUD "
}

export const amoutRateConversion = (amount, rate, country) => {
    let newAmount = (parseFloat(amount) * rate).toFixed(2)
    let final = newAmount*100/100
    if(countryCurrencySymbol[country]) {
        return countryCurrencySymbol[country] + String(final) 
    }
    return country?.toUpperCase() + " " + String(final)
}

export const valueRateConversion = (value, rate) => {
    let newAmount = (parseFloat(value) * rate).toFixed(2)
    let final = newAmount*100/100
    return String(final)
}

export const symbolAmount = (amount, country) => {
    if(!countryCurrencySymbol[country]) {
        return country?.toUpperCase() + String(amount)
    }
    return (countryCurrencySymbol[country] || country?.toUpperCase()) + String(amount)
}

export const reconvertAmount = (amount, rate) => {
    let newAmount = (parseFloat(amount) / rate).toFixed(2)
    return newAmount
}

export const getVariantsArray = (variantsObject) => {
    let temp = []
    let variants = Object.values(variantsObject || {})
    if(variants.length < 1) {
        return []
    }
    for (let i=0; i<variants.length; i++) {
        const values = Object.values(variants[i])
        if(values.length > 0) {
            const key = values[0].variant_type_title
            const display_style_id = values[0].display_style_id
            if(display_style_id === 4) {
                temp.push({key, values, display_style_id})
            }
            else {
                temp.push({key, values, display_style_id})
            }
        }
    }
    return temp
}

export const cartForApi = (cartData) => { 
    return cartData.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        variant_combo_id: item.variant_combo_id || null,
        price : item.sale_price || item.price
  }));

}
