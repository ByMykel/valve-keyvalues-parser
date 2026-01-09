<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue"
import { cn } from "@/lib/utils"

const props = defineProps<
    TabsTriggerProps & { class?: HTMLAttributes["class"] }
>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TabsTrigger
        v-bind="forwardedProps"
        :class="
            cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bento-accent/50 disabled:pointer-events-none disabled:opacity-50 text-bento-textMuted hover:text-bento-text data-[state=active]:bg-bento-accent data-[state=active]:text-white',
                props.class
            )
        "
    >
        <slot />
    </TabsTrigger>
</template>
