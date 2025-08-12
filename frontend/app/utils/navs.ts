interface INav {
    name: string,
    ref: string,
}

export const navs:INav[] = [
    {
        name: "phrasevault",
        ref: "/",
    },
    {
        name: "phrase",
        ref: "/phrase"
    },
    {
        name: "phrasal-verbs",
        ref: "/phrasalverbs"
    },
    {
        name: "idioms",
        ref: "/idioms",
    }
]
