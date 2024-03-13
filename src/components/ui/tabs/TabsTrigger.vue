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
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50',
                props.class
            )
        "
    >
        <slot />
    </TabsTrigger>
</template>
