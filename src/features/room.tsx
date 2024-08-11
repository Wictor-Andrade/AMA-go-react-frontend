import { useParams } from "react-router-dom"
import amaLogo from '../assets/ama-logo.svg'
import { Share2, ArrowRight, ArrowUp } from 'lucide-react'
import { toast } from "sonner"
import { Message } from "../components/message"

export function Room() {

    const { roomId } = useParams()

    function handleCreateMessage(data: FormData) {
        const theme = data.get('t')?.toString()
    }

    function handleShareRoom() {
        const url = window.location.href.toString()

        if (navigator.share != undefined && navigator.canShare()) {
            navigator.share({ url })
        } else {
            navigator.clipboard.writeText(url)
        }

        toast.info("The room URL was copied to your clipboard!")

    }

    return (
        <div className="mx-auto max-w-[648px] flex flex-col gap-6 py-10 px-4">
            <div className="flex items-center gap-3 px-3">
                <img src={amaLogo} alt="AMA LOGO" className="h-5" />
                <span className="text-sm text-zinc-500 truncate">
                    Código da sala: <span className="text-zinc-300">{roomId}</span>
                </span>
                <button
                    type='submit'
                    onClick={handleShareRoom}
                    className='ml-auto bg-zinc-800 flex text-zinc-300 px-3 py-1.5 gap-1.5 items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors'>
                    Compartilhar
                    <Share2 className='size-4' />
                </button>
            </div>

            <div className="h-px w-full bg-zinc-900" ></div>

            <form
                action={handleCreateMessage}
                className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-zinc-950 focus-within:ring-2 '>
                <input
                    type='text'
                    name='theme'
                    placeholder='Qual a sua pergunta?'
                    className='flex-1 text-sm bg-transparent outline-none mx-2 text-zinc-100 placeholder:text-zinc-500'
                    autoComplete='off'
                />
                <button type='submit' className='bg-orange-400 flex text-orange-950 px-3 py-1.5 gap-1.5 items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors'>
                    Criar pergunta
                    <ArrowRight className='size-4' />
                </button>
            </form>

            <ol className="list-decimal list-outside px-3 space-y-8">
                <Message text="teste" amountOfReactions={123} answered />
                <Message text="teste" amountOfReactions={123} />
                <Message text="teste" amountOfReactions={123} />
            </ol>

        </div>
    )
}