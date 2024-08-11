import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { GetRoomMessagesResponse } from "../http/get-room-messages"

interface UseMessageWebSocketsParams {
    roomId: string
}

type WebhookMessage =
    | { kind: 'message_created'; value: { id: string, message: string } }
    | { kind: 'message_answered'; value: { id: string } }
    | { kind: 'message_reaction_decreased'; value: { id: string, count: number } }
    | { kind: 'message_reaction_increased'; value: { id: string, count: number } };

export function useMessageWebSockets({ roomId }: UseMessageWebSocketsParams) {
    const qClient = useQueryClient()
    useEffect(() => {
        const ws = new WebSocket(`${import.meta.env.VITE_APP_API_URL}/subscribe/${roomId}`)

        ws.onopen = () => {
            console.log("web socket connect!")
        }

        ws.onmessage = (event) => {
            const data: WebhookMessage = JSON.parse(event.data)

            switch (data.kind) {
                case 'message_created':
                    qClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
                        return {
                            messages: [
                                ...(state?.messages ?? []),
                                {
                                    id: data.value.id,
                                    text: data.value.message,
                                    amountOfReactions: 0,
                                    answered: false,
                                }
                            ],
                        }
                    })
                case 'message_answered':
                    qClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {

                        if (!state) { return undefined }
                        return {
                            messages: state.messages.map(item => {
                                if (item.id === data.value.id) {
                                    return { ...item, answered: true }
                                }
                                return item
                            }),
                        }
                    })
                case 'message_reaction_decreased':
                case 'message_reaction_increased':
                    qClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {

                        if (!state) { return undefined }
                        return {
                            messages: state.messages.map(item => {
                                if (item.id === data.value.id) {
                                    return { ...item, amountOfReactions: data.value.count }
                                }
                                return item
                            }),
                        }
                    })


                    break;
            }

        }

        return () => {
            ws.close()
        }
    }, [roomId, qClient])
}