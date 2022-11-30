import {useGetProducts} from "./useRequest";
import {useState} from "react";
import {SpinnyWheel} from "./components/spinny-wheel";


const A = 'left';
const B = 'right';

const getSegments = (id: string) => {
  const arr = new URLSearchParams(window.location.search).getAll(id);

  if (arr && arr.length) return arr;
  return JSON.parse(localStorage.getItem(id) || "[]");
}

export const App = () => {
  const [a, setA] = useState(getSegments(A))
  const [b, setB] = useState(getSegments(B))
  const {data, status} = useGetProducts();

  return (
    <div className="relative flex w-full h-screen bg-venture-blue">
      <SpinnyWheel id={A} segments={a} setSegments={setA}/>
      <SpinnyWheel id={B} segments={b} setSegments={setB} reverse/>
      <div className="absolute mt-8 max-w-xl inset-x-0 mx-auto text-center">
        <h1 className="text-6xl font-black text-white text-shadow-simple">
          Paloma Spinny Wheels
        </h1>
      </div>
      {/*<h1>List all products</h1>*/}
      {/*{status === "loading" ? (*/}
      {/*  <p>Loading...</p>*/}
      {/*) : (*/}
      {/*  data?.map((product) => (*/}
      {/*    <div key={product.id} className="product">*/}
      {/*      <h2>{product.name}</h2>*/}
      {/*    </div>*/}
      {/*  ))*/}
      {/*)}*/}
    </div>
  )
}