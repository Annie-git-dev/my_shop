export const datas = async function getProducts() {
    const data = await fetch('https://fakestoreapi.com/products')
    let dataJson = await data.json()
    return dataJson
}