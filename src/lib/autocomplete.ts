import { CompletionContext, type Completion, type CompletionResult } from '@codemirror/autocomplete'
import { syntaxTree } from '@codemirror/language'
import { xmlSpecs } from '@/files/xml_specs.ts'

const tagCompletions = (parentTag: string | null): Array<Completion> => {
    const completions: Array<Completion> = []
    for (const tagName in xmlSpecs) {
        if (xmlSpecs[tagName].parents?.includes(parentTag)) {
            completions.push({ label: tagName })
        }
    }
    return completions
}
const attributeNameCompletions = [
    { label: 'noteValue' },
    { label: 'augmented' },
    { label: 'type' },
    { label: 'name' },
    { label: 'repeat' },
    { label: 'repeatStep' }
]
const attributeValueCompletions = [
    { label: 'half' },
    { label: 'quarter' },
    { label: 'eighth' },
    { label: 'true' },
    { label: 'false' },
    { label: 'grid' }
]

export const handleCompletions = (context: CompletionContext): CompletionResult | null => {
    const attributeValueBefore = context.matchBefore(/<[^>]*="\w*/)
    const attributeNameBefore = context.matchBefore(/<[^>]*\s\w*/)
    const tagBefore = context.matchBefore(/<\w*/)

    let completions: Completion[] = []
    if (attributeValueBefore) {
        const tag = /<\w+/.exec(attributeValueBefore.text)
        if (tag) {
            console.log(tag[0].slice(1))
        }
        // completions = tagCompletions
    } else if (attributeNameBefore) {
        // completions = tagCompletions
    } else {
        const nodeBefore = syntaxTree(context.state).resolveInner(context.pos - 1)
        let parentTag = null
        if (nodeBefore.parent) {
            const parentBefore = context.state.sliceDoc(nodeBefore.parent.from, context.pos)
            const parentTagRegexpArray = /^<\w+/.exec(parentBefore)
            if (parentTagRegexpArray) {
                parentTag = parentTagRegexpArray[0].slice(1)
            }
        }
        completions = tagCompletions(parentTag)
    }

    const before = attributeValueBefore || attributeNameBefore || tagBefore
    if (!context.explicit && !before) return null
    return {
        from: before ? before.to : context.pos,
        options: completions,
        validFor: /^\w*$/
    }
}
