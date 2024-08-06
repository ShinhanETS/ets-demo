import {atom} from 'recoil'

export const textState = atom({
    key: 'text',
    default: 'defaultText',
})

// 아래에 추가