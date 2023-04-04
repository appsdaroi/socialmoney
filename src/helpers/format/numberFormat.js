const formatNumber = (number, options) => {
    return Intl.NumberFormat('en', options).format(number)
}

export { formatNumber }