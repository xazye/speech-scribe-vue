<script setup lang="ts">
</script>
<template>
    <div>
    Hello world
    <Button>Click me</Button>
    </div>
    <div>
    <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion></div>
</template>