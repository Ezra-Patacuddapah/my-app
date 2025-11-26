import { Text } from '../../lib/definitions'
import { Update, Delete } from './buttons'
import { fetchFilteredTexts } from "@/app/lib/data";
// import { fetchTexts } from "@/app/lib/data" // Just Read without a filter

export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const texts = await fetchFilteredTexts(query, currentPage)

    return (
        <div className='grid grid-cols-2 m-1 md:grid-cols-3 md:px-30 gap-3 mt-3'>
            {texts?.map((text:Text) => (
                <div key={text.id} className='flex flex-col justify-between items-center relative border mx-auto w-full max-w-sm border-gray-600 rounded-md p-6 overflow-hidden'>
                    <p className="md:text-2xl text-center md:mb-2 text-shadow-lg/100">{text.text}</p>
                    <div className='flex justify-center items-center absolute right-1 bottom-0 md:right-0'>
                        <span className='mr-1'>
                            <Update id={text.id} />
                        </span>
                        <span className='ml-1'>
                            <Delete id={text.id} />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}