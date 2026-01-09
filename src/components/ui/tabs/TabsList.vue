<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import { TabsList, type TabsListProps } from "radix-vue"
import { cn } from "@/lib/utils"

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <TabsList
        v-bind="delegatedProps"
        :class="
            cn(
                'inline-flex h-10 items-center justify-center rounded-xl bg-bento-bg border border-bento-border p-1 text-bento-textMuted',
                props.class
            )
        "
    >
        <slot />
    </TabsList>
</template>
