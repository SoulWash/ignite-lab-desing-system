import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { SingIn } from './SingIn'

export default {
    title: 'pages/Sing In',
    component: SingIn,
    args: {},
    argTypes: {},
    parameters: {
        msw:{
            handlers:[
                rest.post('/sessions', (req, res, ctx) => {
                    return res(ctx.json({
                        message:'Login resalizado!'
                    }))
                })
            ],
        },
    }
} as Meta

export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'washluiz_@hotmail.com')
        userEvent.type(canvas.getByPlaceholderText('**********'), '1234567890')

        userEvent.click(canvas.getByRole('button'))

        await waitFor(() => {
            return expect(canvas.getByText('Login realizado!')).toBeInTheDocument()
        })

    }
}
