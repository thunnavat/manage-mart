export const cleanBarcodeInput = (input) => {
    return input.replace(/Shift/g, '')
}

export const isProbablyThai = (input) => {
    return /[ก-๙]/.test(input)
}