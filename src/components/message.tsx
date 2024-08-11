import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { useParams } from "react-router-dom"
import { toast } from 'sonner'
import { createMessageReaction } from '../http/create-message-reaction'
import { removeMessageReaction } from '../http/remove-message-reaction'

interface MessageProps {
    id: string
    text: string
    amountOfReactions: number
    answered?: boolean
}


export function Message({
    id: messageId,
    text,
    amountOfReactions,
    answered = false, }: MessageProps) {
    const { roomId } = useParams()

    if (!roomId) {
        throw new Error("Messages components must be used within room page!")
    }



    const [hasReacted, setHasReacted] = useState(false)


    async function createMessageReactAction() {
        if (!roomId) {
            return
        }

        try {
            await createMessageReaction({ roomId, messageId })
        }
        catch {
            toast.error("Ocorreu um erro ao reagir!")
        }
        setHasReacted(true)
    }

    async function removeMessageReactAction() {
        if (!roomId) {
            return
        }
        try {
            await removeMessageReaction({ roomId, messageId })
        }
        catch {
            toast.error("Ocorreu um erro ao remover sua reação!")
        }
        setHasReacted(false)
    }

    return (
        <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
            {text}

            {hasReacted ? (
                <button
                    onClick={removeMessageReactAction}
                    type="button"
                    className="flex items-center mt-3 gap-2 text-orange-400 hover:text-orange-600 text-sm font-medium"
                >
                    <ArrowUp
                        className="size-4"
                    />
                    Curtir Pergunta ({amountOfReactions})
                </button>
            ) : (
                <button
                    onClick={createMessageReactAction}
                    type="button"
                    className="flex items-center mt-3 gap-2 text-zinc-300 hover:text-zinc-400 text-sm font-medium"
                >
                    <ArrowUp
                        className="size-4"
                    />
                    Curtir Pergunta ({amountOfReactions})
                </button>
            )}
        </li>
    )
}