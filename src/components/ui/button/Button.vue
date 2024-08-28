<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), 'bg-transparent shadow-button border duration-300 border-secondary rounded-full px-4 py-2 font-semibold flex flex-row justify-between items-center  text-primary-300 hover:text-secondary hover:border-primary-400 hover:shadow-button-hover' ,props.class)"
  >
    <slot />
  </Primitive>
</template>
