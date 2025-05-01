export const cleanBarcodeInput = (input) => {
    return input.replace(/Shift/g, '')
}