interface Tempo {
    number: string,
    note: string | null,
    augmented: boolean
}

export interface Track {
    title: string | null,
    author: string | null,
    tempo?: Tempo | null,
}

export const serializeTrackFromXmlDoc = (xmlDocument: Document): Track => {
    const track: Track = {
        title: xmlDocument.querySelector('track > title')?.innerHTML || null,
        author: xmlDocument.querySelector('track > author')?.innerHTML || null
    }

    const tempo = xmlDocument.querySelector('track > tempo')
    if (tempo) {
        track.tempo = {
            number: tempo.innerHTML,
            note: tempo.getAttribute('noteValue'),
            augmented: tempo.getAttribute('augmented') === 'true'
        }
    }

    return track
}
