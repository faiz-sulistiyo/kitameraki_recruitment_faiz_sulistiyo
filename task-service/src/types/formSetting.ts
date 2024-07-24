
export type FormSetting = {
    id: string
    items?: FormSettingItem[]
}

type FormSettingItem = {
    id: string
    component: string
    label: string
    name?: string
}
