import { Text } from '../lib/definitions';
import { fetchFilteredTexts } from "@/app/lib/data";

export default async function Table({
    query
}: {
    query: string;
}) {
    const texts = await fetchFilteredTexts(query)

    return (
        <div>
            {texts?.map((text:Text) => (
                <div key={text.id} className="flex justify-center items-center border border-gray-300 rounded-md mx-1 my-2">
                    <p className="text-2xl">{text.text}</p>
                </div>
            ))}
        </div>
    )
}