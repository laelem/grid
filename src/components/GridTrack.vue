<template>
    <h1 class="text-center text-3xl font-semibold p-2">
        {{ props.track.title ?? '[Sans titre]' }}
    </h1>
    <h2 v-if="props.track.author" class="text-center text-xl text-gray-500 px-2">
        {{ props.track.author }}
    </h2>
    <div v-if="props.track.tempo">
        <span v-if="props.track.tempo.note"
              class="text-3xl font-[Noto_Music]">
            <template
                v-if="props.track.tempo.note === 'half'">&#119134;</template>
            <template
                v-if="props.track.tempo.note === 'quarter'">&#119135;</template>
            <template
                v-if="props.track.tempo.note === 'eighth'">&#119136;</template>
            <template
                v-if="props.track.tempo.augmented">&#119149;</template>
        </span>
        = {{ props.track.tempo.number }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    track: { type: Object, required: true }
})
</script>
