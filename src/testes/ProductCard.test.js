import { render, screen } from "@testing-library/react"
import ProductCard from "../components/ProductsList/ProductCard"
import userEvent from '@testing-library/user-event'

const productMock = {
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    title: "produtoMock",
    price: 1000.00
}

const addToCartMock = jest.fn()

describe("ProductCard",()=>{
    test("testar renderização de produto",()=>{
        render(<ProductCard 
            product={productMock}
            addToCart={addToCartMock}/>)

        const title = screen.getByText("produtoMock")
        expect(title).toBeInTheDocument()
    })

    test("testar a renderização de imagem, titulo, preço e botão",async()=>{
        render(<ProductCard 
            product={productMock}
            addToCart={addToCartMock}/>)

            const title = screen.getByRole('heading', {name: /produtoMock/i})
            const image = screen.getByRole('img',{name:/produtoMock/i})
            const price = screen.getByText(/\$1000\.00/i)
            const addBin = screen.getByRole('button',{name:/buy/i})

            // screen.logTestingPlaygroundURL()

            expect(title).toBeInTheDocument()
            expect(image).toBeInTheDocument()
            expect(price).toBeInTheDocument()
            expect(addBin).toBeInTheDocument()
    })

    test("testa quando o produto de compra for clicado e chama a função add ao carrinho", async()=>{

        const user = userEvent.setup()
        render(<ProductCard 
            product={productMock}
            addToCart={addToCartMock}/>)
        
        const addBtn = screen.getByRole('button',{name:/buy/i})

        await user.click(addBtn)

        expect(addToCartMock).toBeCalled()
        expect(addToCartMock).toBeCalledTimes(1)
    }
    )
})