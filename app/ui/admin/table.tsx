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
        <div>
            {texts?.map((text:Text) => (
                <div key={text.id} className='text-center border border-gray-600 rounded-md mx-1 my-2'>
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