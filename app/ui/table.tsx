import { Text } from '../lib/definitions';
import { fetchFilteredTexts } from "@/app/lib/data";
import Link from 'next/link';

export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number,
}) {
    const texts = await fetchFilteredTexts(query, currentPage)

    return (
        <div className='grid grid-cols-2 m-1 md:grid-cols-3 md:px-30 gap-3 mt-3 grid-rows-auto'>
            {texts?.map((text:Text) => (
                <div key={text.id}>
                    <Link
                        href={`/${text.id}/read`}
                    >
                        <div className="flex flex-col justify-center items-center border h-full mx-auto w-full max-w-sm border-gray-600 rounded-md p-6">
                            <p className="md:text-2xl text-center">{text.text}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}