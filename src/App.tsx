import {useGetNames} from "./useRequest";
import {useEffect, useState} from "react";
// @ts-ignore
import {SpinnyWheel} from "./components/spinny-wheel.jsx";


const A = 'left';
const B = 'right';

// const getSegments = (id: string) => {
//   const arr = new URLSearchParams(window.location.search).getAll(id);
//
//   if (arr && arr.length) return arr;
//   return JSON.parse(localStorage.getItem(id) || "[]");
// }

export const App = () => {
  const [a, setA] = useState<string[] | []>([])
  const [b, setB] = useState<string[] | []>([])
  const {data, status} = useGetNames();

  useEffect(() => {
    setA(data ? data.map((p) => p.name) : [])
  }, [data])

  return (
    <div className="relative flex w-full h-screen bg-venture-blue">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <SpinnyWheel id={A} segments={a} setSegments={setA} data={data}/>
          <SpinnyWheel id={B} segments={b} setSegments={setB} reverse/>
          <div className="absolute mt-8 max-w-xl inset-x-0 mx-auto text-center">
            <h1 className="text-6xl font-black text-white text-shadow-simple">
              Paloma Spinny Wheels
            </h1>
          </div>
        </>
      )}
    </div>
  )
}

// data?.map((product) => (
//   <div key={product.id} className="product">
//     <h2>{product.name}</h2>
//   </div>
// ))