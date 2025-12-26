'use client'

import Image from "next/image"
import { useState } from "react"

type Item = {
  id: number  
  defaultIcon: string
    icon: string
    toShow: boolean
}

const Home = () => {
  
  const [items, setItems] = useState<Item[]>([
    {id: 0, defaultIcon:"/assets/b7.svg", icon:"/assets/android.svg", toShow: false},
    {id: 1, defaultIcon:"/assets/b7.svg", icon:"/assets/android.svg", toShow: false},
    {id: 2, defaultIcon:"/assets/b7.svg", icon:"/assets/caminhao.svg", toShow: false},
    {id: 3, defaultIcon:"/assets/b7.svg", icon:"/assets/caminhao.svg", toShow: false},
    {id: 4, defaultIcon:"/assets/b7.svg", icon:"/assets/disney.svg", toShow: false},
    {id: 5, defaultIcon:"/assets/b7.svg", icon:"/assets/disney.svg", toShow: false},
    {id: 6, defaultIcon:"/assets/b7.svg", icon:"/assets/estrela.svg", toShow: false},
    {id: 7, defaultIcon:"/assets/b7.svg", icon:"/assets/estrela.svg", toShow: false},
    {id: 8, defaultIcon:"/assets/b7.svg", icon:"/assets/gasolina.svg", toShow: false},
    {id: 9, defaultIcon:"/assets/b7.svg", icon:"/assets/gasolina.svg", toShow: false},
    {id: 10, defaultIcon:"/assets/b7.svg", icon:"/assets/moto.svg", toShow: false},
    {id: 11, defaultIcon:"/assets/b7.svg", icon:"/assets/moto.svg", toShow: false},
  ])

  const handleToShowButton = ( id: number ) => {
    setItems(prev => prev.map(item => 
      item.id === id ?
      {...item, toShow: true}
      :
      item
    ))
  }
  const handleResetButton = () => {
    setItems(prev => prev.map(item => 
    item.toShow === true ? 
    {...item, toShow: false}
    :
    {...item, toShow: false}
    ))
  }
  return (
    <div className="flex justify-center">
      <div className="container flex flex-col mt-20 mx-10">
        <div className="flex-1 flex-col">
          <div className="border-3 border-white rounded-xl p-2 text-center bg-[#181836]">
            <span className="text-2xl font-black text-white">Develop by Marquito</span>
          </div>
          
          {/* 
          <Image
          src="/assets/devmemory_logo.png"
          alt=""
          width={250}
          height={250}
          />
          */}
          <div className="flex flex-col mt-10">
            <span className="text-xl text-[#b5bbbc] mb-2">Tempo</span>
            <span className="text-5xl text-[#181836] font-bold">00:00</span>
          </div>
          <div className="flex flex-col my-10">
            <span className="text-xl text-[#b5bbbc] mb-2">Movimentos</span>
            <span className="text-5xl text-[#181836] font-bold">0</span>
          </div>
          <button onClick={ handleResetButton } className="w-70 h-15 bg-[#1550f6] cursor-pointer rounded-xl flex">
            <div className="flex-3 flex justify-center items-center bg-red-5 border-r border-white">
              <Image
              src="/assets/restart.svg"
              alt=""
              width={30}
              height={30}
              />
            </div>         
            <div className="flex-7 flex justify-center items-center text-white">Reiniciar</div>
          </button>
        </div>
        <div className="grid grid-cols-4 grid rows-4 gap-2 flex-2 bg-gren-500 mt-10">
          {
            items.map((item, index) => (
              
            item.toShow ? 
              <div className="relative bg-[#1550f6] rounded-xl flex justify-center items-center">
                <Image
                src={item.icon}
                alt=""
                width={80}
                height={80}
                className="object-contain"
                />
              </div>
            :
              <div onClick={() => { handleToShowButton(index) }} className="relative bg-[#e2e4e3] rounded-xl flex justify-center items-center cursor-pointer">
                  <Image
                  src={item.defaultIcon}
                  alt=""
                  width={80}
                  height={80}
                  className="object-contain opacity-15"
                  />
                </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home