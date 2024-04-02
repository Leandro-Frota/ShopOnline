"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import cartImage from "../assets/cart.png"



export default function Home() {
 const [products, setProducts] = useState([])
 const [cart, setCart] = useState([])


 useEffect(() => {
  getDados()
 },[])

 async function getDados(){
  const data = await fetch("https://fakestoreapi.com/products")

  const prod = await data.json()

  setProducts(prod)
 }

 function addCart(product){

    setCart([...cart,product])
 }

  return (
    <main className="flex min-h-screen max-w-screen flex-wrap gap-6 items-center justify-center p-24">
      <div className="min-w-full flex justify-end px-12">
        <div className="cursor-pointer hover:scale-125 transition-all relative">
          <Image src={cartImage} width={50} height={50} />
          <span className="absolute bottom-1  bg-red-500 flex justify-center items-center rounded-full text-[12px] w-[24px] h-[24px]">{cart.length}</span>
        </div>
      </div>
      {products.map((p) => {
        return (
          <div key={p.id} className="rounded-md border-2 border-black
          p-6 flex justify-center flex-col items-center gap-4 max-w-48 min-h-[400px] ">
            <Image src={p.image} width={100} height={100} alt={p.title} className="max-h-20 object-contain"/>
            <div className="text-center">
              {p.title.slice(0,15)}...
            </div>
            <div className="text-xl font-bold">
              R$ {p.price}
            </div>
            <div className="flex flex-grow"></div>
            <button className="hover:bg-red-700 transition-all bg-red-500 text-white p-2 rounded min-w-full">COMPRAR</button>
            <button onClick={()=>addCart(p)} className="hover:bg-cyan-700 transition-all bg-cyan-500 text-white p-2 rounded min-w-full">ADICIONAR AO CARRINHO</button>
          </div>
        )
      })}
    </main>
  );
}
