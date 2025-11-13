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
        <div>
            {texts?.map((text:Text) => (
                <div key={text.id} className="flex justify-center items-center border border-gray-600 rounded-md mx-1 my-2 py-8">
                    <p className="text-2xl">{text.text}</p>
                </div>
            ))}
        </div>
    )
}