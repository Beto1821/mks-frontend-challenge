"use client"
import { styled } from "styled-components"
import { ShoppingBagIcon } from "../../Icons/ShoppingbagIcon"

interface CardProductsProps {
    id: number,
    photo: string,
    name: string,
    price: string
}

const Price = styled.a`
    width: 64px;
    height: 26px;
    border-radius: 5px;
    background-color: black;
    font-family: Montserrat;
    font-size: 15px;
    font-weight: 700;
    padding: 4px 5px 4px 7px;
    color: #FFFFFF;
    text-transform: uppercase; /* Para garantir que o texto esteja em maiúsculas */
    font-feature-settings: 'tnum';
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 260px;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.14);
    color: var(--text-color);
    img {
        width: 200px;
        height: 200px;
    }
    div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
    }
    h3 {
        font-weight: 400;
        font-size: 16px;
    }
    p {
        font-weight: 300;
        font-size: 12px;
        padding: 12px;
    }
    button {
        background-color: #0F52BA;
        border: none;
        border-radius: 0 0 8px 8px;
        color: #FFFFFF;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        font-size: 14px;
        font-weight: 400;
        padding: 7px 30px;
        width: 100%;
    }
`

export function CardProducts(product: CardProductsProps) {
    const handleAddToCart = (productId: number) => {
        let cartItems = localStorage.getItem('cart-items');
        if(cartItems) {
            let cartItemsArray = JSON.parse(cartItems);

            let existingProductIndex = cartItemsArray.findIndex((item: { id: number }) => item.id === productId);


            if(existingProductIndex != -1){
                cartItemsArray[existingProductIndex].quantity += 1;
            } else {
                cartItemsArray.push({ ...product, quantity: 1, id: productId })
            }

            localStorage.setItem('cart-items', JSON.stringify(cartItemsArray));
        } else {
            const newCart = [{ ...product, quantity: 1, id: productId }]
            localStorage.setItem('cart-items', JSON.stringify(newCart));
        }
    }

    return (
        <Div>
            <img src={product.photo} alt=""/>
            <div>
                <h3>{product.name}</h3>
                <Price>R{Number(product.price).toFixed(0)}</Price>
            </div>
            <p>Redesigned from scratch and completely revised.</p>
            <button onClick={() => handleAddToCart(product.id)}>
                <ShoppingBagIcon/>
                COMPRAR
            </button>
        </Div>
    )
}