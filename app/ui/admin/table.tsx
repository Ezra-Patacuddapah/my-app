import { fetchTexts } from "@/app/lib/data"
import { Text } from '../../lib/definitions'
import { Update, Delete } from './buttons'

export default async function Table() {
    const texts = await fetchTexts()

    texts.map(i => console.log(i.id))

    return (
        <div>
            {texts?.map((text:Text) => (
                <div key={text.id} className="flex justify-center items-center">
                    <p className="text-2xl">{text.text}</p>
                    <Update id={text.id} />
                    <Delete id={text.id} />
                </div>
            ))}
        </div>
    )
}