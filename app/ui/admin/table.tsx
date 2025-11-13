// import { fetchTexts } from "@/app/lib/data" // Just Read without a filter
import { Text } from '../../lib/definitions'
import { Update, Delete } from './buttons'
import { fetchFilteredTexts } from "@/app/lib/data";

export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const texts = await fetchFilteredTexts(query, currentPage)

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 md:px-30 gap-3 mt-3'>
            {texts?.map((text:Text) => (
                <div key={text.id} className='flex flex-col justify-between items-center border border-gray-600 rounded-md p-2'>
                    <p className="text-2xl">{text.text}</p>
                    <div className='flex justify-center items-center'>
                        <Update id={text.id} />
                        <Delete id={text.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}