import { ArrowRight } from 'lucide-react'
import { useParams } from "react-router-dom"
import { toast } from 'sonner';
import { createMessage } from '../http/create-message';


export function CreateMessageForm() {

    const { roomId } = useParams()

    if (!roomId) {
        throw new Error("Messages components must be used within room page!")
    }


    async function createMessageAction(data: FormData) {
        const message = data.get('message')?.toString()

        if (!message || !roomId) {
            return
        }

        try {

            await createMessage({ message, roomId })

        } catch {
            toast.error("Erro ao enviar sua pergunta!")
        }
    }

    return (
        <form
            action={createMessageAction}
            className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-zinc-950 focus-within:ring-2 '>
            <input
                type='text'
                name='message'
                placeholder='Qual a sua pergunta?'
                className='flex-1 text-sm bg-transparent outline-none mx-2 text-zinc-100 placeholder:text-zinc-500'
                autoComplete='off'
                required
            />
            <button type='submit' className='bg-orange-400 flex text-orange-950 px-3 py-1.5 gap-1.5 items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors'>
                Criar pergunta
                <ArrowRight className='size-4' />
            </button>
        </form>
    )
}