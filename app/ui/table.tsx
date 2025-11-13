import { Text } from '../lib/definitions';
import { fetchFilteredTexts } from "@/app/lib/data";

export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number,
}) {
    const texts = await fetchFilteredTexts(query, currentPage)

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 md:px-30 gap-3 mt-3'>
            {texts?.map((text:Text) => (
                <div key={text.id} className="flex justify-center items-center border border-gray-600 rounded-md p-6">
                    <p className="text-2xl">{text.text}</p>
                </div>
            ))}
        </div>
    )
}