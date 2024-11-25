import Link from "next/link";


export default async function Hero() {
    return (
    <section className="container my-16">
        <h1 className="text-4xl font-bold text-center mt-2">
            Find your next <br />community to adopt
        </h1>
        <form className="flex gap-2 mt-6 max-w-md mx-auto">
            <input type="search"
                   className="border border-gray-400 w-full py-2 px-3 rounded-md"
                   placeholder="Search phrase..."/>
            <button className="bg-emerald-600 text-white py-2 px-4 rounded-md">Search</button>
        </form>
    </section>
    );
}