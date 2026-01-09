<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import {
    SplitterResizeHandle,
    type SplitterResizeHandleEmits,
    type SplitterResizeHandleProps,
    useForwardPropsEmits
} from "radix-vue"
import { DragHandleDots2Icon } from "@radix-icons/vue"
import { cn } from "@/lib/utils"

const props = defineProps<
    SplitterResizeHandleProps & {
        class?: HTMLAttributes["class"]
        withHandle?: boolean
    }
>()
const emits = defineEmits<SplitterResizeHandleEmits>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props
    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <SplitterResizeHandle
        v-bind="forwarded"
        :class="
            cn(
                'relative flex w-1 items-center justify-center bg-steam-border hover:bg-steam-accent/50 transition-colors duration-200 after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-steam-accent focus-visible:ring-offset-1 focus-visible:ring-offset-steam-dark [&[data-orientation=vertical]]:h-px [&[data-orientation=vertical]]:w-full [&[data-orientation=vertical]]:after:left-0 [&[data-orientation=vertical]]:after:h-1 [&[data-orientation=vertical]]:after:w-full [&[data-orientation=vertical]]:after:-translate-y-1/2 [&[data-orientation=vertical]]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90',
                props.class
            )
        "
    >
        <template v-if="props.withHandle">
            <div
                class="z-10 flex h-6 w-4 items-center justify-center rounded-md border border-steam-border bg-steam-card hover:bg-steam-hover hover:border-steam-accent/50 transition-all duration-200 shadow-sm"
            >
                <DragHandleDots2Icon class="h-3 w-3 text-steam-textMuted" />
            </div>
        </template>
    </SplitterResizeHandle>
</template>
