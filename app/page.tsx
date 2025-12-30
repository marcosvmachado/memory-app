'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

type Item = {
  id: number  
  defaultIcon: string
    icon: string
    toShow: boolean
    permanentShow: boolean
}

const Home = () => {
  
  const [items, setItems] = useState<Item[]>([
    {id: 0, defaultIcon:"/assets/b7.svg", icon:"/assets/moto.svg", toShow: false, permanentShow: false},
    {id: 1, defaultIcon:"/assets/b7.svg", icon:"/assets/android.svg", toShow: false, permanentShow: false},   
    {id: 2, defaultIcon:"/assets/b7.svg", icon:"/assets/caminhao.svg", toShow: false, permanentShow: false},  
    {id: 3, defaultIcon:"/assets/b7.svg", icon:"/assets/moto.svg", toShow: false, permanentShow: false},
    {id: 4, defaultIcon:"/assets/b7.svg", icon:"/assets/disney.svg", toShow: false, permanentShow: false},   
    {id: 5, defaultIcon:"/assets/b7.svg", icon:"/assets/estrela.svg", toShow: false, permanentShow: false},
    {id: 6, defaultIcon:"/assets/b7.svg", icon:"/assets/android.svg", toShow: false, permanentShow: false},
    {id: 7, defaultIcon:"/assets/b7.svg", icon:"/assets/caminhao.svg", toShow: false, permanentShow: false},
    {id: 8, defaultIcon:"/assets/b7.svg", icon:"/assets/gasolina.svg", toShow: false, permanentShow: false},
    {id: 9, defaultIcon:"/assets/b7.svg", icon:"/assets/disney.svg", toShow: false, permanentShow: false}, 
    {id: 10, defaultIcon:"/assets/b7.svg", icon:"/assets/estrela.svg", toShow: false, permanentShow: false},
    {id: 11, defaultIcon:"/assets/b7.svg", icon:"/assets/gasolina.svg", toShow: false, permanentShow: false},
    
  ])

  const [verific, setVerific] = useState([])

  const [playing, setPlaying] = useState<boolean>(false)
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [movements, setMovements] = useState(0)
  const [count, setCount] = useState(0)
  const [showCount, setShowCount] = useState(0)
  const [block, setBlock] = useState(false)

  const handleToShowButton = ( id: number ) => {
    
    setPlaying(true)
    
    if(block) return
    setItems(prev => prev.map(item => 
      item.id === id ?
      {...item, toShow: true}
      :
      item
    ))
    
    setCount(prev => prev + 1)
    if(count === 1){
      setMovements(prev => prev + 1)
      setCount(0)
    }

    setShowCount(prev => prev + 1)
  
  }

 useEffect(() => {
    if (showCount === 2){
      setBlock(true)
      const itemsFiltered = items.filter(item => item.toShow === true) 
        
        if(itemsFiltered[0].icon === itemsFiltered[1].icon){
          let tmpItems:Item[] = [...items]
          for (let i in tmpItems) {
            if (tmpItems[i].toShow){
              tmpItems[i].permanentShow = true;
              tmpItems[i].toShow = false; 
            }
          }
          setItems(tmpItems)
          setBlock(false)
          console.log(items)
        } else {
          setTimeout(() => {
             setItems(prev => prev.map(item => 
            item.toShow ?
            {...item, toShow: false}
            :
            item
          ))
          setBlock(false)
          }, 1000);
         
        }
    setShowCount(0)
    }
    },[showCount])

  const handleResetButton = () => {
    setItems(prev => prev.map(item => 
    item.permanentShow === true ? 
    {...item, permanentShow: false, toShow: false}
    :
    {...item, permanentShow: false, toShow: false}
    ))
    setSecond(0)
    setMinute(0)   
    setCount(0)
    setMovements(0)
    setShowCount(0)
    setBlock(false)
    setPlaying(false)
  }

  useEffect(() => {
    
    if (!playing) return
    const interval = setInterval(() => {  
      setSecond(prev => {
        if(prev === 59){
          setMinute(prev => prev + 1)
          return 0
        } else {
          return prev + 1
        }
      })
     }, 1000)
    
    return () => clearInterval(interval)
  },[playing])

  return (
    <div className="flex justify-center">
      <div className="container flex flex-col mx-10 xl:flex-row mt-20">
        <div className="flex-1">
          <div className="w-80 flex">
            <div className="w-8 h-8 grid grid-cols-2 grid rows-2 gap-1 mt-1 mx-1">
              <div className="bg-[#1550f6]"></div>       
              <div className="bg-[#b5bbbc]"></div>         
              <div className="bg-[#b5bbbc] "></div>
              <div className="bg-[#1550f6]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-[#181836]">DevMemory</span>
              <span className="text-[#b5bbbc]">powered by Mikaessi - ib B7WEB</span>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <span className="text-xl text-[#b5bbbc] mb-2">Tempo</span>
            <span className="text-5xl text-[#181836] font-bold">{`0${minute}:${second < 10 ? `0${second}` : second}`}</span>
          </div>
          <div className="flex flex-col my-10">
            <span className="text-xl text-[#b5bbbc] mb-2">Movimentos</span>
            <span className="text-5xl text-[#181836] font-bold">{movements.toString()}</span>
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
        <div className="grid grid-cols-4 grid rows-4 gap-2 flex-2 mt-5 xl:mt-0">
          {
            items.map((item, index) => (
              
            item.toShow || item.permanentShow ? 
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