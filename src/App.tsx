import {useGetProducts} from "./useRequest";

export const App = () => {
    const {data, status} = useGetProducts();

    return (
        <div className="relative flex w-full h-screen bg-venture-blue">
            <div className="absolute mt-8 max-w-xl inset-x-0 mx-auto text-center">
                <h1 className="text-6xl font-black text-white text-shadow-simple">
                    Paloma Spinny Wheels
                </h1>
            </div>
            <h1>List all products</h1>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : (
                data?.map((product) => (
                    <div key={product.id} className="product">
                        <h2>{product.name}</h2>
                    </div>
                ))
            )}
        </div>
    )
}